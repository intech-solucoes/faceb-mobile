import { BaseService, RequestType, ResponseType } from "@intech/expo-service";
import { ContratoEmprestimoEntidade } from "../entidades/ContratoEmprestimoEntidade";
import { NaturezaEmprestimoEntidade } from "../entidades/NaturezaEmprestimoEntidade";
import { DadosSimulacaoEmprestimoEntidade } from "../entidades/DadosSimulacaoEmprestimoEntidade";

class ContratoEmprestimo extends BaseService {
  constructor() {
    super("ContratoEmprestimo");
  }

  Buscar = () =>
    this.CreateRequest<Array<ContratoEmprestimoEntidade>>(RequestType.GET, ``);

  BuscarPorPlano = (SqPlanoPrevidencial: number) =>
    this.CreateRequest<Array<ContratoEmprestimoEntidade>>(RequestType.GET, `BuscarPorPlano/${SqPlanoPrevidencial}`);

  BuscarPorSqContrato = (sqContrato: number) =>
    this.CreateRequest<ContratoEmprestimoEntidade>(RequestType.GET, `BuscarPorSqContrato/${sqContrato}`);

  BuscarNaturezasEmVigencia = () =>
    this.CreateRequest<Array<NaturezaEmprestimoEntidade>>(RequestType.GET, `BuscarNaturezasEmVigencia`);

  BuscarDadosSimulacao = (sqPlanoPrevidencial: number, sqNatureza: number) =>
    this.CreateRequest<any>(RequestType.GET, `BuscarDadosSimulacao/${sqPlanoPrevidencial}/${sqNatureza}`);

  BuscarParcelas = (dados: DadosSimulacaoEmprestimoEntidade) =>
    this.CreateRequest<any>(RequestType.POST, `BuscarParcelas`, dados);

  BuscarResumo = (dados: DadosSimulacaoEmprestimoEntidade) =>
    this.CreateRequest<any>(RequestType.POST, `BuscarResumo`, dados);

  Contratar = (dados: DadosSimulacaoEmprestimoEntidade) =>
    this.CreateRequest<any>(RequestType.POST, `Contratar`, dados);

}

export const ContratoEmprestimoService = new ContratoEmprestimo();
