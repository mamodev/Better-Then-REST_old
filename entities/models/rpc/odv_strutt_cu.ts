import { z } from "zod";
import { RPC } from "../../core/RPC.js";
import { nullableNumber, nullableString } from "../../core/zodUtils.js";
import { Entities } from "../../Entities.js";
import { Schema } from "../../Schema.js";

const data = z.object({
  in_operaz: z.string().length(1),
  in_progetto_id: z.number(),
  in_id: nullableNumber,
  in_liv1: nullableNumber,
  in_dex: nullableString,
  in_presso: nullableString,
});

const response = z.object({
  rc: z.string(),
  msg: nullableString,
  id: nullableNumber,
});

export const odv_strutt_create = new RPC(
  Schema.VEND,
  "odv_strutt_cu",
  data,
  response,
  {
    in_operaz: "C",
    in_liv1: null,
    in_id: null,
  },
  (_, vars) => {
    Entities.ProjectSection.invalidate({ progetto_id: vars.in_progetto_id });
  }
);

export const odv_strutt_update = new RPC(
  Schema.VEND,
  "odv_strutt_cu",
  data,
  response,
  {
    in_operaz: "U",
  },
  (_, vars) => {
    Entities.ProjectSection.invalidate({ progetto_id: vars.in_progetto_id });
  }
);
