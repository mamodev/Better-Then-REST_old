import { z } from "zod";
import { RPC } from "../../core/RPC.js";
import {
  nullableBoolean,
  nullableNumber,
  nullableString,
} from "../../core/zodUtils.js";
import { Entities } from "../../Entities.js";
import { Schema } from "../../Schema.js";

const data = z.object({
  in_intervento: z.object({
    intervento_id: nullableNumber,
    intervento_operaz: nullableString,
    note_chiusura_interv: nullableString,
    lavoro_terminato: nullableBoolean,
    dex_nuovo_intervento: nullableString,
    con_consuntivo_lavoro: nullableBoolean,
    consuntivo_lavoro: z
      .object({
        interv_risorsa_id: z.number(),
        consuntivo_ore: z.number(),
        non_eseguito: nullableBoolean,
      })
      .array(),
  }),
  in_odl: z.object({
    odl_id: nullableNumber,
    odl_operaz: nullableString,
    note_chiusura_odl: nullableString,
    contestato: nullableBoolean,
    note_contestazione: nullableString,
    richiesto_contatto: nullableBoolean,
    con_componenti_utilizzati: nullableBoolean,
    componenti_utilizzati: z
      .object({
        odl_riga_prodotta_id: z.number(),
        componente_id: z.number(),
        qta: z.number(),
      })
      .array(),
  }),
});

const omitIntervention = {
  in_intervento: {
    intervento_id: null,
    intervento_operaz: null,
    note_chiusura_interv: null,
    lavoro_terminato: null,
    dex_nuovo_intervento: null,
    con_consuntivo_lavoro: null,
    consuntivo_lavoro: [],
  },
};

const response = z.object({
  odl_id: z.number(),
  intervento_id: nullableNumber,
});

export const intervention_closure = new RPC(
  Schema.LASE,
  "odl_chiusura",
  data,
  response,
  {},
  () => {
    Entities.WorkOrderHeader.deepInvalidate();
    Entities.WorkOrderIntervention.deepInvalidate();
  }
);

export const odl_chiusura = new RPC(
  Schema.LASE,
  "odl_chiusura",
  data,
  response,
  {
    ...omitIntervention,
  },
  () => {
    Entities.WorkOrderHeader.deepInvalidate();
    Entities.WorkOrderIntervention.deepInvalidate();
  }
);

export const intervention_reopen = new RPC(
  Schema.LASE,
  "odl_chiusura",
  data,
  response,
  {
    in_intervento: {
      intervento_operaz: "a",
      note_chiusura_interv: null,
      lavoro_terminato: null,
      dex_nuovo_intervento: null,
      con_consuntivo_lavoro: null,
      consuntivo_lavoro: [],
    },
    in_odl: {
      odl_operaz: null,
      note_chiusura_odl: null,
      contestato: null,
      note_contestazione: null,
      richiesto_contatto: null,
      con_componenti_utilizzati: null,
      componenti_utilizzati: [],
    },
  },
  () => {
    Entities.WorkOrderIntervention.deepInvalidate();
  }
);
export const delete_work_order = new RPC(
  Schema.LASE,
  "odl_chiusura",
  data,
  response,
  {
    ...omitIntervention,
    in_odl: {
      odl_operaz: "e",
      note_chiusura_odl: null,
      contestato: null,
      note_contestazione: null,
      richiesto_contatto: null,
      con_componenti_utilizzati: null,
      componenti_utilizzati: [],
    },
  },
  () => {
    Entities.WorkOrderIntervention.deepInvalidate();
    Entities.WorkOrderHeader.deepInvalidate();
  }
);
