import { config } from "dotenv";
import { parseInt } from "lodash";

// Load .env configuration
config();
export const JWT_SECRET = process.env.JWT_SECRET ?? "default_token_unsafe";

function getDbEnv() {
  const userEnv = process.env.PG_DB_USER;
  const hostEnv = process.env.PG_DB_HOST;
  const databaseEnv = process.env.PG_DB_NAME;
  const passwordEnv = process.env.PG_DB_PASSWD;
  const portEnv = process.env.PG_DB_PORT;

  if (!userEnv || !hostEnv || !databaseEnv || !passwordEnv || !portEnv) {
    throw new Error("Env DB vars not present!");
  }

  return {
    user: userEnv,
    host: hostEnv,
    database: databaseEnv,
    password: passwordEnv,
    port: parseInt(portEnv),
  };
}

function getPostgrestEnv(dbHost: string, dbPort: number, dbName: string) {
  const authRole = process.env.PGRST_AUTHENTICATOR_ROLE ?? "authenticator";
  const authPasswd = process.env.PGRST_AUTHENTICATOR_PASSWD ?? "authenticator";

  const anonRole = process.env.PGRST_ANON_ROLE ?? "web-anon";

  const adminServerPort = 5556;
  const serverPort = 5555;
  const schemas = process.env.EXPOSED_DB_SCHEMAS ?? "public";

  return {
    PGRST_DB_URI: `postgres://${authRole}:${authPasswd}@${dbHost}:${dbPort}/${dbName}`,
    PGRST_ANON_ROLE: anonRole,
    PGRST_SERVER_PORT: serverPort,
    PGRST_ADMIN_SERVER_PORT: adminServerPort,
    PGRST_DB_SCHEMAS: schemas,
    JWT_SECRET,
  };
}

export const DB_ENV = getDbEnv();
console.log(DB_ENV);
export const PGRST_ENV = getPostgrestEnv(
  DB_ENV.host,
  DB_ENV.port,
  DB_ENV.database
);
