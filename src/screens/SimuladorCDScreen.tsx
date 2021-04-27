import React, { Component } from 'react';
import { Text, View, ScrollView, AsyncStorage } from "react-native";
import { TextMask, TextInputMask } from "react-native-masked-text";
import Spinner from 'react-native-loading-spinner-overlay';
import _ from "lodash";

import Styles, { Variables } from "../styles";
import { CampoEstatico, Button } from "../components";
import { DadosSimuladorCebprev } from '../entidades';

import Slider from '@react-native-community/slider';
import { FichaContribPrevidencialService, SimuladorService } from '../services';

interface Props {
  navigation?: any;
}

interface State {
  loading: boolean;
  plano: number;
  dadosSimulacao: DadosSimuladorCebprev;
  percentual: number;
  contribuicaoBasica: string;
  contribuicaoFacultativa: string;
}

export default class SimuladorCDScreen extends Component<Props, State> {

  static navigationOptions = {
    title: "Sua Aposentadoria",
    rightMenu: true
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      plano: 0,
      dadosSimulacao: new DadosSimuladorCebprev(),
      percentual: 6,
      contribuicaoBasica: "0",
      contribuicaoFacultativa: "0"
    }

    this.alterarPercentual = this.alterarPercentual.bind(this);
  }

  async componentDidMount() {
    try {
      await this.setState({ loading: true });

      await this.carregarPlano();
      await this.carregarDados();
      await this.carregarContribuicaoFacultativa();
      await this.alterarPercentual(this.state.dadosSimulacao.Percentual);
    } catch (err) {
      alert(err.response ? err.response.data : err);
      this.props.navigation.pop();
    } finally {
      await this.setState({ loading: false });
    }
  }

  async carregarPlano() {
    var plano = await AsyncStorage.getItem("plano");
    await this.setState({ plano: parseInt(plano, 10) });
  }

  async carregarDados() {
    var result = await SimuladorService.BuscarDadosSimuladorCebprev();
    this.setState({ dadosSimulacao: result });
  }

  async carregarContribuicaoFacultativa() {
    const contribuicaoFacultativa = await FichaContribPrevidencialService.BuscarUltimaPorPlanoTipoCobranca(3, 13);

    await this.setState({
      contribuicaoFacultativa: contribuicaoFacultativa.length > 0 ? contribuicaoFacultativa[0].VL_CONTRIBUICAO.toString() : "0"
    });

  }

  alterarPercentual(value) {
    var salarioParticipacao = this.state.dadosSimulacao.SalarioParticipacao;

    value = _.round(value / 1) * 1;

    var contribuicaoBasica = (salarioParticipacao * (value / 100)).toString();

    this.setState({
      percentual: value,
      contribuicaoBasica
    });
  }

  render() {
    return (
      <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
        <Spinner visible={this.state.loading} cancelable={true} />

        <View>
          <View style={{ marginBottom: 10 }}>
            <Text style={[Styles.h2, { color: Variables.colors.primary, marginBottom: 10, textAlign: 'center' }]}>
              Bem-Vindo ao simulador de aposentadoria do plano CEBPREV!
                        </Text>

            <Text style={{ marginBottom: 10, textAlign: 'center' }}>
              Primeiro, vamos compor a sua contribuição.
                            Atualmente você contribui com {this.state.dadosSimulacao.Percentual}% sobre o seu salário de participação.
                            Para efeitos de simulação, você pode alterar esse percentual, bem como realizar contribuições facultativas.
                        </Text>
          </View>

          <View style={{ marginVertical: 30 }}>

            <CampoEstatico titulo={"Salário de Participação"} subtitulo={this.state.dadosSimulacao.DataReferencia}
              tipo={"dinheiro"} valor={this.state.dadosSimulacao.SalarioParticipacao} />

            <Text style={[Styles.h3, { marginVertical: 10 }]}>Contribuição Básica</Text>
            <View style={{ alignItems: "center" }}>
              <Text style={Styles.h4}>Arraste para alterar o percentual</Text>
            </View>
            <Slider maximumValue={10} minimumValue={5} onValueChange={this.alterarPercentual} value={this.state.percentual} />
            <View style={{ alignItems: "center" }}>
              <Text style={[Styles.h2, { color: Variables.colors.primary }]}>
                {this.state.percentual}% - <TextMask value={this.state.contribuicaoBasica} type={"money"} />
              </Text>
            </View>

          </View>

          <View style={{ marginBottom: 10 }}>
            <Text>Contribuição Facultativa (R$)</Text>
            <TextInputMask type={"money"} style={Styles.textInput} placeholder="R$0,00" keyboardType={"phone-pad"} underlineColorAndroid="transparent"
              value={this.state.contribuicaoFacultativa} onChangeText={value => this.setState({ contribuicaoFacultativa: value.replace("R$", "").replace(',', '.') })} />
          </View>

          <Button title={"Próximo"}
            onClick={() => this.props.navigation.navigate("SimuladorCDPasso2", {
              contribBasica: this.state.contribuicaoBasica,
              contribFacultativa: this.state.contribuicaoFacultativa
            })} />
        </View>
      </ScrollView>
    );
  }
};
