import { z } from "zod";
import { RPC } from "../../core/RPC.js";
import { toGArray } from "../../core/zodUtils.js";
import { Entities } from "../../Entities.js";
import { Schema } from "../../Schema.js";

const data = z.object({
  in_odv_righe_att_id: toGArray(z.number),
  in_odv_righe_mat_id: toGArray(z.number),
});

const response = z.number();

export const odl_base_cre = new RPC(
  Schema.LASE,
  "odl_base_cre",
  data,
  response,
  {},
  (response) => {
    Entities.OrderRowsShippingAssignment.invalidate({ odv_id: response });
  }
);
