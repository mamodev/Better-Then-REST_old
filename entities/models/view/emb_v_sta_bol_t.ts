import { z } from "zod";
import { View } from "../../core/View.js";
import { nullableNumber, nullableString } from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

const model = z.object({
  mov_id: nullableNumber,
  dati_azienda_denom: nullableString,
  dati_azienda_indir: nullableString,
  dati_azienda_cap: nullableString,
  dati_azienda_comune: nullableString,
  dati_azienda_prov: nullableString,
  dati_azienda_piva: nullableString,
  dati_azienda_telef: nullableString,
  tipo_doc_mag: nullableString,
  tipo_doc_dex: nullableString,
  numero: nullableString,
  del: nullableString,
  controp_denom: nullableString,
  controp_indirizzo: nullableString,
  controp_cap: nullableString,
  controp_comune: nullableString,
  controp_provincia: nullableString,
  controp_cfisc: nullableString,
  controp_piva: nullableString,
  partenza_dicitura: nullableString,
  partenza_denom: nullableString,
  partenza_indir: nullableString,
  partenza_cap_etc: nullableString,
  partenza_telef: nullableString,
  destinaz_dicitura: nullableString,
  destinaz_denom: nullableString,
  destinaz_indir: nullableString,
  destinaz_cap_etc: nullableString,
  destinaz_telef: nullableString,
  tot_imponibile: nullableString,
  tot_imposta: nullableString,
  tot_documento: nullableString,
  dicitura_caus_del_trasp: nullableString,
  dicitura_cons_tramite: nullableString,
  dicitura_data_consegna: nullableString,
  dicitura_firma: nullableString,
  frase_finale: nullableString,
  righe: z
    .object({
      id: nullableNumber,
      mov_id: nullableNumber,
      riga: nullableNumber,
      rif_odv: nullableString,
      articolo: nullableString,
      descrizione: nullableString,
      um: nullableString,
      qta: nullableNumber,
      odv_riga_id: nullableNumber,
      odv_id: nullableNumber,
    })
    .array(),
});

export const emb_v_sta_bol_t = new View(Schema.MAGA, "v_sta_bol_t", model, {
  idField: "mov_id",
  embeddedViews: [{ view: "v_sta_bol_r", alias: "righe" }],
});
