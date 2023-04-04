import { z } from "zod";
import { View } from "../../core/View.js";
import { stringArray } from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

export const model = z.object({
  utente: z.string(),
  sede_sessione: z.string(),
  sede_iniziale: z.string(),
  persona_nome: z.string(),
  sede_iniziale_dex: z.string(),
  sede_sessione_dex: z.string(),
  lista_funzioni_autorizzate: stringArray,
});

export const v_info_sessione = new View(Schema.CORE, "v_info_sessione", model, {
  idField: "NO-ID",
});
