import { BaseService, RequestType, ResponseType } from "@intech/expo-service";
import { EntidadePrevidenciaEntidade } from "../entidades/EntidadePrevidenciaEntidade";
import { ComprovanteRendimentosEntidade } from "../entidades/ComprovanteRendimentosEntidade";

class ComprovanteRendimentos extends BaseService {
  constructor() {
    super("ComprovanteRendimentos");
  }

  BuscarFundacao = () =>
    this.CreateRequest<EntidadePrevidenciaEntidade>(RequestType.GET, `BuscarFundacao`);

  BuscarDatas = () =>
    this.CreateRequest<Array<ComprovanteRendimentosEntidade>>(RequestType.GET, `BuscarDatas`);

  BuscarPorAnoExercicio = (anoExercicio: string, cdReceita: string) =>
    this.CreateRequest<Array<ComprovanteRendimentosEntidade>>(RequestType.GET, `BuscarPorAnoExercicio/${anoExercicio}/${cdReceita}`);

  GerarComprovante = (sqExercicio: number, cdReceita: string) =>
    this.CreateRequest<any>(RequestType.GET, `GerarComprovante/${sqExercicio}/${cdReceita}`);

}

export const ComprovanteRendimentosService = new ComprovanteRendimentos();
