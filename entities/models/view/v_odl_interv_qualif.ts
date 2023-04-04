import { z } from "zod";
import { View } from "../../core/View.js";
import { nullableNumber } from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

const model = z.object({
  interv_id: z.number(),
  qualifica_id: z.number(),
  qualifica_dex: z.string(),
  ore_previste: nullableNumber,
});

export const v_odl_interv_qualif = new View(
  Schema.LASE,
  "v_odl_interv_qualif",
  model,
  {
    idField: "qualifica_id",
  }
);
