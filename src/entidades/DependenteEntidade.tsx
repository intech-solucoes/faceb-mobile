export class DependenteEntidade {
	public SQ_PESSOA_DEP: number;
	public CD_PESSOA_DEP: number;
	public CD_PESSOA_PAI: number;
	public DT_INCLUSAO_DEP?: Date;
	public DT_TERM_VALIDADE?: Date;
	public CD_MOT_PERDA_VALIDADE?: number;
	public CD_GRAU_PARENTESCO: number;
	public IR_ASSISTENCIAL: string;
	public IR_PREVIDENCIAL: string;
	public IR_ABATIMENTO_IRRF: string;
	public DT_INIC_IRRF?: Date;
	public DT_TERM_IRRF?: Date;
	public SQ_TIPO_DEPENDENTE?: number;
	public EE_SALARIO_FAMILIA: string;
	public EE_DESIGNADO: string;
	public DT_NASCIMENTO: Date;
	public NO_PESSOA: string;
	public NR_CPF: string;
	public DS_GRAU_PARENTESCO: string;
	public IR_SEXO: string;
	public DT_INCLUSAO?: Date;
}
