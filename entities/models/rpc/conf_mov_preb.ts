import { z } from "zod";
import { RPC } from "../../core/RPC.js";
import { nullableString } from "../../core/zodUtils.js";
import { Entities } from "../../Entities.js";
import { Schema } from "../../Schema.js";

const data = z.object({
  in_preb_mov_id: z.number(),
});

const response = z.object({
  rc: nullableString,
  msg: nullableString,
  id: nullableString,
});

export const conf_mov_preb = new RPC(
  Schema.MAGA,
  "conf_mov_preb",
  data,
  response,
  {},
  () => {
    Entities.Movements.deepInvalidate();
    Entities.MovementsRows.deepInvalidate();
  }
);
