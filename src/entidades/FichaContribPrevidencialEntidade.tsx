export class FichaContribPrevidencialEntidade {
	public SQ_FICHA: number;
	public SQ_PLANO_PREVIDENCIAL: number;
	public SQ_CONTRATO_TRABALHO: number;
	public SQ_TIPO_FUNDO: number;
	public SQ_TIPO_COBRANCA: number;
	public DT_REFERENCIA: Date;
	public DT_COMPETENCIA: Date;
	public VL_CONTRIBUICAO?: number;
	public QT_COTA_CONTRIBUICAO?: number;
	public VL_BASE_FUNDACAO?: number;
	public VL_BASE_PREVIDENCIA?: number;
	public DT_APORTE?: Date;
	public VL_COTA?: number;
	public IR_OPERACAO: string;
	public IR_LANCAMENTO: number;
	public ID_CONTRIBUICAO?: number;
	public SQ_ORIGEM?: number;
	public SQ_CRONOGRAMA?: number;
	public DS_TIPO_COBRANCA: string;
	public DS_TIPO_FUNDO: string;
	public VL_RESGATE: number;
}
