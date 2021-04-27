import React from "react";
import { Text, ScrollView } from "react-native";

import { Button } from "../../components";
import Styles from "../../styles";

import { PlanoBDScreen } from "./PlanoBDScreen";
import { PlanoCDScreen } from "./PlanoCDScreen";
import { PlanoSaldadoScreen } from "./PlanoSaldadoScreen";

export { PlanoBDScreen, PlanoCDScreen, PlanoSaldadoScreen }

const styles = {
  button: {
    marginBottom: 20,
    padding: 5
  },
  buttonText: {
    fontWeight: "bold"
  }
}

interface Props {
  navigation?: any;
}

interface State { }

export class PlanosFacebScreen extends React.Component<Props, State> {

  static navigationOptions = {
    title: "Planos",
    rightMenu: false
  }

  render() {
    return (
      <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
        <Text style={[Styles.h3, { marginBottom: 15 }]}>Selecione um dos planos da Faceb</Text>

        <Button title={"PLANO FACEB BD"}
          style={[Styles.button, styles.button]} titleStyle={[Styles.h2, styles.buttonText]}
          onClick={() => this.props.navigation.navigate('PlanoBD')} />
        <Button title={"PLANO CEBPREV CD"}
          style={[Styles.button, styles.button]} titleStyle={[Styles.h2, styles.buttonText]}
          onClick={() => this.props.navigation.navigate('PlanoCD')} />
        <Button title={"PLANO PLANO FACEB SALDADO"}
          style={[Styles.button, styles.button]} titleStyle={[Styles.h2, styles.buttonText]}
          onClick={() => this.props.navigation.navigate('PlanoSaldado')} />
      </ScrollView>
    );
  }
}