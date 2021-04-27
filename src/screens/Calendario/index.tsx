import React from "react";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import { CalendarioPagamentoService } from "../../services";
import { Variables } from "../../styles";

const Styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "#FFF"
  },
  scrollContainerContent: {
    padding: 20,
  }
});

const Item = (props) => {
  return (
    <View style={{ flexDirection: "row", padding: 10, borderColor: "#CCC", borderWidth: 1, marginVertical: 5 }}>
      <Text style={{ flex: 1, fontSize: 16, color: Variables.colors.secondary }}>{props.mes}</Text>
      <Text style={{ flex: 1, fontSize: 16, color: Variables.colors.primary, textAlign: "right" }}>{props.dia}</Text>
    </View>
  );
};

interface Props {
  navigation?: any;
}

interface State { }

export class CalendarioScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: "Calendário",
    rightMenu: false,
  };

  state = {
    calendario: [],
  };

  componentDidMount = async () => {
    try {
      var result = await CalendarioPagamentoService.BuscarPorPlano(1);
      await this.setState({ calendario: result });
    } catch (err) {
      if (err.response) {
        console.warn(err.response.data);
      } else {
        console.warn(err);
      }
    }
  };

  render() {
    return (
      <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
        <Text style={{ marginBottom: 20 }}>Confira abaixo a data em que estará disponível o pagamento das aposentadorias e pensões.</Text>

        {this.state.calendario.map((mes, index) => {
          return <Item key={index} mes={mes.DES_MES} dia={mes.NUM_DIA} />;
        })}
      </ScrollView>
    );
  }
}
