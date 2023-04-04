import { z } from "zod";
import { RPC } from "../../core/RPC.js";
import { nullableNumber, nullableString } from "../../core/zodUtils.js";
import { Entities } from "../../Entities.js";
import { Schema } from "../../Schema.js";

const data = z.object({
  in_id_da_spostare: z.number(),
  in_id_dove: z.number(),
  in_sotto: z.boolean(),
});

const response = z.object({
  rc: z.string(),
  msg: nullableString,
  id: nullableNumber,
});

export const odv_strutt_sposta = new RPC(
  Schema.VEND,
  "odv_strutt_sposta",
  data,
  response,
  {},
  () => {
    Entities.ProjectSection.deepInvalidate();
  }
);
