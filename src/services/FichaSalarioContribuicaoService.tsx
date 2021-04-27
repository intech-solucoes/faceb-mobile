import { BaseService, RequestType, ResponseType } from "@intech/expo-service";
import { FichaSalarioContribuicaoEntidade } from "../entidades/FichaSalarioContribuicaoEntidade";

class FichaSalarioContribuicao extends BaseService {
  constructor() {
    super("FichaSalarioContribuicao");
  }

  BuscarPorPlano = (plano: number) =>
    this.CreateRequest<FichaSalarioContribuicaoEntidade>(RequestType.GET, `BuscarPorPlano/${plano}`);

}

export const FichaSalarioContribuicaoService = new FichaSalarioContribuicao();
