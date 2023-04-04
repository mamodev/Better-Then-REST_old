import { readdirSync, statSync } from "fs";
import path from "path";
import { z } from "zod";
import { parse } from "@iarna/toml";
import { Dictionary, groupBy } from "lodash";
import { PoolClient } from "pg";
import { dbConnection } from "./src/dbConnector.js";

const entityFoleder = "./config/Entities";

type EntityDef = {
  table: string;
  schema: string;
  id: string[];
  data: Record<string, string | EntityDef>;
};

const entityDefSchema: z.ZodSchema<EntityDef> = z.object({
  table: z.string(),
  schema: z.string(),
  id: z.string().array(),
  data: z.record(z.union([z.string(), z.lazy(() => entityDefSchema)])),
});

const dbTableSchema = z
  .object({
    table_schema: z.string(),
    table_name: z.string(),
    table_type: z.string(),
    column_name: z.string(),
    data_type: z.string(),
  })
  .array();

type TableSchemas = Dictionary<
  {
    table_schema: string;
    table_name: string;
    table_type: string;
    column_name: string;
    data_type: string;
  }[]
>;

async function getTableArrayFromDb(connection: PoolClient) {
  const { rows: tables } = await connection.query(`
  SELECT 
    t.table_schema, 
    t.table_name, 
    t.table_type, 
    c.column_name, 
    c.data_type 
  FROM 
    information_schema.tables t 
    LEFT JOIN information_schema.columns c 
      ON t.table_schema = c.table_schema 
      AND t.table_name = c.table_name 
  WHERE 
    t.table_schema NOT IN ('pg_catalog', 'information_schema')
    AND t.table_type IN ('BASE TABLE', 'VIEW')
  `);
  let parsedTables: z.infer<typeof dbTableSchema>;
  try {
    parsedTables = dbTableSchema.parse(tables);
  } catch (err) {
    console.error("Error occurred while parsing db response of TableDef query");
    throw err;
  }

  const grouped = groupBy(
    parsedTables,
    (tabelDef) => `${tabelDef.table_schema}-${tabelDef.table_name}`
  );

  return grouped;
}

function getFilesRecursive(folderPath: string, fileArray: string[] = []) {
  const files = readdirSync(folderPath);

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    if (statSync(filePath).isDirectory()) {
      fileArray = getFilesRecursive(filePath, fileArray);
    } else {
      fileArray.push(filePath);
    }
  });

  return fileArray;
}

/**
 * Load entitities from config and compile to ts file.
 * Check into db if the table really exists
 * @async
 * @throws Error
 */
export async function loadEntities() {
  const Entities: Record<string, EntityDef> = {};

  // Get all files
  const EntityDefFiles = getFilesRecursive(entityFoleder).filter((file) =>
    file.endsWith(".toml")
  );

  // Read files, parse and generate entityDefObject
  for (const filePath of EntityDefFiles) {
    try {
      const file = Bun.file(filePath);
      const content = parse(await file.text());
      const entityDef = entityDefSchema.parse(content);

      const { base } = path.parse(filePath);
      Entities[base] = entityDef;
    } catch (err) {
      console.log(`Error occurred parsing ${filePath} EntityDef`);
    }
  }

  // dbConnection - Retrive table informations
  const connection = await dbConnection();
  const dbTables = await getTableArrayFromDb(connection);
  connection.release();

  const validEntities: Array<EntityDef & { name: string }> = [];

  // Check for tables and compatibility
  Object.entries(Entities).forEach(([entityName, entityDef]) => {
    const compatible = entityDefMatchDB(dbTables, entityDef);

    if (!compatible) {
      console.error(
        `Entity ${entityName}  has a not compatible type with ${entityDef.table} db definition!`
      );
    }

    if (compatible) validEntities.push({ ...entityDef, name: entityName });
  });

  // Compiled file
  console.log("Write to file");
  const entityDefFile = Bun.file("./EntityDef.ts");

  let codeStr = libCode("ws://localhost:8888");

  codeStr += `\n\nexport enum Entity {\n`;

  for (const entity of validEntities) {
    codeStr += `\t${entity.name} = "${entity.name}",\n`;
  }

  codeStr += "}\n\n";

  codeStr += `\n\nexport type TEntity = {\n`;

  for (const entity of validEntities) {
    codeStr += `\t[Entity.${entity.name}]: ${entity.name}Def\n`;
  }

  codeStr += "}\n\n";

  for (const entity of validEntities) {
    codeStr += `type ${entity.name}Def = ${generateEntityTypeStr(entity)}`;
  }

  await Bun.write(entityDefFile, codeStr);
  console.log("Done!");
}

