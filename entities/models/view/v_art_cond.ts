import { z } from "zod";
import { View } from "../../core/View.js";
import { nullableNumber, nullableString } from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

export const model = z.object({
  art_id: z.number(),
  cat_dex: nullableString,
  marchio: nullableString,
  linea: nullableString,
  codice: nullableString,
  art_dex: nullableString,
  um: z.string(),
  tipo_art_cod: nullableString,
  tipo_art_dex: nullableString,
  univoco: z.boolean(),
  stato: nullableString,
  stato_dex: nullableString,
  fornitore: nullableString,
  cond_voce_id: nullableNumber,
  gg_cons: nullableNumber,
  gg_cons_max: nullableNumber,
  sconto_cascata: nullableString,
  sconto_acq: nullableNumber,
  pag_cod: nullableString,
  condizioni_dex: nullableString,
  cond_voce_art_id: nullableNumber,
  prezzo_list: nullableNumber,
  prz_acq_netto: nullableNumber,
  prezzo_vend: nullableNumber,
  moltiplicatore_arrot: nullableNumber,
  cod_art_forn: nullableString,
});

export const v_art_cond = new View(Schema.BASE, "v_art_cond", model, {
  idField: "art_id",
});
