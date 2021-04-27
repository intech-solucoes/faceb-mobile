import { BaseService, RequestType, ResponseType } from "@intech/expo-service";

class Token extends BaseService {
  constructor() {
    super("Token");
  }

  Gerar = (enviarEmail: Boolean, enviarSms: Boolean) =>
    this.CreateRequest<string>(RequestType.GET, `${enviarEmail}/${enviarSms}`);

  GerarSMS = () =>
    this.CreateRequest<string>(RequestType.GET, `GerarSMS`);

  GerarSMSPorNumero = (Numero: string) =>
    this.CreateRequest<string>(RequestType.GET, `GerarSMSPorNumero/${Numero}`);

}

export const TokenService = new Token();
