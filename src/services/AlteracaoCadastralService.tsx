import { BaseService, RequestType, ResponseType } from "@intech/expo-service";
import { FileUploadEntidade } from "../entidades/FileUploadEntidade";
import { UFEntidade } from "../entidades/UFEntidade";
import { PaisEntidade } from "../entidades/PaisEntidade";
import { BancoEntidade } from "../entidades/BancoEntidade";
import { MunicipioEntidade } from "../entidades/MunicipioEntidade";
import { DadosConcluir } from "../entidades/DadosConcluir";

class AlteracaoCadastral extends BaseService {
  constructor() {
    super("AlteracaoCadastral");
  }

  Upload = (Arquivo: FileUploadEntidade) =>
    this.CreateRequest<any>(RequestType.POST, `Upload`, Arquivo);

  Concluir = (dados: DadosConcluir) =>
    this.CreateRequest<Array<UFEntidade>>(RequestType.POST, `Concluir`, dados);

  BuscarListaUF = () =>
    this.CreateRequest<Array<UFEntidade>>(RequestType.GET, `BuscarListaUF`);

  BuscarListaPais = () =>
    this.CreateRequest<Array<PaisEntidade>>(RequestType.GET, `BuscarListaPais`);

  BuscarListaBanco = () =>
    this.CreateRequest<Array<BancoEntidade>>(RequestType.GET, `BuscarListaBanco`);

  BuscarListaMunicipioPorUF = (CD_UF: string) =>
    this.CreateRequest<Array<MunicipioEntidade>>(RequestType.GET, `BuscarListaMunicipioPorUF/${CD_UF}`);

  ValidarEmail = (email: string) =>
    this.CreateRequest<string>(RequestType.GET, `ValidarEmail/${email}`);

}

export const AlteracaoCadastralService = new AlteracaoCadastral();
