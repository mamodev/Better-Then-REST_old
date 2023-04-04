
class Mutex {
  private _locked: boolean = false;
  private _waitQueue: Array<(vaalue: unknown) => void> = [];

  public async acquire(): Promise<void> {
    while (this._locked) {
      await new Promise((resolve) => this._waitQueue.push(resolve));
    }
    this._locked = true;
  }

  public release(): void {
    const resolve = this._waitQueue.shift();

    if (resolve) resolve(null);
    else this._locked = false;
  }
}

class SequentialCounter {
  private _counter: number = 0;
  private _mutex: Mutex = new Mutex();

  public async getNext(): Promise<number> {
    await this._mutex.acquire();
    const nextValue = ++this._counter;
    this._mutex.release();
    return nextValue;
  }
}

const socket = new WebSocket("ws://localhost:8888");
const requestCounter = new SequentialCounter();

const buffer_size = 1000;
const requestBuff: Array<(data: SocketResponse) => void> = [];

type SocketResponse = {
  id: number;
  error: boolean;
  data: any;
};

socket.addEventListener("message", (event) => {
  const response = JSON.parse(event.data) as SocketResponse;

  const resolve = requestBuff[response.id % buffer_size];
  if (resolve) resolve(response);
});

function addToBuff(id: number, resolve: (data: SocketResponse) => void) {
  requestBuff[id % buffer_size] = resolve;
}

function socketWrite(req: SocketRequest) {
  socket.send(JSON.stringify(req));
}

async function socketRequest(req: SocketRequest) {
  const socketData = await new Promise((resolve) => {
    addToBuff(req.id, resolve);
    socketWrite(req);
  });

  return socketData;
}

export async function getEntity<E extends Entity>(
  entity: E,
  args: EntityArgs
): Promise<TEntity[E]> {
  const req: SocketRequest = {
    id: await requestCounter.getNext(),
    type: SocketRequestType.Entity,
    res: entity,
    args,
  };

  return (await await socketRequest(req)) as TEntity[E];
}

//Type definitions
type EntityArgs = {};

enum SocketRequestType {
  Entity = 0,
  RPC = 1,
}

type SocketRequestArgs = Record<string, boolean | string | number>;

type SocketRequest = {
  id: number;
  type: SocketRequestType;
  res: string;
  args: SocketRequestArgs;
};


export enum Entity {
	ResourceExceptions = "ResourceExceptions",
	WorkOrderInterventionTitles = "WorkOrderInterventionTitles",
	TransferOrderSend = "TransferOrderSend",
	ProductsCategory = "ProductsCategory",
	SupplierCondition = "SupplierCondition",
	WeeklyResourceCommitments = "WeeklyResourceCommitments",
	Stocks = "Stocks",
	Domains = "Domains",
	ShippingWorkOrderDetails = "ShippingWorkOrderDetails",
	EntryCondition = "EntryCondition",
	DailyResourceCommitments = "DailyResourceCommitments",
	WorkOrderRow = "WorkOrderRow",
	ProvidersNoConditions = "ProvidersNoConditions",
	WorkOrderComponents = "WorkOrderComponents",
	Invoice = "Invoice",
	SearchProduct = "SearchProduct",
	TransferOrder = "TransferOrder",
	ShippingWorkOrder = "ShippingWorkOrder",
	SalesOrder = "SalesOrder",
	UniqueProductsPriceCond = "UniqueProductsPriceCond",
	OrderRowsShippingAssignment = "OrderRowsShippingAssignment",
	TransferOrderRecive = "TransferOrderRecive",
	SessionInfo = "SessionInfo",
	ResourceDayCommitment = "ResourceDayCommitment",
	Qualifications = "Qualifications",
	Bill = "Bill",
	InvoiceSummary = "InvoiceSummary",
	EnabledSites = "EnabledSites",
	Movements = "Movements",
	MovementsRows = "MovementsRows",
	WorkOrderHeader = "WorkOrderHeader",
	WorkOrderInterventionResource = "WorkOrderInterventionResource",
	GeneralInfo = "GeneralInfo",
	WorkOrderIntervention = "WorkOrderIntervention",
	IncomFromOda = "IncomFromOda",
	ExpectedRecepits = "ExpectedRecepits",
	ProjectSection = "ProjectSection",
	LaSeProducts = "LaSeProducts",
}



