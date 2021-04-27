import { BaseService, RequestType, ResponseType } from "@intech/expo-service";
import { FichaFinancAssistidoEntidade } from "../entidades/FichaFinancAssistidoEntidade";
import { ContrachequeEntidade } from "../entidades/ContrachequeEntidade";

class FichaFinancAssistido extends BaseService {
  constructor() {
    super("FichaFinancAssistido");
  }

  BuscarDataReferenciaPorProcessoCdPessoa = (SqProcesso: number) =>
    this.CreateRequest<Array<FichaFinancAssistidoEntidade>>(RequestType.POST, `BuscarDataReferenciaPorProcessoCdPessoa/${SqProcesso}`);

  BuscarUltimaPorProcesso = (SqProcesso: number) =>
    this.CreateRequest<Array<FichaFinancAssistidoEntidade>>(RequestType.POST, `BuscarUltimaPorProcesso/${SqProcesso}`);

  BuscarSuplementacaoBrutaPorProcesso = (SqProcesso: number) =>
    this.CreateRequest<FichaFinancAssistidoEntidade>(RequestType.POST, `BuscarSuplementacaoBrutaPorProcesso/${SqProcesso}`);

  BuscarDatasPorProcesso = (sqProcesso: number) =>
    this.CreateRequest<Array<FichaFinancAssistidoEntidade>>(RequestType.GET, `BuscarDatasPorProcesso/${sqProcesso}`);

  BuscarPorProcessoReferencia = (sqProcesso: number, referencia: string) =>
    this.CreateRequest<ContrachequeEntidade>(RequestType.GET, `BuscarPorProcessoReferencia/${sqProcesso}/${referencia}`);

  GerarExtrato = (SqCronograma: number, SqProcesso: number) =>
    this.CreateRequest<any>(RequestType.GET, `GerarExtrato/${SqCronograma}/${SqProcesso}`);

  GerarFicha = (NrAno: string, SqPlanoPrevidencial: number) =>
    this.CreateRequest<any>(RequestType.GET, `GerarFicha/${NrAno}/${SqPlanoPrevidencial}`);

  GerarExtratoCotas = (SqPlanoPrevidencial: number, SqProcesso: number) =>
    this.CreateRequest<any>(RequestType.GET, `GerarExtratoCotas/${SqPlanoPrevidencial}/${SqProcesso}`);

}

export const FichaFinancAssistidoService = new FichaFinancAssistido();
