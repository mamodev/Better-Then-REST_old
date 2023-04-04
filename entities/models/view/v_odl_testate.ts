import { z } from "zod";
import { View } from "../../core/View.js";
import {
  nullableBoolean,
  nullableNumber,
  nullableString,
} from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

export const model = z.object({
  numero: z.number(),
  sede: nullableString,
  sede_dex: nullableString,
  riferimento: nullableString,
  indirizzo_cliente: nullableString,
  cdl_id: nullableNumber,
  centro_lavoro: nullableString,
  tipo_odl: nullableString,
  tipo_odl_dex: nullableString,
  responsab_id: nullableNumber,
  responsab_dex: nullableString,
  odl_dex: nullableString,
  del: nullableString,
  stato_dex: nullableString,
  note_chiusura: nullableString,
  note_contestaz: nullableString,
  richiesto_contatto: nullableBoolean,
  contiene_interventi: z.boolean(),
  chiuso: z.boolean(),
});

export const v_odl_testate = new View(Schema.LASE, "v_odl_testate", model, {
  idField: "numero",
});
