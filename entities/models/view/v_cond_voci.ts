import { z } from "zod";
import { View } from "../../core/View.js";
import { Schema } from "../../Schema.js";

export const model = z.object({
  id: z.number(),
  condiz_id: z.number(),
  fornitore_id: z.number(),
  fornitore_dex: z.string(),
  categ_id: z.number().nullable(),
  categ_dex: z.string().nullable(),
  marchio: z.string().nullable(),
  linea: z.string().nullable(),
  gg_cons: z.number().nullable(),
  gg_cons_max: z.number().nullable(),
  sconto_cascata: z.string().nullable(),
  sconto_acq: z.number().nullable(),
  note: z.string().nullable(),
  pag_cod: z.string().nullable(),
  pag_dex: z.string().nullable(),
  sc_su_pag: z.number().nullable(),
  porto_franco: z.boolean().nullable(),
  sp_trasp_ddt: z.number().nullable(),
  sp_trasp_perc: z.number().nullable(),
  prz_catal_ivato: z.boolean().nullable(),
  oda_differito: z.boolean().nullable(),
  secondario: z.boolean().nullable(),
});

export const v_cond_voci = new View(Schema.BASE, "v_cond_voci", model);
