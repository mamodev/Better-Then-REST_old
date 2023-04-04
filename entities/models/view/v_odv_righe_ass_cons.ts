import { z } from "zod";
import { View } from "../../core/View.js";
import {
  nullableBoolean,
  nullableNumber,
  nullableString,
} from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

const response = z.object({
  odv_id: z.number(),
  gru_cons_id: nullableNumber,
  odv_riga_id: z.number(),
  art_id: z.number(),
  progetto_id: nullableNumber,
  struttura_id: nullableNumber,
  gru_cons_nr: nullableNumber,
  item: nullableString,
  item_d: nullableString,
  sub_dex: nullableString,
  um: z.string(),
  qta: nullableNumber,
  fonte: nullableString,
  fonte_dex: nullableString,
  fonte_cod_un: nullableString,
  cons_prevista: nullableString,
  tipo_art: z.string(),
  tipo_riga: z.string(),
  ore_per_unita: nullableNumber,
  qualifica_id: nullableNumber,
  qualifica_dex: nullableString,
  gru_cons_dex: nullableString,
  assegnato: nullableBoolean,
  arrivato_eseguito: nullableBoolean,
  usato: nullableBoolean,
  azione_per_mat: nullableString,
  oda_da_emettere: z.boolean(),
  destinaz_per_mat: z
    .object({
      dest_cod: z.string(),
      dest_dex: z.string(),
    })
    .array(),
  abilitato_a: nullableString,
  odt_id: nullableNumber,
  odl_id: nullableNumber,
  oda_id: nullableNumber,
});

export const v_odv_righe_ass_cons = new View(
  Schema.VEND,
  "v_odv_righe_ass_cons",
  response,
  {
    idField: "odv_riga_id",
  }
);
