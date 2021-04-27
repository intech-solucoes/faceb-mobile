import { BaseService, RequestType, ResponseType } from "@intech/expo-service";
import { FichaResumoSRCEntidade } from "../entidades/FichaResumoSRCEntidade";

class FichaResumoSRC extends BaseService {
  constructor() {
    super("FichaResumoSRC");
  }

  Buscar = () =>
    this.CreateRequest<FichaResumoSRCEntidade>(RequestType.GET, ``);

}

export const FichaResumoSRCService = new FichaResumoSRC();
