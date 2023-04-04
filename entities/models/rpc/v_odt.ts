import { z } from "zod";
import { nullableApiDate } from "../../core/apiDate.js";
import { View } from "../../core/View.js";
import { nullableNumber, nullableString } from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

const model = z.object({
  odt_id: nullableNumber,
  per_odv_riga_id: nullableNumber,
  art_id: nullableNumber,
  qta: nullableNumber,
  emesso_da_id: nullableNumber,
  a_sede_dex: nullableString,
  riferimento: nullableString,
  a_mag: nullableString,
  motivo: nullableString,
  emmesso_da_dex: nullableString,
  articolo: nullableString,
  um: nullableString,
  data_creaz: nullableApiDate,
  sede: nullableString,
  da_sede: nullableString,
  da_sede_dex: nullableString,
  da_mag: nullableString,
  a_sede: nullableString,
});

export const v_odt = new View(Schema.MAGA, "v_odt", model, {
  idField: "odt_id",
});
