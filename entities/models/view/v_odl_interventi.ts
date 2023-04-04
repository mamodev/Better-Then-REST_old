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
  odl_id: z.number(),
  id: z.number(),
  interv_dex: nullableString,
  data_interv: nullableApiDate,
  data_interv_dex: nullableString,
  ora_interv_dex: nullableString,
  per_ore: nullableNumber,
  livello: nullableString,
  livello_dex: nullableString,
  presso: nullableString,
  presso_dex: nullableString,
  appunt_preso: nullableBoolean,
  ora_appunt: nullableString,
  appunt_preso_con: nullableString,
  appunt_preso_da_id: nullableNumber,
  appunt_preso_da_nome: nullableString,
  appunt_preso_da_il: nullableString,
  appunt_note: nullableString,
  stato_dex: nullableString,
  terminato: nullableBoolean,
  fino_a: nullableString,
  note_chiusura: nullableString,
  chiuso: z.boolean(),
});

export const v_odl_interventi = new View(
  Schema.LASE,
  "v_odl_interventi",
  model,
  { idField: "id" }
);
