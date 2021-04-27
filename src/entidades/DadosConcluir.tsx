import { BeneficiarioPlanoItem } from "../pages/AlteracaoCadastral";
import { ArquivoUploadItem } from "../pages/AlteracaoCadastral/ArquivoUpload";

export class DadosConcluir {
  public TokenEnviado: string;
  public TokenDigitado: string;
  public NR_CEP: string;
  public DS_ENDERECO: string;
  public NR_ENDERECO: string;
  public DS_COMPLEMENTO: string;
  public NO_BAIRRO: string;
  public DS_MUNICIPIO: string;
  public NR_CELULAR: string;
  public NR_FONE: string;
  public NO_EMAIL: string;
  public SQ_PAIS: number;
  public CD_UF: string;
  public CD_MUNICIPIO: string;
  public EE_POLITICAMENTE_EXPOSTO: string;
  public EE_US_PERSON: string;
  public CD_BANCO: string;
  public CD_AGENCIA: string;
  public NR_CC: string;
  public DV_CC: string;
  public ListaArquivo: Array<ArquivoUploadItem>;
  public BeneficiarioPlano: Array<BeneficiarioPlanoItem>;
}
