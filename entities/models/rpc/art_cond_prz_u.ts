import { z } from "zod";
import { RPC } from "../../core/RPC.js";
import { nullableNumber, nullableString } from "../../core/zodUtils.js";
import { Entities } from "../../Entities.js";
import { Schema } from "../../Schema.js";
import { v_art_cond } from "../view/v_art_cond.js";

const data = z.object({
  in_art_id: z.number(),
  in_cond_voce_id: nullableNumber,
  in_prezzo_list: nullableNumber,
  in_prezzo_vend: nullableNumber,
  in_cod_art_forn: nullableString,
  in_tum: z.null(),
});

const response = v_art_cond.responseModel;

export const art_cond_prz_u = new RPC(
  Schema.BASE,
  "art_cond_prz_u",
  data,
  response,
  {
    in_tum: null,
  },
  (response) => {
    Entities.UniqueProductsPriceCond.update(response.art_id, () => response);
  }
);
