import { z } from "zod";
import { nullableApiDate } from "../../core/apiDate.js";
import { View } from "../../core/View.js";
import {
  nullableBoolean,
  nullableNumber,
  nullableString,
} from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

export const model = z.object({
  odv_id: z.number(),
  venditore_id: nullableNumber,
  cliente_id: nullableNumber,
  tipo: nullableString,
  tipo_cod_dom: nullableString,
  tipo_decod: nullableString,
  numero: nullableString,
  del: nullableApiDate,
  dex: nullableString,
  denom: nullableString,
  indirizzo: nullableString,
  comune: nullableString,
  provincia: nullableString,
  cap: nullableString,
  cellulare: nullableString,
  telefono: nullableString,
  email: nullableString,
  estremi: nullableString,
  stato_dex: nullableString,
  sede: nullableString,
  sede_dex: nullableString,
  venditore_dex: nullableString,
  chiuso: nullableBoolean,
  numero_est_mancante: nullableBoolean,
});

export const v_odv = new View(Schema.VEND, "v_odv", model, {
  idField: "odv_id",
});
