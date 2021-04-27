export class UsuarioEntidade {
	public USR_CODIGO: number;
	public USR_LOGIN: string;
	public USR_SENHA: string;
	public USR_ADMINISTRADOR: string;
	public USR_TIPO_EXPIRACAO: string;
	public USR_DIAS_EXPIRACAO?: number;
	public USR_IMAGEM_DIGITAL: string;
	public USR_FOTO: string;
	public USR_NOME: string;
	public USR_EMAIL: string;
	public USR_DIGITAL?: number;
	public USR_INICIO_EXPIRACAO?: Date;
	public CD_PESSOA?: number;
	public EE_TERMO_RESPONSABILIDADE: string;
	public USR_SENHA_NOVA: string;
	public CD_PESSOA_CLIENTE?: number;
	public NO_SENHA: string;
}
