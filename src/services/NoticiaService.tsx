import { BaseService, RequestType, ResponseType } from "@intech/expo-service";
import { NoticiaEntidade } from "../entidades/NoticiaEntidade";


class Noticia extends BaseService {
  constructor() {
    super("Noticia");
  }

  BuscarPorOid = (oid: number) =>
    this.CreateRequest<NoticiaEntidade>(RequestType.GET, `BuscarPorOid//${oid}`);

  BuscarPorPagina = (pagina: number) =>
    this.CreateRequest<Array<NoticiaEntidade>>(RequestType.GET, `BuscarPorPagina/${pagina}`);

}

export const NoticiaService = new Noticia();