export type TEntity = {
	[Entity.ResourceExceptions]: ResourceExceptionsDef
	[Entity.WorkOrderInterventionTitles]: WorkOrderInterventionTitlesDef
	[Entity.TransferOrderSend]: TransferOrderSendDef
	[Entity.ProductsCategory]: ProductsCategoryDef
	[Entity.SupplierCondition]: SupplierConditionDef
	[Entity.WeeklyResourceCommitments]: WeeklyResourceCommitmentsDef
	[Entity.Stocks]: StocksDef
	[Entity.Domains]: DomainsDef
	[Entity.ShippingWorkOrderDetails]: ShippingWorkOrderDetailsDef
	[Entity.EntryCondition]: EntryConditionDef
	[Entity.DailyResourceCommitments]: DailyResourceCommitmentsDef
	[Entity.WorkOrderRow]: WorkOrderRowDef
	[Entity.ProvidersNoConditions]: ProvidersNoConditionsDef
	[Entity.WorkOrderComponents]: WorkOrderComponentsDef
	[Entity.Invoice]: InvoiceDef
	[Entity.SearchProduct]: SearchProductDef
	[Entity.TransferOrder]: TransferOrderDef
	[Entity.ShippingWorkOrder]: ShippingWorkOrderDef
	[Entity.SalesOrder]: SalesOrderDef
	[Entity.UniqueProductsPriceCond]: UniqueProductsPriceCondDef
	[Entity.OrderRowsShippingAssignment]: OrderRowsShippingAssignmentDef
	[Entity.TransferOrderRecive]: TransferOrderReciveDef
	[Entity.SessionInfo]: SessionInfoDef
	[Entity.ResourceDayCommitment]: ResourceDayCommitmentDef
	[Entity.Qualifications]: QualificationsDef
	[Entity.Bill]: BillDef
	[Entity.InvoiceSummary]: InvoiceSummaryDef
	[Entity.EnabledSites]: EnabledSitesDef
	[Entity.Movements]: MovementsDef
	[Entity.MovementsRows]: MovementsRowsDef
	[Entity.WorkOrderHeader]: WorkOrderHeaderDef
	[Entity.WorkOrderInterventionResource]: WorkOrderInterventionResourceDef
	[Entity.GeneralInfo]: GeneralInfoDef
	[Entity.WorkOrderIntervention]: WorkOrderInterventionDef
	[Entity.IncomFromOda]: IncomFromOdaDef
	[Entity.ExpectedRecepits]: ExpectedRecepitsDef
	[Entity.ProjectSection]: ProjectSectionDef
	[Entity.LaSeProducts]: LaSeProductsDef
}

