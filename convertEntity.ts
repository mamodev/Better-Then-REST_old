import { Entities } from "./entities/Entities.js";
import { stringify } from "@iarna/toml";
import { z, ZodTypeAny } from "zod";

const entitiesDefFolder = "./config/Entities";

const entitiesConverted: Record<string, object> = {};

for (let [key, entity] of Object.entries(Entities)) {
  const entityData = {
    table: entity.view.view,
    schema: entity.view.schema,
    id: [entity.view.idField],
    data: Object.fromEntries(
      Object.entries(entity.view.responseModel.shape).map(([key, values]) => [
        key,
        stringifyZodType(values),
      ])
    ),
  };

  for (const embView of entity.view.options.embeddedViews) {
    const keyName = embView.alias ?? embView.view;
    const shape = entity.view.responseModel.shape;
    if (keyName in entityData.data && keyName in shape) {
      const shapeArray = shape[keyName as keyof typeof shape] as z.ZodArray<
        z.ZodObject<any>
      >;

      entityData.data[keyName] = {
        id: ["auto"],
        schema: entity.view.schema,
        table: embView.view,
        data: Object.fromEntries(
          Object.entries(shapeArray._def.type.shape).map(([key, value]) => [
            key,
            stringifyZodType(value as ZodTypeAny),
          ])
        ),
      };
    }
  }

  entitiesConverted[key] = entityData;
  await Bun.write(`./${entitiesDefFolder}/${key}.toml`, stringify(entityData));
}

function stringifyZodType(schema: z.ZodTypeAny): any {
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape;
    const result: Record<string, any> = {};

    for (const field in shape) {
      result[field] = stringifyZodType(shape[field]);
    }

    return result;
  }

  if (schema instanceof z.ZodArray) {
    return `${stringifyZodType(schema.element)} list`;
  }

  if (schema instanceof z.ZodEffects) {
    return `${stringifyZodType(schema._def.schema)}`;
  }

  if (schema instanceof z.ZodNullable) {
    return `${stringifyZodType(schema._def.innerType)}?`;
  }

  return `${getCovertedTypeName(schema.constructor.name.toLowerCase())}`;
}

function getCovertedTypeName(name: string) {
  switch (name) {
    case "zodstring":
      return "text";
    case "zodboolean":
      return "bool";
    case "zodnumber":
      return "number";
    case "zoddate":
      return "date";
    default:
      return name;
  }
}
