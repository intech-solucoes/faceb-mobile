export class EnderecoPessoaEntidade {
	public SQ_ENDERECO: number;
	public CD_PESSOA: number;
	public CD_TIPO_ENDERECO?: number;
	public CD_MUNICIPIO: string;
	public CD_UF: string;
	public NR_CEP: string;
	public DS_ENDERECO: string;
	public NR_ENDERECO: string;
	public DS_COMPLEMENTO: string;
	public NO_BAIRRO: string;
	public NR_FONE: string;
	public NR_RAMAL: string;
	public NR_CELULAR: string;
	public NR_FAX: string;
	public NO_EMAIL: string;
	public NO_PAGINA_WEB: string;
	public IR_RECEB_CORR: string;
	public SQ_LOCALIDADE?: number;
	public SQ_BAIRRO?: number;
	public SQ_TIPO_LOGRADOURO?: number;
	public EE_RESIDENCIA_PROPRIA: string;
	public EE_RECURSO_FGTS: string;
	public SQ_PAIS?: number;
	public NR_PAIS: string;
	public IR_CORRESPONDENCIA: string;
}
