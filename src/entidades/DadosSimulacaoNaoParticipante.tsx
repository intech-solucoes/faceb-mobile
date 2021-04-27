export class DadosSimulacaoNaoParticipante {
  public Nome: string;
  public Email: string;
  public DataNascimento: Date;
  public Sexo: string;
  public IdadeAposentadoria: number;
  public ContribBasica: number;
  public ContribFacultativa: number;
  public TaxaJuros: number;
  public AporteInicial: number;
  public Saque: number;
  public NascimentoConjugue?: Date;
  public NascimentoFilhoInvalido?: Date;
  public SexoFilhoInvalido?: string;
  public NascimentoFilhoMaisNovo?: Date;
  public SexoFilhoMaisNovo?: string;
}