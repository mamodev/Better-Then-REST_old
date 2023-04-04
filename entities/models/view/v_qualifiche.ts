import { z } from "zod";
import { View } from "../../core/View.js";
import { Schema } from "../../Schema.js";

export const model = z.object({
  id: z.number(),
  dex: z.string(),
  prezzo_orario: z.number(),
});

export const v_qualifiche = new View(Schema.BASE, "v_qualifiche", model);
