export class TempoServicoEntidade {
	public SQ_TEMPO_SERVICO: number;
	public CD_PESSOA_EMPREGADO: number;
	public CD_PESSOA_EMPREGADOR: number;
	public CD_GRUPO_ATIVIDADE?: number;
	public IR_REG_ATIVIDADE: string;
	public DT_INIC_ATIVIDADE?: Date;
	public DT_TERM_ATIVIDADE?: Date;
	public QT_ANOS?: number;
	public QT_MESES?: number;
	public QT_DIAS?: number;
	public EE_COMPROVADO: string;
	public NR_MATRICULA: string;
}