type ResourceExceptionsDef = {
	id: number,
	risorsa_id: number,
	classe: string | null,
	risorsa_dex: string,
	giorni_settimana: string | null,
	tipo_cod: string | null,
	tipo_dex: string | null,
	causale: string | null,
	fino_a: Date | null,
	data_da: Date,
	ore_giorno: number | null,
	ore_modulo: number | null,
	ore: number | null,
	nota: string | null,
	storica: boolean,
}
type WorkOrderInterventionTitlesDef = {
	interv_id: number,
	qualifica_id: number,
	qualifica_dex: string,
	ore_previste: number | null,
}
type TransferOrderSendDef = {
	odt_id: number | null,
	per_odv_riga_id: number | null,
	art_id: number | null,
	qta: number | null,
	emesso_da_id: number | null,
	a_sede_dex: string | null,
	riferimento: string | null,
	a_mag: string | null,
	motivo: string | null,
	emmesso_da_dex: string | null,
	articolo: string | null,
	um: string | null,
	data_creaz: Date | null,
	sede: string | null,
	da_sede: string | null,
	da_sede_dex: string | null,
	da_mag: string | null,
	a_sede: string | null,
}
type ProductsCategoryDef = {
	seq: string,
	id: number,
	piano: string | null,
	cod: string,
	dex: string | null,
	associabile: boolean,
}
type SupplierConditionDef = {
	id: number,
	dex: string | null,
	denom: string,
	fornitore_id: number,
	eccez_1_da: Date | null,
	eccez_1_a: Date | null,
	eccez_2_da: Date | null,
	eccez_2_a: Date | null,
	validita_fine: Date | null,
}
type WeeklyResourceCommitmentsDef = {
	risorsa_dex: string,
	giorno: string,
	risorsa_id: number,
	presenze_e_impegni: string,
}
type StocksDef = {
	sede_cod: string | null,
	sede: string | null,
	magazzino_cod: string | null,
	magazzino: string | null,
	art_id: number | null,
	articolo: string | null,
	um: string,
	qta: number | null,
	qta_impegnata: number | null,
	lotto_id: number | null,
	riferimento: string | null,
	ubicaz_id: number | null,
}
type DomainsDef = {
	ambito: string,
	dominio: string,
	cod: string,
	dex: string | null,
	seq: string | null,
}
type ShippingWorkOrderDetailsDef = {
	odl_id: number,
	cdl_id: number | null,
	odl_del: string | null,
	sede: string | null,
	sede_dex: string | null,
	riferimento: string | null,
	indirizzo_consegna: string | null,
	centro_lavoro: string | null,
	tipo_odl: string | null,
	tipo_odl_dex: string | null,
	righe_consegna: 	{
		odl_id: number,
		odl_riga_id: number,
		odv_riga_id: number,
		progetto_id: number | null,
		struttura_id: number | null,
		progetto_dex: string | null,
		att_mag: string,
		pezzo_fuori_sede: boolean,
		pezzo: string,
		um: string,
		qta: number,
}
,
	interventi_consegna: 	{
		odl_id: number,
		interv_dex: string | null,
		data_interv: Date | null,
		orario_da: string | null,
		appunt_preso: boolean,
		chiuso: boolean,
		terminato: boolean | null,
}
,
}
type EntryConditionDef = {
	id: number,
	condiz_id: number,
	fornitore_id: number,
	fornitore_dex: string,
	categ_id: number | null,
	categ_dex: string | null,
	marchio: string | null,
	linea: string | null,
	gg_cons: number | null,
	gg_cons_max: number | null,
	sconto_cascata: string | null,
	sconto_acq: number | null,
	note: string | null,
	pag_cod: string | null,
	pag_dex: string | null,
	sc_su_pag: number | null,
	porto_franco: boolean | null,
	sp_trasp_ddt: number | null,
	sp_trasp_perc: number | null,
	prz_catal_ivato: boolean | null,
	oda_differito: boolean | null,
	secondario: boolean | null,
}
type DailyResourceCommitmentsDef = {
	interv_ris_id: number,
	odl_id: number,
	interv_id: number,
	risorsa_id: number,
	risorsa_dex: string,
	data_interv: Date,
	dalle_ore_reali: string | null,
	dalle_ore: string | null,
	per_ore: number | null,
	non_eseguito: string | null,
	esecuzione_dex: string | null,
	consuntivo_ore: string | null,
	consuntivo_note: string | null,
}
type WorkOrderRowDef = {
	odl_id: number,
	odl_riga_id: number,
	odv_riga_id: number,
	progetto_id: number | null,
	struttura_id: number | null,
	progetto_dex: string | null,
	item_prefix: string | null,
	item_dex: string | null,
	item_dex2: string | null,
	um: string,
	qta: number,
	fonte: string,
	tipo_art: string,
	tipo_riga: string,
	ore_per_unita: number | null,
}
type ProvidersNoConditionsDef = {
	fornitore_id: number,
	denom: string,
}
type WorkOrderComponentsDef = {
	odl_id: number,
	progetto_id: number | null,
	struttura_id: number | null,
	odl_riga_prodotta_id: number,
	componente_id: number,
	qta: number,
	progetto_dex: string | null,
	semilavorato_dex: string | null,
	componente_dex: string,
	um: string,
}
type InvoiceDef = {
	fattura_id: number,
	dati_azienda_denom: string | null,
	dati_azienda_indir: string | null,
	dati_azienda_cap: string | null,
	dati_azienda_comune: string | null,
	dati_azienda_prov: string | null,
	dati_azienda_piva: string | null,
	dati_azienda_telef: string | null,
	cod_config: string | null,
	tipo_doc_dex: string | null,
	numero: string | null,
	del: string | null,
	controp_denom: string | null,
	controp_indirizzo: string | null,
	controp_cap: string | null,
	controp_comune: string | null,
	controp_provincia: string | null,
	controp_cfisc: string | null,
	controp_piva: string | null,
	partenza_dicitura: string | null,
	partenza_denom: string | null,
	partenza_indir: string | null,
	partenza_cap_etc: string | null,
	partenza_telef: string | null,
	destinaz_dicitura: string | null,
	destinaz_denom: string | null,
	destinaz_indir: string | null,
	destinaz_cap_etc: string | null,
	destinaz_telef: string | null,
	tot_imponibile: number,
	tot_imposta: number,
	tot_documento: number,
	dicitura_caus_del_trasp: string | null,
	dicitura_cons_tramite: string | null,
	dicitura_data_consegna: string | null,
	dicitura_firma: string | null,
	frase_finale: string | null,
	righe: 	{
		id: number,
		fattura_id: number,
		riga: number | null,
		rif_odv: string | null,
		rif_consegna: string | null,
		dex_riga_fatt: string | null,
		um: string | null,
		qta: number | null,
		imponib: number | null,
		cod_iva: string | null,
		odv_riga_id: number | null,
		odv_id: number | null,
}
,
	riepilogo: 	{
		fattura_id: number,
		imponibile: number | null,
		imposta: number | null,
		cod_iva: string | null,
		aliq: string | null,
		natura: string | null,
}
,
}
type SearchProductDef = {
	art_id: number,
	cat_dex: string | null,
	marchio: string | null,
	linea: string | null,
	codice: string | null,
	art_dex: string | null,
	um: string | null,
	cod_iva: string | null,
	cond_voce_id: number | null,
	categ_id: number | null,
	prezzo: number | null,
	modif_marchio: boolean | null,
	modif_linea: boolean | null,
	modif_codice: boolean | null,
	modif_dex: boolean | null,
	obblig_marchio: boolean | null,
	obblig_linea: boolean | null,
	obblig_codice: boolean | null,
	obblig_dex: boolean | null,
	obblig_dex2: boolean | null,
}
type TransferOrderDef = {
	odt_id: number | null,
	per_odv_riga_id: number | null,
	art_id: number | null,
	qta: number | null,
	emesso_da_id: number | null,
	a_sede_dex: string | null,
	riferimento: string | null,
	a_mag: string | null,
	motivo: string | null,
	emmesso_da_dex: string | null,
	articolo: string | null,
	um: string | null,
	data_creaz: Date | null,
	sede: string | null,
	da_sede: string | null,
	da_sede_dex: string | null,
	da_mag: string | null,
	a_sede: string | null,
}
type ShippingWorkOrderDef = {
	interv_id: number,
	odl_id: number,
	data_interv: Date | null,
	fino_a: Date | null,
	orario_da: string | null,
	dex: string | null,
	tipo: string | null,
	sede: string | null,
	sede_dex: string | null,
	numero_odv: string | null,
	data_cons_ordine: Date | null,
	cliente_odv: string | null,
	appunt_preso: boolean,
}
type SalesOrderDef = {
	odv_id: number,
	venditore_id: number | null,
	cliente_id: number | null,
	tipo: string | null,
	tipo_cod_dom: string | null,
	tipo_decod: string | null,
	numero: string | null,
	del: Date | null,
	dex: string | null,
	denom: string | null,
	indirizzo: string | null,
	comune: string | null,
	provincia: string | null,
	cap: string | null,
	cellulare: string | null,
	telefono: string | null,
	email: string | null,
	estremi: string | null,
	stato_dex: string | null,
	sede: string | null,
	sede_dex: string | null,
	venditore_dex: string | null,
	chiuso: boolean | null,
	numero_est_mancante: boolean | null,
}
type UniqueProductsPriceCondDef = {
	art_id: number,
	cat_dex: string | null,
	marchio: string | null,
	linea: string | null,
	codice: string | null,
	art_dex: string | null,
	um: string,
	tipo_art_cod: string | null,
	tipo_art_dex: string | null,
	univoco: boolean,
	stato: string | null,
	stato_dex: string | null,
	fornitore: string | null,
	cond_voce_id: number | null,
	gg_cons: number | null,
	gg_cons_max: number | null,
	sconto_cascata: string | null,
	sconto_acq: number | null,
	pag_cod: string | null,
	condizioni_dex: string | null,
	cond_voce_art_id: number | null,
	prezzo_list: number | null,
	prz_acq_netto: number | null,
	prezzo_vend: number | null,
	moltiplicatore_arrot: number | null,
	cod_art_forn: string | null,
}
type OrderRowsShippingAssignmentDef = {
	odv_id: number,
	gru_cons_id: number | null,
	odv_riga_id: number,
	art_id: number,
	progetto_id: number | null,
	struttura_id: number | null,
	gru_cons_nr: number | null,
	item: string | null,
	item_d: string | null,
	sub_dex: string | null,
	um: string,
	qta: number | null,
	fonte: string | null,
	fonte_dex: string | null,
	fonte_cod_un: string | null,
	cons_prevista: string | null,
	tipo_art: string,
	tipo_riga: string,
	ore_per_unita: number | null,
	qualifica_id: number | null,
	qualifica_dex: string | null,
	gru_cons_dex: string | null,
	assegnato: boolean | null,
	arrivato_eseguito: boolean | null,
	usato: boolean | null,
	azione_per_mat: string | null,
	oda_da_emettere: boolean,
	destinaz_per_mat: unknown,
	abilitato_a: string | null,
	odt_id: number | null,
	odl_id: number | null,
	oda_id: number | null,
}
type TransferOrderReciveDef = {
	odt_id: number | null,
	per_odv_riga_id: number | null,
	art_id: number | null,
	qta: number | null,
	emesso_da_id: number | null,
	a_sede_dex: string | null,
	riferimento: string | null,
	a_mag: string | null,
	motivo: string | null,
	emmesso_da_dex: string | null,
	articolo: string | null,
	um: string | null,
	data_creaz: Date | null,
	sede: string | null,
	da_sede: string | null,
	da_sede_dex: string | null,
	da_mag: string | null,
	a_sede: string | null,
}
type SessionInfoDef = {
	utente: string,
	sede_sessione: string,
	sede_iniziale: string,
	persona_nome: string,
	sede_iniziale_dex: string,
	sede_sessione_dex: string,
	lista_funzioni_autorizzate: unknown,
}
type ResourceDayCommitmentDef = {
	interv_ris_id: number,
	odl_id: number,
	interv_id: number,
	risorsa_id: number,
	risorsa_dex: string,
	data_interv: Date,
	dalle_ore_reali: string | null,
	dalle_ore: string | null,
	per_ore: number | null,
	non_eseguito: string | null,
	esecuzione_dex: string | null,
	consuntivo_ore: string | null,
	consuntivo_note: string | null,
}
type QualificationsDef = {
	id: number,
	dex: string,
	prezzo_orario: number,
}
type BillDef = {
	mov_id: number | null,
	dati_azienda_denom: string | null,
	dati_azienda_indir: string | null,
	dati_azienda_cap: string | null,
	dati_azienda_comune: string | null,
	dati_azienda_prov: string | null,
	dati_azienda_piva: string | null,
	dati_azienda_telef: string | null,
	tipo_doc_mag: string | null,
	tipo_doc_dex: string | null,
	numero: string | null,
	del: string | null,
	controp_denom: string | null,
	controp_indirizzo: string | null,
	controp_cap: string | null,
	controp_comune: string | null,
	controp_provincia: string | null,
	controp_cfisc: string | null,
	controp_piva: string | null,
	partenza_dicitura: string | null,
	partenza_denom: string | null,
	partenza_indir: string | null,
	partenza_cap_etc: string | null,
	partenza_telef: string | null,
	destinaz_dicitura: string | null,
	destinaz_denom: string | null,
	destinaz_indir: string | null,
	destinaz_cap_etc: string | null,
	destinaz_telef: string | null,
	tot_imponibile: string | null,
	tot_imposta: string | null,
	tot_documento: string | null,
	dicitura_caus_del_trasp: string | null,
	dicitura_cons_tramite: string | null,
	dicitura_data_consegna: string | null,
	dicitura_firma: string | null,
	frase_finale: string | null,
	righe: 	{
		id: number | null,
		mov_id: number | null,
		riga: number | null,
		rif_odv: string | null,
		articolo: string | null,
		descrizione: string | null,
		um: string | null,
		qta: number | null,
		odv_riga_id: number | null,
		odv_id: number | null,
}
,
}
type InvoiceSummaryDef = {
	fattura_id: number,
	numero: string | null,
	tipo_doc: string | null,
	tipo_doc_dex: string | null,
	acc_o_vend: string | null,
	fatt_denom: string | null,
	odv_numero: string | null,
	sede: string | null,
	del: Date | null,
	sede_dex: string | null,
	gru_fatt_id: number | null,
	imp_fattura: number | null,
	imp_incasso: number | null,
}
type EnabledSitesDef = {
	sede: string,
	dexb: string,
}
type MovementsDef = {
	mov_id: number,
	sede_cod: string | null,
	causale_cod: string | null,
	sede: string | null,
	causale: string | null,
	controparte: string | null,
	controp_id: number | null,
	data_mov: string | null,
	nr_documento: string | null,
	nr_doc_ricevuto: string | null,
	fatturazione: string | null,
	stato_cod: string | null,
	stato_dex: string | null,
	tipo_doc_mag: string | null,
}
type MovementsRowsDef = {
	mov_id: number,
	mov_riga_id: number,
	controp_id: number | null,
	sede_cod: string | null,
	magazzino_cod: string | null,
	sede: string | null,
	causale: string | null,
	magazzino: string | null,
	controparte: string | null,
	data_mov: string | null,
	nr_doc_ricevuto: string | null,
	articolo: string | null,
	riferimento: string | null,
	um: string | null,
	nr_documento: string | null,
	dex_estesa: string | null,
	ubicaz_id: number | null,
	art_id: number | null,
	qta: number | null,
	colli_arrivati: number | null,
}
type WorkOrderHeaderDef = {
	numero: number,
	sede: string | null,
	sede_dex: string | null,
	riferimento: string | null,
	indirizzo_cliente: string | null,
	cdl_id: number | null,
	centro_lavoro: string | null,
	tipo_odl: string | null,
	tipo_odl_dex: string | null,
	responsab_id: number | null,
	responsab_dex: string | null,
	odl_dex: string | null,
	del: string | null,
	stato_dex: string | null,
	note_chiusura: string | null,
	note_contestaz: string | null,
	richiesto_contatto: boolean | null,
	contiene_interventi: boolean,
	chiuso: boolean,
}
type WorkOrderInterventionResourceDef = {
	interv_ris_id: number,
	odl_id: number,
	interv_id: number,
	risorsa_id: number,
	risorsa_dex: string,
	data_interv: Date,
	dalle_ore_reali: string | null,
	dalle_ore: string | null,
	per_ore: number | null,
	non_eseguito: string | null,
	esecuzione_dex: string | null,
	consuntivo_ore: string | null,
	consuntivo_note: string | null,
}
type GeneralInfoDef = {
	azienda: string,
	db: string,
}
type WorkOrderInterventionDef = {
	odl_id: number,
	id: number,
	interv_dex: string | null,
	data_interv: Date | null,
	data_interv_dex: string | null,
	ora_interv_dex: string | null,
	per_ore: number | null,
	livello: string | null,
	livello_dex: string | null,
	presso: string | null,
	presso_dex: string | null,
	appunt_preso: boolean | null,
	ora_appunt: string | null,
	appunt_preso_con: string | null,
	appunt_preso_da_id: number | null,
	appunt_preso_da_nome: string | null,
	appunt_preso_da_il: string | null,
	appunt_note: string | null,
	stato_dex: string | null,
	terminato: boolean | null,
	fino_a: string | null,
	note_chiusura: string | null,
	chiuso: boolean,
}
type IncomFromOdaDef = {
	forn_id: number,
	oda_riga_id: number,
	numero: string | null,
	riferimento: string | null,
	art_id: number | null,
	articolo: string | null,
	um: string | null,
	qta: number | null,
}
type ExpectedRecepitsDef = {
	fattura_id: number,
	numero: string | null,
	del: Date,
	tipo_doc: string | null,
	deb_cred: string | null,
	tipo_doc_dex: string | null,
	fatt_denom: string | null,
	odv_id: number | null,
	sede: string | null,
	gru_fatt_id: number | null,
	imp_fattura: number | null,
	imp_incasso: number | null,
	commissione: string | null,
	denom: string | null,
	imp_atteso: number | null,
	previsto: string | null,
}
type ProjectSectionDef = {
	struttura_id: number,
	odv_id: number,
	progetto_id: number,
	liv1: number | null,
	liv2: number | null,
	liv3: number | null,
	liv4: number | null,
	dex: string | null,
	presso: string | null,
}
type LaSeProductsDef = {
	articolo_id: number,
	cat_dex: string | null,
	marchio: string | null,
	linea: string | null,
	codice: string | null,
	art_dex: string | null,
	um: string,
	tipo_art_cod: string,
	tipo_art_dex: string,
	stato: string | null,
	stato_dex: string | null,
	qualifica_id: number | null,
	qualifica_dex: string | null,
	ore_per_unita: number | null,
	prz_orario_assunto: number | null,
	prezzo_listino: number | null,
	prezzo_acq_netto: number | null,
	prezzo_vendita: number | null,
	da_attualizzare: boolean,
}
