import { z } from "zod";
import { View } from "../../core/View.js";

const response = z.object({
  seq: z.string(),
  id: z.number(),
  piano: z.string().nullable(),
  cod: z.string(),
  dex: z.string().nullable(),
  associabile: z.boolean(),
});

export const v_categ_articoli = new View("base", "v_categ_articoli", response, {
  nameMapper: {
    cod: "codice",
    dex: "descrizione",
  },
});
