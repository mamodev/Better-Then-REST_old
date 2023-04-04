import { Entity } from "./core/Entity.js";
import { v_odt } from "./models/rpc/v_odt.js";
import { emb_v_sta_bol_t } from "./models/view/emb_v_sta_bol_t.js";
import { emb_v_sta_fatcli_t } from "./models/view/emb_v_sta_fatcli_t.js";
import { emb_v_odl_cons_test } from "./models/view/emv_v_odl_cons_test.js";
import { v_articoli_lase } from "./models/view/v_articoli_lase.js";
import { v_art_cond } from "./models/view/v_art_cond.js";
import { v_art_vend } from "./models/view/v_art_vend.js";
import { v_categ_articoli } from "./models/view/v_categ_articoli.js";
import { v_cond_forn } from "./models/view/v_cond_forn.js";
import { v_cond_voci } from "./models/view/v_cond_voci.js";
import { v_domini } from "./models/view/v_domini.js";
import { v_fatt_da_inc } from "./models/view/v_fatt_da_inc.js";
import { v_forn_no_cond } from "./models/view/v_forn_no_cond.js";
import { v_giacenze } from "./models/view/v_giacenze.js";
import { v_info_sessione } from "./models/view/v_info_sessione.js";
import { v_interv_odl_cons } from "./models/view/v_interv_odl_cons.js";
import { v_lista_fatt_cli } from "./models/view/v_lista_fatt_cli.js";
import { v_mov_righe } from "./models/view/v_mov_righe.js";
import { v_mov_test } from "./models/view/v_mov_test.js";
import { v_oda_da_arrivare } from "./models/view/v_oda_da_arrivare.js";
import { v_odl_interventi } from "./models/view/v_odl_interventi.js";
import { v_odl_interv_qualif } from "./models/view/v_odl_interv_qualif.js";
import { v_odl_interv_risorse } from "./models/view/v_odl_interv_risorse.js";
import { v_odl_righe } from "./models/view/v_odl_righe.js";
import { v_odl_sl_compon } from "./models/view/v_odl_sl_compon.js";
import { v_odl_testate } from "./models/view/v_odl_testate.js";
import { v_odv } from "./models/view/v_odv.js";
import { v_odv_righe_ass_cons } from "./models/view/v_odv_righe_ass_cons.js";
import { v_odv_strutt } from "./models/view/v_odv_strutt.js";
import { v_qualifiche } from "./models/view/v_qualifiche.js";
import { v_ris_eccez } from "./models/view/v_ris_eccez.js";
import { v_ris_pro_qual } from "./models/view/v_ris_pro_qual.js";
import { v_sedi_per_utente } from "./models/view/v_sedi_per_utente.js";
import { v_sistema_informativo_dex } from "./models/view/v_sistema_informativo_dex.js";

export const Entities = {
  SearchProduct: new Entity(v_art_vend, {}),

  Domains: new Entity(v_domini, {}),
  // Vend
  SalesOrder: new Entity(v_odv, {}),
  SupplierCondition: new Entity(v_cond_forn, {}),
  EntryCondition: new Entity(v_cond_voci, {}),
  ProductsCategory: new Entity(v_categ_articoli, {}),
  GeneralInfo: new Entity(v_sistema_informativo_dex, {}),
  EnabledSites: new Entity(v_sedi_per_utente, {}),
  SessionInfo: new Entity(v_info_sessione, {}),
  ProvidersNoConditions: new Entity(v_forn_no_cond, {}),
  ProjectSection: new Entity(v_odv_strutt, { progetto_id: "eq" }),
  ExpectedRecepits: new Entity(v_fatt_da_inc, {}),
  LaSeProducts: new Entity(v_articoli_lase, {}),
  Qualifications: new Entity(v_qualifiche, {}),
  UniqueProductsPriceCond: new Entity(v_art_cond, {}),
  OrderRowsShippingAssignment: new Entity(v_odv_righe_ass_cons, {
    odv_id: "eq",
  }),
  WorkOrderHeader: new Entity(v_odl_testate, {}),
  WorkOrderRow: new Entity(v_odl_righe, { odl_id: "eq" }),
  WorkOrderIntervention: new Entity(v_odl_interventi, { odl_id: "eq" }),
  WorkOrderComponents: new Entity(v_odl_sl_compon, { odl_id: "eq" }),
  WeeklyResourceCommitments: new Entity(v_ris_pro_qual, { giorno: "eq" }),
  DailyResourceCommitments: new Entity(v_odl_interv_risorse, {
    data_interv: "eq",
    risorsa_id: "eq",
  }),
  WorkOrderInterventionResource: new Entity(v_odl_interv_risorse, {
    interv_id: "eq",
  }),
  WorkOrderInterventionTitles: new Entity(v_odl_interv_qualif, {
    interv_id: "eq",
  }),

  // Maga
  IncomFromOda: new Entity(v_oda_da_arrivare, { forn_id: "eq" }),
  Stocks: new Entity(v_giacenze, {}),
  Movements: new Entity(v_mov_test, {}),
  MovementsRows: new Entity(v_mov_righe, {}),
  Invoice: new Entity(emb_v_sta_fatcli_t, {}),
  InvoiceSummary: new Entity(v_lista_fatt_cli, {}),
  TransferOrderRecive: new Entity(v_odt, { a_sede: "eq" }),
  TransferOrderSend: new Entity(v_odt, { da_sede: "eq" }),
  TransferOrder: new Entity(v_odt, {}),
  Bill: new Entity(emb_v_sta_bol_t, {}),
  ShippingWorkOrder: new Entity(v_interv_odl_cons, {}),
  ShippingWorkOrderDetails: new Entity(emb_v_odl_cons_test, {}),
  ResourceExceptions: new Entity(v_ris_eccez, {}),
  ResourceDayCommitment: new Entity(v_odl_interv_risorse, {
    data_interv: "eq",
  }),
};
