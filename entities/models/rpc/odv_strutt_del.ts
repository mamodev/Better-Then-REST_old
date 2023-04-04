import { z } from "zod";
import { RPC } from "../../core/RPC.js";
import { nullableNumber, nullableString } from "../../core/zodUtils.js";
import { Entities } from "../../Entities.js";
import { Schema } from "../../Schema.js";

const data = z.object({
  in_id: z.number(),
});

const response = z.object({
  rc: z.string(),
  msg: nullableString,
  id: nullableNumber,
});

export const odv_strutt_del = new RPC(
  Schema.VEND,
  "odv_strutt_del",
  data,
  response,
  {},
  (_, vars) => {
    Entities.ProjectSection.remove(vars.in_id);
  }
);
