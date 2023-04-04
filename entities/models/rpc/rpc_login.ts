import { z } from "zod";
import { RPC } from "../../core/RPC.js";
import { Schema } from "../../Schema.js";

const data = z.object({
  in_utente_nome: z.string(),
  in_password: z.string(),
});

const response = z.object({
  token: z.string(),
  sede_default: z.string(),
  sede_default_dex: z.string(),
});

export const rpc_login = new RPC(Schema.CORE, "login", data, response, {});
