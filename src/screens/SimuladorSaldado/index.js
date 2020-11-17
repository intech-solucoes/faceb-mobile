import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  BackHandler,
  AsyncStorage,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import Styles, { Variables } from "../../styles";
import {
  ScreenHeader,
  ElevatedView,
  CampoEstatico,
  Button,
} from "../../components";

import { SimuladorService } from "@intechprev/advanced-service";

const config = require("../../config.json");
const simuladorService = new SimuladorService(config);

export default class SimuladorSaldadoScreen extends Component {
  static navigationOptions = {
    title: "Sua Aposentadoria",
    rightMenu: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      dadosSimulacao: null,
    };
  }

  componentDidMount = async () => {
    await this.setState({ loading: true });

    try {
      var result = await simuladorService.SimularSaldado();
      await this.setState({ dadosSimulacao: result.data });
    } catch (err) {
      if (err.response) {
        alert(err.response.data);
      } else {
        alert(err);
      }
    }

    await this.setState({ loading: false });
  };

  render() {
    return (
      <ScrollView
        style={Styles.scrollContainer}
        contentContainerStyle={Styles.scrollContainerContent}
      >
        {this.state.dadosSimulacao && (
          <View>
            <Spinner visible={this.state.loading} cancelable={true} />

            <View style={{ padding: 10, marginBottom: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 24 }}>
                Benefício Saldado
              </Text>

              <CampoEstatico
                tipo={"dinheiro"}
                valor={this.state.dadosSimulacao.VL_RM_FUNDACAO}
                style={{ fontSize: 20 }}
              />

              <Text style={{ fontWeight: "bold", marginVertical: 20 }}>
                Informações Importantes:
              </Text>

              <Text style={{ marginBottom: 20 }}>
                O valor do Benefício Saldado será reajustado anualmente pelo INC
                até a data da sua aposentadoria.
              </Text>

              <Text>
                Você receberá o seu benefício ao completar 55 anos
                (aposentadoria programada) ou aos 53 anos (aposentadoria
                especial) e quando se aposentar no INSS.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}
