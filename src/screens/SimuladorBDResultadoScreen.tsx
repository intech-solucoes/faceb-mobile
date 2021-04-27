import React, { Component } from 'react';
import { Text, View, ScrollView } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';

import Styles from "../styles";
import { CampoEstatico } from "../components";
import { ResultadoSimuladorFaceb1 } from '../entidades';
import { SimuladorService } from '../services';

interface Props {
  navigation?: any;
}

interface State {
  loading: boolean;
  dadosSimulacao: ResultadoSimuladorFaceb1;
}

export default class SimuladorBDResultadoScreen extends Component<Props, State> {

  static navigationOptions = {
    title: "Sua Aposentadoria",
    rightMenu: true
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      dadosSimulacao: new ResultadoSimuladorFaceb1()
    }
  }

  async componentDidMount() {
    await this.setState({ loading: true });

    await this.carregarDados();

    await this.setState({ loading: false });
  }

  async carregarDados() {
    var result = await SimuladorService.SimularFaceb1();
    this.setState({ dadosSimulacao: result });
  }

  render() {
    return (
      <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
        <Spinner visible={this.state.loading} cancelable={true} />

        <View>
          <View style={{ padding: 10, marginBottom: 10 }}>

            <CampoEstatico titulo={"Tipo de Aposentadoria"} valor={"APOSENTADORIA NORMAL"} />
            <CampoEstatico titulo={"Suplementação bruta estimada"} tipo={"dinheiro"} valor={this.state.dadosSimulacao.ValorSuplementacao} />
            <CampoEstatico titulo={"Data da aposentadoria"} valor={this.state.dadosSimulacao.DataAposentadoria} />
            <CampoEstatico titulo={"Referência do Cálculo"} valor={this.state.dadosSimulacao.DataReferencia} />

          </View>

          <Text>
            Esta é uma simulação de benefício considerando as informações cadastrais do futuro do participante posicionada na data da realização do cálculo.
            Os cálculos apresentados não são definitivos e resultam de projeções de caráter apenas ilustrativo,
            não gerando qualquer direito ao recebimento. O presente cálculo poderá sofrer alterações quando da concessão
            definitiva do benefício. Esta simulação observou as regras do Regulamento do Plano de Benefícios ao qual
            o participante se vinculou, vigentes na data da realização do cálculo do benefício.
                    </Text>
        </View>
      </ScrollView>
    );
  }
};
