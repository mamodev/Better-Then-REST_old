import { z } from "zod";
import { RPC } from "../../core/RPC.js";
import { nullableNumber, nullableString } from "../../core/zodUtils.js";
import { Entities } from "../../Entities.js";
import { Schema } from "../../Schema.js";

const data = z.object({
  in_testata: z.object({
    doc_est_nr: z.string(),
    //TODO change this to apiDate model
    doc_est_data: z.string(),
    data_mov: z.string(),
    //TODO change this to apiDate model
    doc_int_ricev_id: z.null(),
    sede: z.string(),
    controp_id: z.number(),
  }),
  in_righe: z
    .object({
      qta: z.number(),
      oda_riga_id: z.number(),
      nr_colli: z.number(),
    })
    .array(),
});

const response = z.object({
  p_new_mov_id: nullableNumber,
  p_proseguo: nullableString,
});

export const arr_da_forn = new RPC(
  Schema.MAGA,
  "arr_da_forn",
  data,
  response,
  {},
  (_, data) => {
    Entities.IncomFromOda.invalidate({ forn_id: data.in_testata.controp_id });
  }
);
