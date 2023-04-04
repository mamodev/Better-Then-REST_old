import { z } from "zod";
import { View } from "../../core/View.js";
import { nullableString } from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

const model = z.object({
  ambito: z.string(),
  dominio: z.string(),
  cod: z.string(),
  dex: nullableString,
  seq: nullableString,
});

export const v_domini = new View(Schema.CORE, "v_domini", model, {
  idField: "cod",
});
