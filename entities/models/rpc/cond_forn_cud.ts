import { z } from "zod";
import { nullableApiDate } from "../../core/apiDate.js";
import { RPC } from "../../core/RPC.js";
import { Entities } from "../../Entities.js";
import { Schema } from "../../Schema.js";

const response = Entities.SupplierCondition.view.responseModel;

const data = z.object({
  in_operaz: z.string().length(1),
  in_id: z.number().nullable(),
  in_fornitore_id: z.number().nullable(),
  in_dex: z.string().nullable(),
  in_eccez_1_da: nullableApiDate,
  in_eccez_1_a: nullableApiDate,
  in_eccez_2_da: nullableApiDate,
  in_eccez_2_a: nullableApiDate,
  in_validita_fine: nullableApiDate,
  in_tum: z.null(),
});

export const cond_forn_create = new RPC(
  Schema.BASE,
  "cond_forn_cud",
  data,
  response,
  {
    in_operaz: "C",
    in_id: null,
    in_dex: null,
    in_eccez_1_da: null,
    in_eccez_1_a: null,
    in_eccez_2_da: null,
    in_eccez_2_a: null,
    in_validita_fine: null,
    in_tum: null,
  },
  () => {
    Entities.SupplierCondition.invalidate({});
  }
);

export const cond_forn_update = new RPC(
  Schema.BASE,
  "cond_forn_cud",
  data,
  response,
  { in_operaz: "U", in_tum: null },
  (response) => {
    Entities.SupplierCondition.update(response.id, () => response);
  }
);

export const cond_forn_delete = new RPC(
  Schema.BASE,
  "cond_forn_cud",
  data,
  z.null(),
  {
    in_operaz: "D",
    in_fornitore_id: null,
    in_dex: null,
    in_eccez_1_da: null,
    in_eccez_1_a: null,
    in_eccez_2_da: null,
    in_eccez_2_a: null,
    in_validita_fine: null,
    in_tum: null,
  },
  (_, params) => {
    if (params.in_id) Entities.SupplierCondition.remove(params.in_id);
  }
);
