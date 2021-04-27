import { BaseService, RequestType, ResponseType } from "@intech/expo-service";
import { DadosPessoaisEntidade } from "../entidades/DadosPessoaisEntidade";
import { EnderecoPessoaEntidade } from "../entidades/EnderecoPessoaEntidade";
import { DocumentoIdentificacaoEntidade } from "../entidades/DocumentoIdentificacaoEntidade";

class DadosPessoais extends BaseService {
  constructor() {
    super("DadosPessoais");
  }

  Buscar = () =>
    this.CreateRequest<DadosPessoaisEntidade>(RequestType.GET, ``);

  BuscarDataAposentadoria = () =>
    this.CreateRequest<any>(RequestType.GET, `BuscarDataAposentadoria`);

  BuscarIdade = () =>
    this.CreateRequest<number>(RequestType.GET, `BuscarIdade`);

  BuscarEndereco = () =>
    this.CreateRequest<EnderecoPessoaEntidade>(RequestType.GET, `BuscarEndereco`);

  BuscarDocumentoIdentificacao = () =>
    this.CreateRequest<DocumentoIdentificacaoEntidade>(RequestType.GET, `BuscarDocumentoIdentificacao`);

}

export const DadosPessoaisService = new DadosPessoais();
