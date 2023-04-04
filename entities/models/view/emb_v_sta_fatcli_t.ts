import { z } from "zod";
import { View } from "../../core/View.js";
import { nullableNumber, nullableString } from "../../core/zodUtils.js";
import { Schema } from "../../Schema.js";

const model = z.object({
  fattura_id: z.number(),
  dati_azienda_denom: nullableString,
  dati_azienda_indir: nullableString,
  dati_azienda_cap: nullableString,
  dati_azienda_comune: nullableString,
  dati_azienda_prov: nullableString,
  dati_azienda_piva: nullableString,
  dati_azienda_telef: nullableString,
  cod_config: nullableString,
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
  tot_imponibile: z.number(),
  tot_imposta: z.number(),
  tot_documento: z.number(),
  dicitura_caus_del_trasp: nullableString,
  dicitura_cons_tramite: nullableString,
  dicitura_data_consegna: nullableString,
  dicitura_firma: nullableString,
  frase_finale: nullableString,
  righe: z
    .object({
      id: z.number(),
      fattura_id: z.number(),
      riga: nullableNumber,
      rif_odv: nullableString,
      rif_consegna: nullableString,
      dex_riga_fatt: nullableString,
      um: nullableString,
      qta: nullableNumber,
      imponib: nullableNumber,
      cod_iva: nullableString,
      odv_riga_id: nullableNumber,
      odv_id: nullableNumber,
    })
    .array(),

  riepilogo: z
    .object({
      fattura_id: z.number(),
      imponibile: nullableNumber,
      imposta: nullableNumber,
      cod_iva: nullableString,
      aliq: nullableString,
      natura: nullableString,
    })
    .array(),
});

export const emb_v_sta_fatcli_t = new View(
  Schema.VEND,
  "v_sta_fatcli_t",
  model,
  {
    idField: "fattura_id",
    embeddedViews: [
      { view: "v_sta_fatcli_i", alias: "riepilogo" },
      { view: "v_sta_fatcli_r", alias: "righe" },
    ],
  }
);
