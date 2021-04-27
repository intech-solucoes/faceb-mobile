import React, { Component } from 'react';
import { View, ScrollView } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';

import Styles from "../styles";
import { CampoEstatico } from "../components";

import { FichaContribPrevidencialService } from "./../services";

import { SaldoFaceb1 } from '../entidades';

interface Props {
  navigation?: any;
}

interface State {
  loading: boolean;
  saldo: SaldoFaceb1;
}

export default class SaldoBDScreen extends Component<Props, State> {

  static navigationOptions = {
    title: "Seu Saldo",
    rightMenu: true
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      saldo: new SaldoFaceb1()
    }
  }

  async componentDidMount() {
    await this.setState({ loading: true });

    await this.carregarSaldo();

    await this.setState({ loading: false });
  }

  async carregarSaldo() {
    var result = await FichaContribPrevidencialService.BuscarSaldoFaceb1();
    await this.setState({ saldo: result });
  }

  render() {
    return (
      <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
        <Spinner visible={this.state.loading} cancelable={true} />

        <View>
          <CampoEstatico titulo={"A) Reserva de Poupança Individual:"} tipo={"dinheiro"} valor={this.state.saldo.ReservaIndividual} />
          <CampoEstatico titulo={"B) Saldo da Conta Autopatrocinio:"} tipo={"dinheiro"} valor={this.state.saldo.SaldoContaAutopatrocinio} />
          <CampoEstatico titulo={"C) Valor Bruto para Resgate:"} subtitulo={"(A + 35%A) + B"} tipo={"dinheiro"} valor={this.state.saldo.Resgate} />
          <CampoEstatico titulo={"D) Valor Bruto para Portabilidade:"} subtitulo={"(A + 100%A) + B"} tipo={"dinheiro"} valor={this.state.saldo.Portabilidade} />
        </View>
      </ScrollView>
    )
  }
};