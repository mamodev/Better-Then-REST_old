import { z } from "zod";
import { formatDate } from "../../utils.js";
import { NulllableZodJson, ZodJson } from "./type.js";

export const nullableNumber = z.number().nullable();
export const nullableString = z.string().nullable();
export const nullableBoolean = z.boolean().nullable();

export const stringArray = z.preprocess((arg: unknown) => {
  if (typeof arg === "string") {
    try {
      return JSON.parse(arg);
    } catch {
      return arg;
    }
  }
  return arg;
}, z.string().array());

export type ZodStringArray = typeof stringArray;

export const gArray = (typeFun: () => ZodJson) =>
  z.preprocess((arg: unknown) => {
    if (typeof arg === "string") {
      try {
        return JSON.parse(
          arg
            .replaceAll("{", "[")
            .replaceAll("}", "]")
            .replaceAll("NULL", "null")
        );
      } catch {
        return arg;
      }
    }
    return arg;
  }, typeFun().array());

export const toGArray = (typeFun: () => ZodJson | NulllableZodJson) =>
  typeFun()
    .array()
    .transform((arr) => {
      return JSON.stringify(
        arr.map((e) => (e instanceof Date ? formatDate(e) : e))
      )
        .replaceAll("[", "{")
        .replaceAll("]", "}")
        .replaceAll("null", "NULL")
        .replaceAll(" ", "");
    });

export type ZodGArray = ReturnType<typeof gArray> | ReturnType<typeof toGArray>;
