import { z } from "zod";
import { View } from "../../core/View.js";
import { Schema } from "../../Schema.js";

export const model = z.object({
  fornitore_id: z.number(),
  denom: z.string(),
});

export const v_forn_no_cond = new View(Schema.BASE, "v_forn_no_cond", model, {
  idField: "fornitore_id",
});
