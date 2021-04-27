import { FichaFinancAssistidoEntidade } from ".";
import { ResumoContrachequeEntidade } from ".";

export class ContrachequeEntidade
{
    public Rubricas: Array<FichaFinancAssistidoEntidade>;
    public Proventos: Array<FichaFinancAssistidoEntidade>;
    public Descontos: Array<FichaFinancAssistidoEntidade>;

    public Resumo: ResumoContrachequeEntidade
}