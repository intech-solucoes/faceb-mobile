import { BaseService, RequestType, ResponseType } from "@intech/expo-service";

class Versao extends BaseService {
  constructor() {
    super("Versao");
  }

}

export const VersaoService = new Versao();
