import { z } from "zod";
import { View } from "../../core/View.js";
import { nullableNumber, nullableString } from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

export const model = z.object({
  articolo_id: z.number(),
  cat_dex: nullableString,
  marchio: nullableString,
  linea: nullableString,
  codice: nullableString,
  art_dex: nullableString,
  um: z.string(),
  tipo_art_cod: z.string(),
  tipo_art_dex: z.string(),
  stato: nullableString,
  stato_dex: nullableString,
  qualifica_id: nullableNumber,
  qualifica_dex: nullableString,
  ore_per_unita: nullableNumber,
  prz_orario_assunto: nullableNumber,
  prezzo_listino: nullableNumber,
  prezzo_acq_netto: nullableNumber,
  prezzo_vendita: nullableNumber,
  da_attualizzare: z.boolean(),
});

export const v_articoli_lase = new View(Schema.BASE, "v_articoli_lase", model, {
  idField: "articolo_id",
});
