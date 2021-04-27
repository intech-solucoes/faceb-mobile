import React, { Component } from 'react';
import { Text, View, ScrollView, AsyncStorage } from "react-native";

import Spinner from 'react-native-loading-spinner-overlay';
import _ from "lodash";

import Styles, { Variables } from "../styles";
import { CampoEstatico, Button, DropDown } from "../components";

import Slider from '@react-native-community/slider';

import { SimuladorService } from '../services';
import { DadosSimuladorCebprevPasso2 } from '../entidades';

interface Props {
  navigation?: any;
}

interface State {
  loading: boolean;
  dadosSimulacao: DadosSimuladorCebprevPasso2;
  idadeMaximAposentadoria: number;
  idadeMinimaAposentadoria: number;
  idadeAposentadoria: number;
  saque: number;
  contribBasica: string;
  contribFacultativa: string;
}

export default class SimuladorCDPasso2Screen extends Component<Props, State> {

  static navigationOptions = {
    title: "Sua Aposentadoria",
    rightMenu: true
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      dadosSimulacao: new DadosSimuladorCebprevPasso2(),
      idadeMaximAposentadoria: 70,
      idadeMinimaAposentadoria: 48,
      idadeAposentadoria: 48,
      saque: 0,
      contribBasica: "",
      contribFacultativa: ""
    }

    this.alterarIdade = this.alterarIdade.bind(this);
  }

  async componentDidMount() {
    try {
      await this.setState({ loading: true });

      await this.carregarDados();
      await this.alterarIdade(this.state.idadeMinimaAposentadoria);
    } finally {
      await this.setState({ loading: false });
    }
  }

  async carregarDados() {
    var contribBasica = this.props.navigation.getParam("contribBasica", "0");
    var contribFacultativa = this.props.navigation.getParam("contribFacultativa", "0");

    var plano = await AsyncStorage.getItem("plano");
    var result = await SimuladorService.BuscarDadosSimuladorCebprevPasso2();

    await this.setState({
      dadosSimulacao: result,
      idadeAposentadoria: result.IdadeMinimaAposentadoria,
      idadeMaximAposentadoria: result.IdadeMaximaAposentadoria,
      idadeMinimaAposentadoria: result.IdadeMinimaAposentadoria,
      contribBasica,
      contribFacultativa
    });
  }

  async alterarIdade(value) {
    value = _.round(value / 1) * 1;

    await this.setState({
      idadeAposentadoria: value
    });
  }

  render() {
    return (
      <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
        <Spinner visible={this.state.loading} cancelable={true} />

        {!this.state.loading &&
          <View>
            <View style={{ padding: 10, marginBottom: 10 }}>

              <Text style={[Styles.h3, { marginBottom: 10 }]}>Com quantos anos você pretende se aposentar?</Text>
              <View style={{ alignItems: "center" }}>
                <Text style={Styles.h4}>Arraste para alterar a idade</Text>
              </View>
              <Slider maximumValue={this.state.idadeMaximAposentadoria ? this.state.idadeMaximAposentadoria : 70}
                minimumValue={this.state.idadeMinimaAposentadoria ? this.state.idadeMinimaAposentadoria : 48}
                onValueChange={this.alterarIdade} />
              <View style={{ alignItems: "center" }}>
                <Text style={[Styles.h2, { color: Variables.colors.primary }]}>
                  {this.state.idadeAposentadoria} anos
                                </Text>
              </View>

            </View>

            <View style={{ padding: 10, paddingBottom: 0 }}>
              <CampoEstatico titulo={"Esse é o seu saldo de conta atualizado"} tipo={"dinheiro"} valor={this.state.dadosSimulacao.Saldo} />
            </View>

            <Text style={{ padding: 10, marginBottom: 20, fontSize: 16 }}>
              Para a simulação da sua aposentadoria, o seu saldo de contas atual será projetado acrescendo as contribuições mensais futuras até a data da sua aposentadoria.
                            Os valores sofrerão uma valorização de <Text style={{ fontWeight: "bold", color: Variables.colors.primary }}>{this.state.dadosSimulacao.TaxaJuros}%</Text> ao ano (valorização fictícia, válida apenas para essa simulação).
                        </Text>

            <View style={{ marginBottom: 10 }}>
              <Text style={[Styles.h3, { marginBottom: 10 }]}>Você deseja sacar à vista um percentual do seu saldo de contas na concessão do benefício?</Text>

              <DropDown titulo={"Selecione uma opção"} valor={this.state.saque}
                itens={_.range(1, 26)} textoVazio={"NÃO"} valorVazio={0} prefixo={"SIM - "} sufixo={"%"}
                onValueChange={(saque) => this.setState({ saque })} />
            </View>

            <Button title={"Continuar"} onClick={() => this.props.navigation.navigate("SimuladorCDResultado", {
              contribBasica: this.state.contribBasica,
              contribFacultativa: this.state.contribFacultativa,
              idadeAposentadoria: this.state.idadeAposentadoria,
              saque: this.state.saque
            })} />
          </View>
        }
      </ScrollView>
    );
  }
};