await loadEntities();

function indent(string: string, n: number) {
  let indStr = "";

  for (let i = 0; i < n; ++i) {
    indStr += "\t";
  }
  return indStr + string;
}

function getTsType(pseudoType: string) {
  const [type, ...rest] = pseudoType.split("?");

  const format = (type: string) => (rest.length > 0 ? `${type} | null` : type);
  switch (type) {
    case "text":
      return format("string");
    case "number":
      return format("number");
    case "bool":
      return format("boolean");
    case "date":
      return format("Date");
    default:
      return "unknown";
  }
}

function generateEntityTypeStr(
  entity: EntityDef & { name: string },
  ind: number = 0
) {
  let entityStr = indent(`{\n`, ind);

  for (const dataKey in entity.data) {
    if (!entity.data.hasOwnProperty(dataKey)) continue;

    const dataType = entity.data[dataKey];
    if (typeof dataType === "string") {
      entityStr += indent(`${dataKey}: ${getTsType(dataType)},\n`, ind + 1);
      continue;
    }

    entityStr += indent(
      `${dataKey}: ${generateEntityTypeStr(
        {
          ...dataType,
          name: dataKey,
        },
        ind + 1
      )},\n`,
      ind + 1
    );
  }

  entityStr += "}\n";

  return entityStr;
}

function entityDefMatchDB(dbSchemas: TableSchemas, entityDef: EntityDef) {
  const dbRefKey = `${entityDef.schema}-${entityDef.table}`;

  if (!(dbRefKey in dbSchemas)) return false;

  const dbRef = dbSchemas[dbRefKey];

  for (const fieldKey in entityDef.data) {
    //Shuoldent occur jic :)
    if (!entityDef.data.hasOwnProperty(fieldKey)) return;

    const fieldType = entityDef.data[fieldKey];

    if (typeof fieldType === "string") {
      //Look for a db field def
      const def = dbRef.find((field) => field.column_name === fieldKey);

      if (!def || !isCompatibleType(fieldType, def.data_type)) {
        console.log(fieldKey, fieldType, def?.data_type);
        return false;
      }
      continue;
    }

    //Call this function recursivelly
    if (!entityDefMatchDB(dbSchemas, fieldType)) {
      return false;
    }
  }

  return true;
}

function isCompatibleType(defType: string, dbType: string): Boolean {
  return true;
}

function libCode(url: string) {
  return `
class Mutex {
  private _locked: boolean = false;
  private _waitQueue: Array<(vaalue: unknown) => void> = [];

  public async acquire(): Promise<void> {
    while (this._locked) {
      await new Promise((resolve) => this._waitQueue.push(resolve));
    }
    this._locked = true;
  }

  public release(): void {
    const resolve = this._waitQueue.shift();

    if (resolve) resolve(null);
    else this._locked = false;
  }
}

class SequentialCounter {
  private _counter: number = 0;
  private _mutex: Mutex = new Mutex();

  public async getNext(): Promise<number> {
    await this._mutex.acquire();
    const nextValue = ++this._counter;
    this._mutex.release();
    return nextValue;
  }
}

const socket = new WebSocket("${url}");
const requestCounter = new SequentialCounter();

const buffer_size = 1000;
const requestBuff: Array<(data: SocketResponse) => void> = [];

type SocketResponse = {
  id: number;
  error: boolean;
  data: any;
};

socket.addEventListener("message", (event) => {
  const response = JSON.parse(event.data) as SocketResponse;

  const resolve = requestBuff[response.id % buffer_size];
  if (resolve) resolve(response);
});

function addToBuff(id: number, resolve: (data: SocketResponse) => void) {
  requestBuff[id % buffer_size] = resolve;
}

function socketWrite(req: SocketRequest) {
  socket.send(JSON.stringify(req));
}

async function socketRequest(req: SocketRequest) {
  const socketData = await new Promise((resolve) => {
    addToBuff(req.id, resolve);
    socketWrite(req);
  });

  return socketData;
}

export async function getEntity<E extends Entity>(
  entity: E,
  args: EntityArgs
): Promise<TEntity[E]> {
  const req: SocketRequest = {
    id: await requestCounter.getNext(),
    type: SocketRequestType.Entity,
    res: entity,
    args,
  };

  return (await await socketRequest(req)) as TEntity[E];
}

//Type definitions
type EntityArgs = {};

enum SocketRequestType {
  Entity = 0,
  RPC = 1,
}

type SocketRequestArgs = Record<string, boolean | string | number>;

type SocketRequest = {
  id: number;
  type: SocketRequestType;
  res: string;
  args: SocketRequestArgs;
};
`;
}
