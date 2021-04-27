import { BaseService, RequestType, ResponseType } from "@intech/expo-service";
import { FileUploadEntidade } from "../entidades/FileUploadEntidade";
import { DadosAdesaoEntidade } from "../entidades/DadosAdesaoEntidade";
import { PlanoVinculadoEntidade } from "../entidades/PlanoVinculadoEntidade";
import { AdesaoEntidade } from "../entidades/AdesaoEntidade";
import { PatrocinadoraEntidade } from "../entidades/PatrocinadoraEntidade";
import { SexoEntidade } from "../entidades/SexoEntidade";
import { EstadoCivilEntidade } from "../entidades/EstadoCivilEntidade";
import { UFEntidade } from "../entidades/UFEntidade";
import { BancoEntidade } from "../entidades/BancoEntidade";
import { GrauParentescoEntidade } from "../entidades/GrauParentescoEntidade";
import { MunicipioEntidade } from "../entidades/MunicipioEntidade";

class Adesao extends BaseService {
  constructor() {
    super("Adesao");
  }

  Upload = (Arquivo: FileUploadEntidade) =>
    this.CreateRequest<number>(RequestType.POST, `Upload`, Arquivo);

  Concluir = (dados: DadosAdesaoEntidade) =>
    this.CreateRequest<string>(RequestType.POST, `Concluir`, dados);

  ValidarCPF = (cpf: string) =>
    this.CreateRequest<string>(RequestType.GET, `ValidarCPF/${cpf}`);

  ValidarEmail = (email: string) =>
    this.CreateRequest<string>(RequestType.GET, `ValidarEmail/${email}`);

  ValidarDataAdmissao = (admissao: string, nascimento: string) =>
    this.CreateRequest<any>(RequestType.GET, `ValidarDataAdmissao/${admissao}/${nascimento}`);

  BuscarPlano = (cpf: string, SqPlano: number) =>
    this.CreateRequest<PlanoVinculadoEntidade>(RequestType.GET, `BuscarPlano/${cpf}/${SqPlano}`);

  BuscarAdesao = (cpf: string) =>
    this.CreateRequest<AdesaoEntidade>(RequestType.GET, `BuscarAdesao/${cpf}`);

  BuscarListaPatrocinadora = () =>
    this.CreateRequest<Array<PatrocinadoraEntidade>>(RequestType.GET, `BuscarListaPatrocinadora`);

  BuscarListaSexo = () =>
    this.CreateRequest<Array<SexoEntidade>>(RequestType.GET, `BuscarListaSexo`);

  BuscarListaEstadoCivil = () =>
    this.CreateRequest<Array<EstadoCivilEntidade>>(RequestType.GET, `BuscarListaEstadoCivil`);

  BuscarListaUF = () =>
    this.CreateRequest<Array<UFEntidade>>(RequestType.GET, `BuscarListaUF`);

  BuscarListaBanco = () =>
    this.CreateRequest<Array<BancoEntidade>>(RequestType.GET, `BuscarListaBanco`);

  BuscarListaGrauParentesco = () =>
    this.CreateRequest<Array<GrauParentescoEntidade>>(RequestType.GET, `BuscarListaGrauParentesco`);

  BuscarListaMunicipioPorUF = (CD_UF: string) =>
    this.CreateRequest<Array<MunicipioEntidade>>(RequestType.GET, `BuscarListaMunicipioPorUF/${CD_UF}`);

}

export const AdesaoService = new Adesao();
