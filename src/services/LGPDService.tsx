import { BaseService, RequestType, ResponseType } from "@intech/expo-service";
import { LGPDEntidade } from "../entidades/LGPDEntidade";

class LGPD extends BaseService {
  constructor() {
    super("LGPD");
  }

  Buscar = () =>
    this.CreateRequest<Array<LGPDEntidade>>(RequestType.GET, ``);

  Inserir = (origem: number, ipv4: string, ipv6: string) =>
    this.CreateRequest<string>(RequestType.POST, `Inserir/${origem}/${ipv4}/${ipv6}`);

}

export const LGPDService = new LGPD();
