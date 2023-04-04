import { z } from "zod";
import { nullableApiDate } from "../../core/apiDate.js";
import { View } from "../../core/View.js";
import { nullableNumber, nullableString } from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

const model = z.object({
  fattura_id: z.number(),
  numero: nullableString,
  tipo_doc: nullableString,
  tipo_doc_dex: nullableString,
  acc_o_vend: nullableString,
  fatt_denom: nullableString,
  odv_numero: nullableString,
  sede: nullableString,
  del: nullableApiDate,
  sede_dex: nullableString,
  gru_fatt_id: nullableNumber,
  imp_fattura: nullableNumber,
  imp_incasso: nullableNumber,
});

export const v_lista_fatt_cli = new View(
  Schema.CONT,
  "v_lista_fatt_cli",
  model,
  {
    idField: "fattura_id",
  }
);
