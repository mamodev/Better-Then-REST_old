import { z } from "zod";
import { apiDate, nullableApiDate } from "../../core/apiDate.js";
import { View } from "../../core/View.js";
import { nullableNumber, nullableString } from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

const model = z.object({
  id: z.number(),
  risorsa_id: z.number(),
  classe: nullableString,
  risorsa_dex: z.string(),
  giorni_settimana: nullableString,
  tipo_cod: nullableString,
  tipo_dex: nullableString,
  causale: nullableString,
  fino_a: nullableApiDate,
  data_da: apiDate,
  ore_giorno: nullableNumber,
  ore_modulo: nullableNumber,
  ore: nullableNumber,
  nota: nullableString,
  storica: z.boolean(),
});

export const v_ris_eccez = new View(Schema.LASE, "v_ris_eccez", model, {
  idField: "id",
});
