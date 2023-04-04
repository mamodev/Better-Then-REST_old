import { z } from "zod";
import { View } from "../../core/View.js";
import { Schema } from "../../Schema.js";

export const model = z.object({
  sede: z.string(),
  dexb: z.string(),
});

export const v_sedi_per_utente = new View(
  Schema.CORE,
  "v_sedi_per_utente",
  model
);
