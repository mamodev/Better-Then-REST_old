import { z, ZodArray, ZodObject } from "zod";
import { NullableZodDate, ZodDate } from "./apiDate.js";
import { Entity } from "./Entity.js";
import { RPC } from "./RPC.js";
import { View } from "./View.js";
import { ZodGArray, ZodStringArray } from "./zodUtils.js";

//==========
//  ENTITY
//==========

//Keys
export type FilterObject = { [key: string]: string };
export type EntityId = string | number | undefined;
export type EntityBaseKey = [string, string, string, any];
export type EntityKey = [...EntityBaseKey, string | number | undefined];
export type EntitiesKey = [...EntityBaseKey, FilterObject];
export type ERef<E extends GEntity> = {
  entity: E;
  params: EParams<E>;
};

export type EntityIdentifier<E extends GEntity> = {
  id: EntityId;
  params: EParams<E>;
};

//Utils
export type EParamsModel<V extends GView> = V extends View<ApiModel<infer S>>
  ? {
      [P in keyof S]?: "eq" | "gte" | "lte" | "lt" | "gt" | "like" | "ilike";
    }
  : never;
export type EParams<E extends GEntity> = E extends Entity<
  View<ApiModel<infer S>>,
  infer M
>
  ? {
      [P in keyof Omit<S, keyof Omit<S, keyof M>>]: z.infer<S[P]>;
    }
  : never;

//===========================//

//Api types
export type ApiHeaders = {
  [key: string]: string;
};

export type ZodJson =
  | z.ZodString
  | z.ZodNumber
  | z.ZodBoolean
  | z.ZodNull
  | ZodDate;
export type NulllableZodJson =
  | z.ZodNullable<z.ZodString>
  | z.ZodNullable<z.ZodNumber>
  | z.ZodNullable<z.ZodBoolean>
  | NullableZodDate;

export type ApiModelShape = {
  [key: string]:
    | ZodStringArray
    | ZodGArray
    | ZodJson
    | NulllableZodJson
    | ZodObject<ApiModelShape>
    | ZodArray<ZodObject<ApiModelShape>>;
};

export type ApiModel<S extends ApiModelShape = any> = z.ZodObject<S>;

//Generics
export type GEntity = Entity<GView, any>;
export type GView = View<any>;

//Data types
export type ViewData<V extends GView> = z.infer<V["responseModel"]>;
export type RpcData<R extends RPC<any, any, any>> = z.infer<R["responseModel"]>;
export type EntityData<E extends GEntity> = z.infer<E["view"]["responseModel"]>;
export type EntityRow<E extends GEntity> = EntityData<E>;

//Shugar sintax
export type EntityProcessRowUpdate<E extends GEntity> = (
  oldRow: EntityRow<E>,
  newRow: EntityRow<E>
) => EntityRow<E> | Promise<EntityRow<E>>;

export type IsEmptyObject<Obj extends Record<PropertyKey, unknown>> = [
  keyof Obj
] extends [never]
  ? true
  : false;
