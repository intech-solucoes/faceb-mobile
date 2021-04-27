import { BaseService, RequestType, ResponseType } from "@intech/expo-service";
import { DependenteEntidade } from "../entidades/DependenteEntidade";

class Dependente extends BaseService {
  constructor() {
    super("Dependente");
  }

  Buscar = () =>
    this.CreateRequest<Array<DependenteEntidade>>(RequestType.GET, ``);

  BuscarPorPlano = (Plano: number) =>
    this.CreateRequest<Array<DependenteEntidade>>(RequestType.GET, `BuscarPorPlano/${Plano}`);

}

export const DependenteService = new Dependente();
