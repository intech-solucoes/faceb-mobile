import { BaseService, RequestType, ResponseType } from "@intech/expo-service";
import { EmailEntidade } from "../entidades/EmailEntidade";

class Relacionamento extends BaseService {
  constructor() {
    super("Relacionamento");
  }

  Enviar = (relacionamentoEntidade: EmailEntidade) =>
    this.CreateRequest<string>(RequestType.POST, ``, relacionamentoEntidade);

}

export const RelacionamentoService = new Relacionamento();
