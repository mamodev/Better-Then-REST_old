import { z } from "zod";
import { nullableApiDate } from "../../core/apiDate.js";
import { View } from "../../core/View.js";
import { nullableString } from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

const model = z.object({
  interv_id: z.number(),
  odl_id: z.number(),
  data_interv: nullableApiDate,
  fino_a: nullableApiDate,
  orario_da: nullableString,
  dex: nullableString,
  tipo: nullableString,
  sede: nullableString,
  sede_dex: nullableString,
  numero_odv: nullableString,
  data_cons_ordine: nullableApiDate,
  cliente_odv: nullableString,
  appunt_preso: z.boolean(),
});

export const v_interv_odl_cons = new View(
  Schema.LASE,
  "v_interv_odl_cons",
  model,
  {
    idField: "interv_id",
  }
);
