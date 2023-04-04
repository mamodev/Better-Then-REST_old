import { z } from "zod";
import { View } from "../../core/View.js";
import { nullableNumber, nullableString } from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

export const model = z.object({
  sede_cod: nullableString,
  sede: nullableString,
  magazzino_cod: nullableString,
  magazzino: nullableString,
  art_id: nullableNumber,
  articolo: nullableString,
  um: z.string(),
  qta: nullableNumber,
  qta_impegnata: nullableNumber,
  lotto_id: nullableNumber,
  riferimento: nullableString,
  ubicaz_id: nullableNumber,
});

export const v_giacenze = new View(Schema.MAGA, "v_giacenze", model, {
  idField: "NO-ID",
});
