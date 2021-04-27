import { BaseService, RequestType, ResponseType } from "@intech/expo-service";
import { PlanoVinculadoEntidade } from "../entidades/PlanoVinculadoEntidade";

class PlanoVinculado extends BaseService {
  constructor() {
    super("PlanoVinculado");
  }

  Buscar = () =>
    this.CreateRequest<Array<PlanoVinculadoEntidade>>(RequestType.GET, `Buscar`);

  PorCodigo = (plano: number) =>
    this.CreateRequest<PlanoVinculadoEntidade>(RequestType.GET, `PorCodigo/${plano}`);

}

export const PlanoVinculadoService = new PlanoVinculado();
