import { z } from "zod";
import { apiDate } from "../../core/apiDate.js";
import { View } from "../../core/View.js";
import { nullableNumber, nullableString } from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

export const model = z.object({
  fattura_id: z.number(),
  numero: nullableString,
  del: apiDate,
  tipo_doc: nullableString,
  deb_cred: nullableString,
  tipo_doc_dex: nullableString,
  fatt_denom: nullableString,
  odv_id: nullableNumber,
  sede: nullableString,
  gru_fatt_id: nullableNumber,
  imp_fattura: nullableNumber,
  imp_incasso: nullableNumber,
  commissione: nullableString,
  denom: nullableString,
  imp_atteso: nullableNumber,
  previsto: nullableString,
});

export const v_fatt_da_inc = new View(Schema.CONT, "v_fatt_da_inc", model, {
  idField: "fattura_id",
});
