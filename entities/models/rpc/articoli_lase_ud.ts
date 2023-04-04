import { z } from "zod";
import { RPC } from "../../core/RPC.js";
import { nullableNumber } from "../../core/zodUtils.js";
import { Entities } from "../../Entities.js";
import { Schema } from "../../Schema.js";
import { v_articoli_lase } from "../view/v_articoli_lase.js";

const data = z.object({
  in_operaz: z.string().length(1),
  in_art_id: z.number(),
  in_prezzo_vendita: nullableNumber,
  in_qualifica_id: nullableNumber,
  in_ore_per_unita: nullableNumber,
  in_tum: z.null(),
});

const response = v_articoli_lase.responseModel;

export const articoli_lase_update = new RPC(
  Schema.BASE,
  "articoli_lase_ud",
  data,
  response,
  {
    in_operaz: "U",
    in_tum: null,
  },
  (response) => {
    Entities.LaSeProducts.update(response.articolo_id, () => response);
  }
);

export const articoli_lase_delete = new RPC(
  Schema.BASE,
  "articoli_lase_ud",
  data,
  z.null(),
  {
    in_operaz: "D",
    in_prezzo_vendita: null,
    in_qualifica_id: null,
    in_ore_per_unita: null,
    in_tum: null,
  }
);
