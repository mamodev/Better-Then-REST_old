import { z } from "zod";
import { View } from "../../core/View.js";
import { nullableNumber, nullableString } from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

export const model = z.object({
  struttura_id: z.number(),
  odv_id: z.number(),
  progetto_id: z.number(),
  liv1: nullableNumber,
  liv2: nullableNumber,
  liv3: nullableNumber,
  liv4: nullableNumber,
  dex: nullableString,
  presso: nullableString,
});

export const v_odv_strutt = new View(Schema.VEND, "v_odv_strutt", model, {
  idField: "struttura_id",
});
