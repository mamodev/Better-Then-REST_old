import { z } from "zod";
import { View } from "../../core/View.js";
import { nullableNumber, nullableString } from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

const model = z.object({
  forn_id: z.number(),
  oda_riga_id: z.number(),
  numero: nullableString,
  riferimento: nullableString,
  art_id: nullableNumber,
  articolo: nullableString,
  um: nullableString,
  qta: nullableNumber,
});

export const v_oda_da_arrivare = new View(
  Schema.MAGA,
  "v_oda_da_arrivare",
  model,
  {
    idField: "oda_riga_id",
  }
);
