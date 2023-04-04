import { z } from "zod";
import { RPC } from "../../core/RPC.js";
import { toGArray } from "../../core/zodUtils.js";
import { Entities } from "../../Entities.js";
import { Schema } from "../../Schema.js";

const data = z.object({
  in_art_id_lista: toGArray(z.number),
});

export const articoli_lase_attual = new RPC(
  Schema.BASE,
  "articoli_lase_attual",
  data,
  z.string(),
  {},
  () => {
    Entities.LaSeProducts.invalidate({});
  }
);
