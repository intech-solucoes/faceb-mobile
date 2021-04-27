export class HistSaldoContratoEntidade {
	public SQ_HISTORICO: number;
	public SQ_CONTRATO: number;
	public DT_VENCIMENTO: Date;
	public IR_ORIGEM_PAGTO: string;
	public DT_PAGAMENTO?: Date;
	public NR_PARCELA?: number;
	public VL_COBRANCA?: number;
	public VL_DESCONTO?: number;
	public VL_RECEBIDO?: number;
	public VL_SALDO?: number;
	public VL_AMORTIZADO?: number;
	public VL_CORRECAO?: number;
	public IR_OPERACAO: string;
	public VL_TAXA?: number;
	public DT_OPERACAO?: Date;
	public CODMOV: string;
	public CODFORMA: string;
	public VL_JUROS?: number;
	public VL_SALDO_ANTERIOR?: number;
	public NR_PARC?: number;
	public NR_PARC_BKP?: number;
}
