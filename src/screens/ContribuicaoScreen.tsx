import React, { Component } from 'react';
import moment from 'moment';
import { Text, View, ScrollView, StyleSheet, AsyncStorage } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { TextMask } from "react-native-masked-text";
import _ from 'lodash';

import Styles, { Variables } from "../styles";
import { CampoEstatico } from "../components";

import { FichaContribPrevidencialEntidade, FichaSalarioContribuicaoEntidade } from '../entidades';
import { FichaContribPrevidencialService } from '../services';

interface Props {
  navigation?: any;
}

interface State {
  loading: boolean;
  contribuicoes: Array<FichaContribPrevidencialEntidade>;
  mesReferencia: string;
  salario: FichaSalarioContribuicaoEntidade;
  plano: number;
  planoBD: boolean;
  fundoIndividual: {};
  fundoPatronal: {};
  fundoAdm: number;
  fundoRisco: number;
  listaIndividual: Array<any>;
  listaPatronal: Array<any>;
  listaAdm: Array<any>;
  listaRisco: Array<any>;
}

const ViewRubricas = (props) => (
  <View style={{ marginBottom: 10, padding: 5 }}>
    <Text style={Styles.h2}>
      {props.titulo}
    </Text>

    {props.lista.map((contrib, index) => {
      return <CampoEstatico key={index} titulo={contrib.DS_TIPO_COBRANCA} tipo={"dinheiro"} valor={contrib.VL_CONTRIBUICAO} />;
    })}
  </View>
)

export default class ContribuicaoScreen extends Component<Props, State> {

  static navigationOptions = {
    title: "Sua Contribuicao",
    rightMenu: true
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      contribuicoes: [],
      mesReferencia: "",
      salario: new FichaSalarioContribuicaoEntidade(),
      plano: 1,
      planoBD: true,
      fundoIndividual: {},
      fundoPatronal: {},
      fundoAdm: 9,
      fundoRisco: 11,
      listaIndividual: [],
      listaPatronal: [],
      listaAdm: [],
      listaRisco: []
    }
  }

  async componentDidMount() {
    this.setState({ loading: true });

    await this.carregarPlano();
    await this.carregarContribuicao();
    await this.carregarSalarioContribuicao();
    await this.filtrarContribuicoes();

    this.setState({ loading: false });
  }

  async carregarPlano() {
    var plano = await AsyncStorage.getItem("plano");
    var planoBD = plano === "1";

    await this.setState({
      plano: parseInt(plano, 10),
      planoBD,
      fundoIndividual: planoBD ? 2 : 8,
      fundoPatronal: planoBD ? 1 : 7
    });
  }

  async carregarContribuicao() {
    var result = await FichaContribPrevidencialService.BuscarUltimaPorPlano(this.state.plano);
    var mesReferencia = moment(result[0].DT_REFERENCIA, "DD/MM/YYYY").format("MM/YYYY");

    await this.setState({
      contribuicoes: result,
      mesReferencia: mesReferencia
    });
  }

  async carregarSalarioContribuicao() {
    var result = await FichaContribPrevidencialService.UltimoSalarioPorContratoTrabalhoPlano(this.state.plano);
    await this.setState({ salario: result });
  }

  async filtrarContribuicoes() {
    var listaIndividual = _.filter(this.state.contribuicoes, { SQ_TIPO_FUNDO: this.state.fundoIndividual });
    var listaPatronal = _.filter(this.state.contribuicoes, { SQ_TIPO_FUNDO: this.state.fundoPatronal });
    var listaAdm = _.filter(this.state.contribuicoes, { SQ_TIPO_FUNDO: this.state.fundoAdm });
    var listaRisco = _.filter(this.state.contribuicoes, { SQ_TIPO_FUNDO: this.state.fundoRisco });

    await this.setState({
      listaIndividual,
      listaPatronal,
      listaAdm,
      listaRisco
    });
  }

  render() {
    return (
      <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
        <Spinner visible={this.state.loading} cancelable={true} />

        <View>
          <View style={styles.header}>
            <View style={{ marginBottom: 15 }}>
              <Text style={[Styles.h4, styles.headerText]}>
                Referência
              </Text>
              <Text style={[Styles.h2, styles.headerText]}>
                {this.state.mesReferencia}
              </Text>
            </View>

            <View>
              <Text style={[Styles.h4, styles.headerText]}>
                Salário de Contribuição
              </Text>
              <Text style={[Styles.h2, styles.headerText]}>
                <TextMask type={'money'} value={this.state.salario.VL_BASE_FUNDACAO ? this.state.salario.VL_BASE_FUNDACAO.toString() : ""} />
              </Text>
            </View>
          </View>

          <ViewRubricas titulo={"INDIVIDUAL"} lista={this.state.listaIndividual} />
          <ViewRubricas titulo={"PATROCINADORA"} lista={this.state.listaPatronal} />

          {!this.state.planoBD &&
            <View>
              <ViewRubricas titulo={"ADMINISTRATIVO"} lista={this.state.listaAdm} />
              <ViewRubricas titulo={"RISCO"} lista={this.state.listaRisco} />
            </View>}
        </View>
      </ScrollView>
    )
  }
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Variables.colors.secondary,
    padding: 10,
    marginBottom: 10
  },
  headerText: {
    color: "white"
  },
  rubrica: {
    marginVertical: 10
  },
  rubricaDes: {

  },
  rubricaValor: {
    color: Variables.colors.primary
  }
});