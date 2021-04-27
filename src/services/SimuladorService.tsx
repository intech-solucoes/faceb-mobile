import { BaseService, RequestType, ResponseType } from "@intech/expo-service";
import { DadosSimuladorFaceb1 } from "../entidades/DadosSimuladorFaceb1";
import { ResultadoSimuladorFaceb1 } from "../entidades/ResultadoSimuladorFaceb1";
import { DadosSimuladorCebprev } from "../entidades/DadosSimuladorCebprev";
import { DadosSimuladorCebprevPasso2 } from "../entidades/DadosSimuladorCebprevPasso2";
import { ResultadoSimuladorCebprev } from "../entidades/ResultadoSimuladorCebprev";
import { ProcessoBeneficioEntidade } from "../entidades/ProcessoBeneficioEntidade";
import { OpcaoRecebimentoEntidade } from "../entidades/OpcaoRecebimentoEntidade";
import { HistValoresProcessoEntidade } from "../entidades/HistValoresProcessoEntidade";
import { DadosSimulacaoCebprev } from "../entidades/DadosSimulacaoCebprev";
import { VariaveisAlteracaoRenda } from "../entidades/VariaveisAlteracaoRenda";
import { DadosSimulacaoNaoParticipante } from "../entidades/DadosSimulacaoNaoParticipante";

class Simulador extends BaseService {
  constructor() {
    super("Simulador");
  }

  BuscarDadosSimuladorFaceb1 = () =>
    this.CreateRequest<DadosSimuladorFaceb1>(RequestType.GET, `BuscarDadosSimuladorFaceb1`);

  SimularFaceb1 = () =>
    this.CreateRequest<ResultadoSimuladorFaceb1>(RequestType.GET, `SimularFaceb1`);

  BuscarDadosSimuladorCebprev = () =>
    this.CreateRequest<DadosSimuladorCebprev>(RequestType.GET, `BuscarDadosSimuladorCebprev`);

  BuscarDadosSimuladorCebprevPasso2 = () =>
    this.CreateRequest<DadosSimuladorCebprevPasso2>(RequestType.GET, `BuscarDadosSimuladorCebprevPasso2`);

  SimularCebprev = (dados: DadosSimulacaoCebprev) =>
    this.CreateRequest<ResultadoSimuladorCebprev>(RequestType.POST, `SimularCebprev`, dados);

  BuscarDadosSimuladorCebprevAssistido = (SqProcesso: number) =>
    this.CreateRequest<ProcessoBeneficioEntidade>(RequestType.GET, `BuscarDadosSimuladorCebprevAssistido/${SqProcesso}`);

  SimularCebprevAssistido = (dados: DadosSimulacaoCebprev) =>
    this.CreateRequest<ResultadoSimuladorCebprev>(RequestType.POST, `SimularCebprevAssistido`, dados);

  RequererAlrecacaoRenda = (vars: VariaveisAlteracaoRenda) =>
    this.CreateRequest<string>(RequestType.POST, `RequererAlrecacaoRenda`, vars);

  BuscarOpcaoRecebimento = (SqOpcao: number) =>
    this.CreateRequest<OpcaoRecebimentoEntidade>(RequestType.GET, `BuscarOpcaoRecebimento/${SqOpcao}`);

  SimularSaldado = () =>
    this.CreateRequest<HistValoresProcessoEntidade>(RequestType.GET, `SimularSaldado`);

  SimularNaoParticipante = (dados: DadosSimulacaoNaoParticipante) =>
    this.CreateRequest<any>(RequestType.POST, `SimularNaoParticipante`, dados);

}

export const SimuladorService = new Simulador();
