import { z } from "zod";
import { View } from "../../core/View.js";
import { nullableNumber, nullableString } from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

export const model = z.object({
  odl_id: z.number(),
  odl_riga_id: z.number(),
  odv_riga_id: z.number(),
  progetto_id: nullableNumber,
  struttura_id: nullableNumber,
  progetto_dex: nullableString,
  item_prefix: nullableString,
  item_dex: nullableString,
  item_dex2: nullableString,
  um: z.string(),
  qta: z.number(),
  fonte: z.string(),
  tipo_art: z.string(),
  tipo_riga: z.string(),
  ore_per_unita: nullableNumber,
});

export const v_odl_righe = new View(Schema.LASE, "v_odl_righe", model, {
  idField: "odl_riga_id",
});
