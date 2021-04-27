import { BaseService, RequestType, ResponseType } from "@intech/expo-service";
import { CalendarioPagamentoEntidade } from "../entidades/CalendarioPagamentoEntidade";

class CalendarioPagamento extends BaseService {
  constructor() {
    super("CalendarioPagamento");
  }

  BuscarPorPlano = (plano: number) =>
    this.CreateRequest<Array<CalendarioPagamentoEntidade>>(RequestType.GET, `BuscarPorPlano/${plano}`);

}

export const CalendarioPagamentoService = new CalendarioPagamento();
