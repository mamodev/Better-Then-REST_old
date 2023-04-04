import { z } from "zod";
import { RPC } from "../../core/RPC.js";
import {
  nullableNumber,
  nullableString,
  toGArray,
} from "../../core/zodUtils.js";
import { Entities } from "../../Entities.js";
import { Schema } from "../../Schema.js";

const data = z.object({
  in_fattura_id: z.number(),
  in_causale_dex: nullableString,
  in_metodi_incasso: toGArray(z.string),
  in_importi_incasso: toGArray(z.number),
  in_buoni_incassati: toGArray(z.number().nullable),
});

const response = z.object({
  rc: z.string(),
  msg: nullableString,
  id: nullableNumber,
});

export const reg_inc_cli = new RPC(
  Schema.CONT,
  "reg_inc_cli",
  data,
  response,
  {},
  () => {
    Entities.ExpectedRecepits.invalidate({});
  }
);
