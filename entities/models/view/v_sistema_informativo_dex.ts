import { z } from "zod";
import { View } from "../../core/View.js";
import { Schema } from "../../Schema.js";

const model = z.object({
  azienda: z.string(),
  db: z.string(),
});

export const v_sistema_informativo_dex = new View(
  Schema.CORE,
  "v_sistema_informativo_dex",
  model,
  {
    idField: "NO-ID",
  }
);
