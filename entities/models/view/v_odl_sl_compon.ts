import { z } from "zod";
import { View } from "../../core/View.js";
import { nullableNumber, nullableString } from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

export const model = z.object({
  odl_id: z.number(),
  progetto_id: nullableNumber,
  struttura_id: nullableNumber,
  odl_riga_prodotta_id: z.number(),
  componente_id: z.number(),
  qta: z.number(),
  progetto_dex: nullableString,
  semilavorato_dex: nullableString,
  componente_dex: z.string(),
  um: z.string(),
});

export const v_odl_sl_compon = new View(Schema.LASE, "v_odl_sl_compon", model, {
  idField: "componente_id",
});
