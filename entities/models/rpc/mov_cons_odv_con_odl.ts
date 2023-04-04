import { z } from "zod";
import { RPC } from "../../core/RPC.js";
import { toGArray } from "../../core/zodUtils.js";
import { Entities } from "../../Entities.js";
import { Schema } from "../../Schema.js";

const data = z.object({
  in_odl_righe_id: toGArray(z.number),
});

const response = z.unknown();

export const mov_cons_odv_con_odl = new RPC(
  Schema.MAGA,
  "mov_cons_odv_con_odl",
  data,
  response,
  {},
  () => {
    Entities.ShippingWorkOrder.deepInvalidate();
    Entities.ShippingWorkOrderDetails.deepInvalidate();
    Entities.Movements.deepInvalidate();
    Entities.MovementsRows.deepInvalidate();
  }
);
