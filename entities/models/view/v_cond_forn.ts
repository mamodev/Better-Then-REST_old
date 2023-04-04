import { z } from "zod";
import { nullableApiDate } from "../../core/apiDate.js";
import { View } from "../../core/View.js";
import { Schema } from "../../Schema.js";

const model = z.object({
  id: z.number(),
  dex: z.string().nullable(),
  denom: z.string(),
  fornitore_id: z.number(),
  eccez_1_da: nullableApiDate,
  eccez_1_a: nullableApiDate,
  eccez_2_da: nullableApiDate,
  eccez_2_a: nullableApiDate,
  validita_fine: nullableApiDate,
});

export const v_cond_forn = new View(Schema.BASE, "v_cond_forn", model);
