export class ResultadoSimuladorCebprev
{
    public ValorFuturo: number;
    public DataAposentadoria: string;
    public ValorSaque: number;
    public IdadeDependente: number;
    public FatorAtuarialPensaoMorte: number;
    public FatorAtuarialSemPensaoMorte: number;
    public RendaPrazoIndeterminadoPensaoMorte: number;
    public RendaPrazoIndeterminadoSemPensaoMorte: number;
    public ListaPrazos: Array<any>;
    public ListaSaldoPercentuais: Array<any>;
}