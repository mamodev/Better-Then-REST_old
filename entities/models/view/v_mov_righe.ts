import { z } from "zod";
import { View } from "../../core/View.js";
import { nullableNumber, nullableString } from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

export const model = z.object({
  mov_id: z.number(),
  mov_riga_id: z.number(),
  controp_id: nullableNumber,
  sede_cod: nullableString,
  magazzino_cod: nullableString,
  sede: nullableString,
  causale: nullableString,
  magazzino: nullableString,
  controparte: nullableString,
  data_mov: nullableString,
  nr_doc_ricevuto: nullableString,
  articolo: nullableString,
  riferimento: nullableString,
  um: nullableString,
  nr_documento: nullableString,
  dex_estesa: nullableString,
  ubicaz_id: nullableNumber,
  art_id: nullableNumber,
  qta: nullableNumber,
  colli_arrivati: nullableNumber,
});

export const v_mov_righe = new View(Schema.MAGA, "v_mov_righe", model, {
  idField: "mov_riga_id",
});
