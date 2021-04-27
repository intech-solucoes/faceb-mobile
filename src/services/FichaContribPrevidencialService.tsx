import { BaseService, RequestType, ResponseType } from "@intech/expo-service";
import { FichaContribPrevidencialEntidade } from "../entidades/FichaContribPrevidencialEntidade";
import { SaldoFaceb1 } from "../entidades/SaldoFaceb1";
import { SaldoCebprev } from "../entidades/SaldoCebprev";
import { FichaSalarioContribuicaoEntidade } from "../entidades/FichaSalarioContribuicaoEntidade";

class FichaContribPrevidencial extends BaseService {
  constructor() {
    super("FichaContribPrevidencial");
  }

  BuscarUltimaReferenciaPorPlano = (plano: number) =>
    this.CreateRequest<FichaContribPrevidencialEntidade>(RequestType.GET, `BuscarUltimaReferenciaPorPlano/${plano}`);

  BuscarUltimaPorPlano = (plano: number) =>
    this.CreateRequest<Array<FichaContribPrevidencialEntidade>>(RequestType.GET, `BuscarUltimaPorPlano/${plano}`);

  BuscarUltimaPorPlanoTipoCobranca = (plano: number, TipoCobranca: number) =>
    this.CreateRequest<Array<FichaContribPrevidencialEntidade>>(RequestType.GET, `BuscarUltimaPorPlanoTipoCobranca/${plano}/${TipoCobranca}`);

  BuscarSaldoFaceb1 = () =>
    this.CreateRequest<SaldoFaceb1>(RequestType.GET, `BuscarSaldoFaceb1`);

  BuscarSaldoCebprev = (SqPlanoPrevidencial: number) =>
    this.CreateRequest<SaldoCebprev>(RequestType.GET, `BuscarSaldoCebprev/${SqPlanoPrevidencial}`);

  UltimoSalarioPorContratoTrabalhoPlano = (SQ_PLANO_PREVIDENCIAL: number) =>
    this.CreateRequest<FichaSalarioContribuicaoEntidade>(RequestType.GET, `UltimoSalarioPorContratoTrabalhoPlano/${SQ_PLANO_PREVIDENCIAL}`);

  GerarExtrato = (Referencia: string, SqPlanoPrevidencial: number, IrPeriodo: number) =>
    this.CreateRequest<any>(RequestType.GET, `GerarExtrato/${Referencia}/${SqPlanoPrevidencial}/${IrPeriodo}`);

}

export const FichaContribPrevidencialService = new FichaContribPrevidencial();
