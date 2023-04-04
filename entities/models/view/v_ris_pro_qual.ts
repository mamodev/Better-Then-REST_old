import { z } from "zod";
import { View } from "../../core/View.js";
import { Schema } from "../../Schema.js";

const response = z.object({
  risorsa_dex: z.string(),
  giorno: z.string(),
  risorsa_id: z.number(),
  // qualifica_id: z.number(),
  // qualifica_dex: z.string(),
  presenze_e_impegni: z.string(),
});

export const v_ris_pro_qual = new View(Schema.LASE, "v_ris_pro_qual", response);
