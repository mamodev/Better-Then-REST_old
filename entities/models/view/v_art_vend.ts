import { z } from "zod";
import { View } from "../../core/View.js";
import {
  nullableBoolean,
  nullableNumber,
  nullableString,
} from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

const data = z.object({
  art_id: z.number(),
  cat_dex: nullableString,
  marchio: nullableString,
  linea: nullableString,
  codice: nullableString,
  art_dex: nullableString,
  um: nullableString,
  cod_iva: nullableString,
  cond_voce_id: nullableNumber,
  categ_id: nullableNumber,
  prezzo: nullableNumber,
  modif_marchio: nullableBoolean,
  modif_linea: nullableBoolean,
  modif_codice: nullableBoolean,
  modif_dex: nullableBoolean,
  obblig_marchio: nullableBoolean,
  obblig_linea: nullableBoolean,
  obblig_codice: nullableBoolean,
  obblig_dex: nullableBoolean,
  obblig_dex2: nullableBoolean,
});

export const v_art_vend = new View(Schema.BASE, "v_art_vend", data, {
  idField: "art_id",
});
