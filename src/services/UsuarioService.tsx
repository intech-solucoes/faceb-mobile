import { BaseService, RequestType, ResponseType } from "@intech/expo-service";
import { UsuarioEntidade } from "../entidades/UsuarioEntidade";
import { LoginEntidade } from "../entidades/LoginEntidade";
import { JsonWebToken } from "../entidades/JsonWebToken";
import { DadosPesquisaEntidade } from "../entidades/DadosPesquisaEntidade";
import { PessoaFisicaEntidade } from "../entidades/PessoaFisicaEntidade";

class Usuario extends BaseService {
  constructor() {
    super("Usuario");
  }

  Buscar = () =>
    this.CreateRequest<UsuarioEntidade>(RequestType.GET, ``);

  VerificarAdmin = () =>
    this.CreateRequest<any>(RequestType.GET, `admin`);

  CriarAcesso = (login: LoginEntidade) =>
    this.CreateRequest<string>(RequestType.POST, `criarAcesso`, login);

  CriarAcessoIntech = (data: any) =>
    this.CreateRequest<any>(RequestType.POST, `criarAcessoIntech`, data);

  Menu = () =>
    this.CreateRequest<Array<string>>(RequestType.GET, `Menu`);

  Login = (user: LoginEntidade) =>
    this.CreateRequest<JsonWebToken>(RequestType.POST, `Login`, user);

  AlterarSenha = (data: LoginEntidade) =>
    this.CreateRequest<string>(RequestType.POST, `AlterarSenha`, data);

  AlterarSenhaPrimeiroAcesso = (user: LoginEntidade) =>
    this.CreateRequest<string>(RequestType.POST, `AlterarSenhaPrimeiroAcesso`, user);

  Pesquisar = (dadosPesquisa: DadosPesquisaEntidade) =>
    this.CreateRequest<Array<PessoaFisicaEntidade>>(RequestType.POST, `Pesquisar`, dadosPesquisa);

  Selecionar = (dadosPesquisa: DadosPesquisaEntidade) =>
    this.CreateRequest<JsonWebToken>(RequestType.POST, `Selecionar`, dadosPesquisa);

  BuscarMatriculas = () =>
    this.CreateRequest<Array<string>>(RequestType.GET, `BuscarMatriculas`);

  SelecionarMatricula = (matricula: string) =>
    this.CreateRequest<JsonWebToken>(RequestType.GET, `SelecionarMatricula/${matricula}`);

}

export const UsuarioService = new Usuario();
