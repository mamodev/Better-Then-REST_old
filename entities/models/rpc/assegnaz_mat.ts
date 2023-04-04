import { z } from "zod";
import { RPC } from "../../core/RPC.js";
import { toGArray } from "../../core/zodUtils.js";
import { Entities } from "../../Entities.js";
import { Schema } from "../../Schema.js";

const data = z.object({
  in_odv_righe_selez: toGArray(z.number),
  in_odv_righe_dest: toGArray(z.string),
});

const response = z.number();

export const assegnaz_mat = new RPC(
  Schema.LASE,
  "assegnaz_mat",
  data,
  response,
  {},
  (response) => {
    Entities.OrderRowsShippingAssignment.invalidate({ odv_id: response });
  }
);
