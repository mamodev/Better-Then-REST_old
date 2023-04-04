import { z } from "zod";
import { nullableApiDate } from "../../core/apiDate.js";
import { View } from "../../core/View.js";
import {
  nullableBoolean,
  nullableNumber,
  nullableString,
} from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

const model = z.object({
  odl_id: z.number(),
  cdl_id: nullableNumber,
  odl_del: nullableString,
  sede: nullableString,
  sede_dex: nullableString,
  riferimento: nullableString,
  indirizzo_consegna: nullableString,
  centro_lavoro: nullableString,
  tipo_odl: nullableString,
  tipo_odl_dex: nullableString,

  righe_consegna: z
    .object({
      odl_id: z.number(),
      odl_riga_id: z.number(),
      odv_riga_id: z.number(),
      progetto_id: nullableNumber,
      struttura_id: nullableNumber,
      progetto_dex: nullableString,
      att_mag: z.string(),
      pezzo_fuori_sede: z.boolean(),
      pezzo: z.string(),
      um: z.string(),
      qta: z.number(),
    })
    .array(),
  interventi_consegna: z
    .object({
      odl_id: z.number(),
      interv_dex: nullableString,
      data_interv: nullableApiDate,
      orario_da: nullableString,
      appunt_preso: z.boolean(),
      chiuso: z.boolean(),
      terminato: nullableBoolean,
    })
    .array(),
});

export const emb_v_odl_cons_test = new View(
  Schema.LASE,
  "v_odl_cons_test",
  model,
  {
    idField: "odl_id",
    embeddedViews: [
      { view: "v_odl_cons_righe", alias: "righe_consegna" },
      { view: "v_odl_cons_interv", alias: "interventi_consegna" },
    ],
  }
);
