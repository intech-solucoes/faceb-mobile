export class ContratoTrabalhoEntidade {
	public SQ_CONTRATO_TRABALHO: number;
	public CD_PESSOA: number;
	public CD_PESSOA_PATR: number;
	public CD_PESSOA_REPR?: number;
	public SQ_MOTIVO_DEMISSAO?: number;
	public NR_REGISTRO: string;
	public SQ_GRUPO_RISCO?: number;
	public SQ_MOTIVO_ADMISSAO: number;
	public SQ_TIPO_ADMISSAO: number;
	public SQ_TIPO_FUNCIONARIO: number;
	public DT_ADMISSAO?: Date;
	public DT_APOSENTADORIA?: Date;
	public DT_DEMISSAO?: Date;
	public EE_APOSENTADO: string;
	public SQ_SITUACAO?: number;
	public DT_SITUACAO?: Date;
	public IR_TIPO_ADMISSAO?: number;
	public IR_INDICATIVO_ADMISSAO?: number;
	public EE_PRIMEIRO_EMPREGO: string;
	public IR_TIPO_REGIME_TRABALHISTA?: number;
	public IR_TIPO_REGIME_PREVIDENCIARIO?: number;
	public IR_NATUREZA_ATIVIDADE?: number;
	public SQ_CATEGORIA_TRABALHADOR?: number;
	public IR_TIPO_CONTRATO?: number;
	public IR_EXPOSICAO_AGENTE_NOCIVO?: number;
	public TXT_OBSERVACAO: string;
}
