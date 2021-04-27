export class AlteracaoRendaEntidade {
	public OID_ALTERACAO_RENDA_PW: number;
	public CD_PESSOA: number;
	public SQ_PROCESSO: number;
	public DT_INIC_VALIDADE: Date;
	public SQ_OPCAO_RECEBIMENTO_ANT: number;
	public SQ_OPCAO_RECEBIMENTO_NOVA: number;
	public VL_RM_FUNDACAO: number;
	public VL_PARCELA: number;
	public COD_IDENTIFICADOR: string;
	public DTA_SOLICITACAO: Date;
	public DTA_EFETIVACAO?: Date;
	public TXT_USUARIO_SOLICITACAO: string;
	public TXT_USUARIO_EFETIVACAO: string;
	public IND_ORIGEM: string;
}
