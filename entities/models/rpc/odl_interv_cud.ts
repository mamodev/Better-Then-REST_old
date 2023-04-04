import { z } from "zod";
import { nullableApiDate } from "../../core/apiDate.js";
import { RPC } from "../../core/RPC.js";
import { nullableNumber, nullableString } from "../../core/zodUtils.js";
import { Entities } from "../../Entities.js";
import { Schema } from "../../Schema.js";

const data = z.object({
  in_operaz: z.string(),
  in_intervento: z.object({
    intervento_id: nullableNumber,
    odl_id: nullableNumber,
    dex: nullableString,
    data_interv: nullableApiDate,
    fino_a: nullableString,
    orario_da: nullableString,
    per_ore: nullableNumber,
    appuntam_ora: nullableString,
    appuntam_preso_con: nullableString,
    appuntam_note: nullableString,
  }),
  in_risorse: z
    .object({
      risorsa_id: z.number(),
      orario_da: nullableString,
      per_ore: nullableNumber,
    })
    .array(),
});

const response = z.object({ odl_id: z.number(), intervento_id: z.number() });

export const odl_interv_create = new RPC(
  Schema.LASE,
  "odl_interv_cud",
  data,
  response,
  {
    in_operaz: "C",
    in_risorse: [],
    in_intervento: {
      intervento_id: null,
      data_interv: null,
      fino_a: null,
      orario_da: null,
      per_ore: 0,
      appuntam_ora: null,
      appuntam_preso_con: null,
      appuntam_note: null,
    },
  },
  () => Entities.WorkOrderIntervention.deepInvalidate()
);

export const odl_interv_update = new RPC(
  Schema.LASE,
  "odl_interv_cud",
  data,
  response,
  {
    in_operaz: "U",
  },
  () => {
    Entities.DailyResourceCommitments.deepInvalidate();
    Entities.WeeklyResourceCommitments.deepInvalidate();
    Entities.WorkOrderIntervention.deepInvalidate();
  }
);
