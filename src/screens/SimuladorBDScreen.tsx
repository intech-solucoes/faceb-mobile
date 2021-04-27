import React, { Component } from 'react';
import { View, ScrollView } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';

import Styles from "../styles";
import { CampoEstatico, Button } from "../components";
import { SimuladorService } from '../services';
import { DadosSimuladorFaceb1 } from '../entidades';

interface Props {
  navigation?: any;
}

interface State {
  loading: boolean;
  dadosSimulacao: DadosSimuladorFaceb1;
}

export default class SimuladorBDScreen extends Component<Props, State> {

  static navigationOptions = {
    title: "Sua Aposentadoria",
    rightMenu: true
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      dadosSimulacao: new DadosSimuladorFaceb1()
    }
  }

  componentDidMount = async () => {
    await this.setState({ loading: true });

    try {
      var result = await SimuladorService.BuscarDadosSimuladorFaceb1();
      await this.setState({ dadosSimulacao: result });
    } catch (err) {
      if (err.response) {
        alert(err.response.data);
      } else {
        alert(err);
      }
    }

    await this.setState({ loading: false });
  }

  render() {
    return (
      <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
        <View>
          <Spinner visible={this.state.loading} cancelable={true} />

          <View style={{ padding: 10, marginBottom: 10 }}>

            <CampoEstatico titulo={"Idade Mínima para Aposentadoria"} valor={this.state.dadosSimulacao.IdadeMinima + " anos"} />
            <CampoEstatico titulo={"SRC - Salário Real de Contribuição"} tipo={"dinheiro"} valor={this.state.dadosSimulacao.SRC} />
            <CampoEstatico titulo={"SRB - Média últimos 36 SRCs"} tipo={"dinheiro"} valor={this.state.dadosSimulacao.SRC} />
            <CampoEstatico titulo={"INSS Hipotético"} tipo={"dinheiro"} valor={this.state.dadosSimulacao.InssHipotetico} />
            <CampoEstatico titulo={"Carência FACEB"} valor={this.state.dadosSimulacao.Carencia + "/15"} />

          </View>

          <Button title={"Simular"} onClick={() => this.props.navigation.navigate("SimuladorBDResultado")} />
        </View>
      </ScrollView>
    );
  }
};
