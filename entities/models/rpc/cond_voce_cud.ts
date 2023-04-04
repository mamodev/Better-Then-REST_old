import { z } from "zod";
import { RPC } from "../../core/RPC.js";
import {
  nullableBoolean,
  nullableNumber,
  nullableString,
} from "../../core/zodUtils.js";
import { Entities } from "../../Entities.js";
import { Schema } from "../../Schema.js";

const response = Entities.EntryCondition.view.responseModel;

const data = z.object({
  in_operaz: z.string().length(1),
  in_id: nullableNumber,
  in_condiz_id: nullableNumber,
  in_categ_id: nullableNumber,
  in_marchio: nullableString,
  in_linea: nullableString,
  in_secondario: nullableBoolean,
  in_gg_cons: nullableNumber,
  in_gg_cons_max: nullableNumber,
  in_sconto_cascata: nullableString,
  in_sconto_acq: nullableNumber,
  in_note: nullableString,
  in_pag_cod: nullableString,
  in_sc_su_pag: nullableNumber,
  in_porto_franco: nullableBoolean,
  in_sp_trasp_ddt: nullableNumber,
  in_sp_trasp_perc: nullableNumber,
  in_prz_catal_ivato: nullableBoolean,
  in_oda_differito: nullableBoolean,
  in_tum: z.null(),
});

export const cond_voce_update = new RPC(
  Schema.BASE,
  "cond_voce_cud",
  data,
  response,
  {
    in_operaz: "U",
    in_tum: null,
  },
  (response) => {
    Entities.EntryCondition.update(response.id, () => response);
  },
  {
    singleObject: true,
  }
);

export const cond_voce_create = new RPC(
  Schema.BASE,
  "cond_voce_cud",
  data,
  response,
  {
    in_operaz: "C",
    in_id: null,
    in_categ_id: null,
    in_marchio: null,
    in_linea: null,
    in_secondario: null,
    in_gg_cons: null,
    in_gg_cons_max: null,
    in_sconto_cascata: null,
    in_sconto_acq: null,
    in_note: null,
    in_pag_cod: null,
    in_sc_su_pag: null,
    in_porto_franco: null,
    in_sp_trasp_ddt: null,
    in_sp_trasp_perc: null,
    in_prz_catal_ivato: null,
    in_oda_differito: null,
    in_tum: null,
  },
  () => {
    Entities.EntryCondition.invalidate({});
  },
  {
    singleObject: true,
  }
);

export const cond_voce_remove = new RPC(
  Schema.BASE,
  "cond_voce_cud",
  data,
  z.null(),
  {
    in_operaz: "D",
    in_categ_id: null,
    in_condiz_id: null,
    in_marchio: null,
    in_linea: null,
    in_secondario: null,
    in_gg_cons: null,
    in_gg_cons_max: null,
    in_sconto_cascata: null,
    in_sconto_acq: null,
    in_note: null,
    in_pag_cod: null,
    in_sc_su_pag: null,
    in_porto_franco: null,
    in_sp_trasp_ddt: null,
    in_sp_trasp_perc: null,
    in_prz_catal_ivato: null,
    in_oda_differito: null,
    in_tum: null,
  },
  (_, vars) => {
    if (vars.in_id) Entities.EntryCondition.remove(vars.in_id);
  },
  {
    singleObject: true,
  }
);
