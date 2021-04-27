import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import Styles from "../../styles";
import { CampoEstatico } from "../../components";
import { SimuladorService } from "../../services";
import { HistValoresProcessoEntidade } from "../../entidades";

interface Props {
  navigation?: any;
}

interface State {
  loading: boolean;
  dadosSimulacao: HistValoresProcessoEntidade;
}

export default class SimuladorSaldadoScreen extends Component<Props, State> {
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
      var result = await SimuladorService.SimularSaldado();
      await this.setState({ dadosSimulacao: result });
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
                O valor do Benefício Saldado será reajustado anualmente pelo
                INPC até a data da sua aposentadoria.
              </Text>

              <Text>
                Você receberá o seu benefício ao completar 55 anos
                (aposentadoria programada) ou aos 53 anos (aposentadoria
                especial). Em ambos os casos com a apresentação da carta de
                aposentadoria pelo INSS e rescisão contratual com a
                patrocinadora.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}
