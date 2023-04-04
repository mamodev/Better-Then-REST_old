import { z } from "zod";
import { RPC } from "../../core/RPC.js";
import { nullableNumber, toGArray } from "../../core/zodUtils.js";
import { Entities } from "../../Entities.js";
import { Schema } from "../../Schema.js";

const data = z.object({
  in_operaz: z.string().length(1),
  in_art_id_lista: toGArray(z.number),
  in_cond_voce_id: nullableNumber,
});

export const art_cond_associa = new RPC(
  Schema.BASE,
  "art_cond_associa",
  data,
  z.null(),
  {
    in_operaz: "A",
  },
  () => {
    Entities.UniqueProductsPriceCond.invalidate({});
  }
);

export const art_cond_disassocia = new RPC(
  Schema.BASE,
  "art_cond_associa",
  data,
  z.null(),
  {
    in_operaz: "D",
    in_cond_voce_id: null,
  },
  () => {
    Entities.UniqueProductsPriceCond.invalidate({});
  }
);
