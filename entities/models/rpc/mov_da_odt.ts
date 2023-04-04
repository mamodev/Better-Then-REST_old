import { z } from "zod";
import { RPC } from "../../core/RPC.js";
import { toGArray } from "../../core/zodUtils.js";
import { Entities } from "../../Entities.js";
import { Schema } from "../../Schema.js";

const model = z.object({
  in_operaz: z.string(),
  in_righe_id: toGArray(z.number),
});

const response = z.object({});

export const mov_da_odt_remove = new RPC(
  Schema.MAGA,
  "mov_da_odt",
  model,
  response,
  {
    in_operaz: "CAN",
  },
  () => {
    Entities.Movements.deepInvalidate();
    Entities.MovementsRows.deepInvalidate();
  }
);

export const mov_da_odt_send = new RPC(
  Schema.MAGA,
  "mov_da_odt",
  model,
  response,
  {
    in_operaz: "INV",
  },
  () => {
    Entities.Movements.deepInvalidate();
    Entities.MovementsRows.deepInvalidate();
  }
);
