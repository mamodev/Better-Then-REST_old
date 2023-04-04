import { z } from "zod";
import { View } from "../../core/View.js";
import { nullableNumber, nullableString } from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

export const model = z.object({
  mov_id: z.number(),
  sede_cod: nullableString,
  causale_cod: nullableString,
  sede: nullableString,
  causale: nullableString,
  controparte: nullableString,
  controp_id: nullableNumber,
  data_mov: nullableString,
  nr_documento: nullableString,
  nr_doc_ricevuto: nullableString,
  fatturazione: nullableString,
  stato_cod: nullableString,
  stato_dex: nullableString,
  tipo_doc_mag: nullableString,
});

export const v_mov_test = new View(Schema.MAGA, "v_mov_test", model, {
  idField: "mov_id",
});
