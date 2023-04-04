import { z } from "zod";
import { apiDate } from "../../core/apiDate.js";
import { View } from "../../core/View.js";
import { nullableNumber, nullableString } from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

const model = z.object({
  interv_ris_id: z.number(),
  odl_id: z.number(),
  interv_id: z.number(),
  risorsa_id: z.number(),
  risorsa_dex: z.string(),
  data_interv: apiDate,
  dalle_ore_reali: nullableString,
  dalle_ore: nullableString,
  per_ore: nullableNumber,
  non_eseguito: nullableString,
  esecuzione_dex: nullableString,
  consuntivo_ore: nullableString,
  consuntivo_note: nullableString,
});

export const v_odl_interv_risorse = new View(
  Schema.LASE,
  "v_odl_interv_risorse",
  model,
  {
    idField: "interv_ris_id",
  }
);
