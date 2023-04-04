import { z } from "zod";
import { RPC } from "../../core/RPC.js";
import { Schema } from "../../Schema.js";

const data = z.object({
  in_utente_nome: z.string(),
  in_nuova_sede: z.string(),
});

const response = z.object({
  token: z.string(),
  sede_sessione: z.string(),
  sede_sessione_dex: z.string(),
});

export const cambio_sede_sessione = new RPC(
  Schema.CORE,
  "cambio_sede_sessione",
  data,
  response,
  {}
);
