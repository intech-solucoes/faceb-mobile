import React, { Component } from 'react';
import { Text, View, ScrollView, AsyncStorage } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';

import Styles from "../styles";
import { ElevatedView, CampoEstatico } from "../components";
import { DadosPessoaisService, FichaContribPrevidencialService } from '../services';

import { SaldoCebprev } from '../entidades';

interface Props {
  navigation?: any;
}

interface State {
  loading: boolean;
  saldo: SaldoCebprev;
  nome: string;
}

export default class SaldoCDScreen extends Component<Props, State> {

  static navigationOptions = {
    title: "Seu Saldo",
    rightMenu: true
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      saldo: new SaldoCebprev(),
      nome: null
    }
  }

  async componentDidMount() {
    await this.setState({ loading: true });

    await this.carregarDadosPessoais();
    await this.carregarSaldo();

    await this.setState({ loading: false });
  }

  carregarDadosPessoais = async () => {
    var result = await DadosPessoaisService.Buscar();
    await this.setState({
      nome: result.NO_PESSOA.split(" ")[0]
    });
  }

  carregarSaldo = async () => {
    var plano = await AsyncStorage.getItem("plano");
    var result = await FichaContribPrevidencialService.BuscarSaldoCebprev(parseInt(plano, 10));
    await this.setState({ saldo: result });
  }

  render() {
    return (
      <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
        <Spinner visible={this.state.loading} cancelable={true} />

        <View>
          <ElevatedView elevation={3} style={{ padding: 10, paddingBottom: 0, marginBottom: 10 }}>
            <CampoEstatico titulo={`PARABÉNS ${this.state.nome}! VOCÊ ACUMULOU ATÉ AGORA:`} tipo={"dinheiro"} valor={this.state.saldo.Total}
              tituloStyle={{ fontSize: 16 }} />
          </ElevatedView>

          <CampoEstatico titulo={"Sua contribuição individual foi de:"} tipo={"dinheiro"} valor={this.state.saldo.SaldoIndividual} />
          <CampoEstatico titulo={"A contribuição patronal foi de:"} tipo={"dinheiro"} valor={this.state.saldo.SaldoPatronal} />
          <CampoEstatico titulo={"Rentabilidade do plano:"} tipo={"dinheiro"} valor={this.state.saldo.Rentabilidade} />
        </View>
      </ScrollView>
    )
  }
};
