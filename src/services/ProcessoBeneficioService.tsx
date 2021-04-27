import { BaseService, RequestType, ResponseType } from "@intech/expo-service";
import { ProcessoBeneficioEntidade } from "../entidades/ProcessoBeneficioEntidade";

class ProcessoBeneficio extends BaseService {
  constructor() {
    super("ProcessoBeneficio");
  }

  BuscarPorCpf = () =>
    this.CreateRequest<Array<ProcessoBeneficioEntidade>>(RequestType.POST, `BuscarPorCpf`);

  BuscarPorCpfPlano = (SqPlano: number) =>
    this.CreateRequest<Array<ProcessoBeneficioEntidade>>(RequestType.POST, `BuscarPorCpfPlano/${SqPlano}`);

}

export const ProcessoBeneficioService = new ProcessoBeneficio();
