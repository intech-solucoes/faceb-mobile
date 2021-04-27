import React from "react";
import { Text, View, Image, ScrollView, TouchableHighlight, AsyncStorage } from "react-native";
import { Icon } from "native-base";

import Styles, { Variables } from "../../styles";

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  headerContent: {
    padding: 50,
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 70,
  },
  menuItemContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    marginBottom: 10,
    backgroundColor: "#FFF",
  },
  menuItemInner: {
    flexDirection: "row",
  },
  menuItemIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  menuItemIcon: {
    marginLeft: 10,
    marginRight: 20,
    color: Variables.colors.primary,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemContentTitle: {
    flex: 1,
  },
  menuItemContentSubtitle: {
    flex: 2,
  },
};

const MenuItem = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} style={styles.menuItemContainer} underlayColor={Variables.colors.gray}>
      <View style={{
        flexDirection: "row",
      }}>
        <View style={{
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Icon name={props.icon} style={styles.menuItemIcon} type={props.type} />
        </View>

        <View style={styles.menuItemContent}>
          <Text style={[Styles.h1, styles.menuItemContentTitle]}>{props.title}</Text>
          <Text style={styles.menuItemContentSubtitle}>{props.subtitle}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

interface Props {
  navigation?: any;
}

interface State { }

export class LandingPageScreen extends React.Component<Props, State> {
  static navigationOptions = {
    headerShown: false,
  };

  navigateToScreen = (route) => () => {
    this.props.navigation.navigate(route);
  };

  componentDidMount = async () => {
    var cpfMuriloRemovido = await AsyncStorage.getItem("cpfMuriloRemovido");

    if (!cpfMuriloRemovido) {
      await AsyncStorage.removeItem("cpfSalvo");
      await AsyncStorage.setItem("cpfMuriloRemovido", true.toString());
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
          <View style={{
            padding: 50,
            alignItems: "center",
          }}>
            <Image source={require("../../assets/faceb.png")} style={styles.logo} resizeMode="contain" />
          </View>

          <MenuItem
            title={"Notícias"}
            subtitle={"Leia as últimas notícias sobre Previdência na FACEB"}
            icon={"newspaper"}
            type={"FontAwesome5"}
            onPress={this.navigateToScreen("Noticias")}
          />
          <MenuItem
            title={"Planeje Sua Aposentadoria"}
            subtitle={"Simule aqui a sua aposentadoria"}
            icon={"md-rose"}
            type={"Ionicons"}
            onPress={this.navigateToScreen("SimuladorNaoParticipantes")}
          />
          <MenuItem
            title={"Calendário de Pagamentos"}
            subtitle={`Confira a data de pagamento das aposentadorias e pensões`}
            icon={"md-calendar"}
            type={"Ionicons"}
            onPress={this.navigateToScreen("Calendario")}
          />
          <MenuItem
            title={"Área Restrita"}
            subtitle={"Destinado à aposentados, pensionistas e participantes"}
            icon={"unlock-alt"}
            type={"FontAwesome5"}
            onPress={this.navigateToScreen("Login")}
          />
          <MenuItem
            title={"Quem Somos"}
            subtitle={"Uma breve apresentação da FACEB"}
            icon={"star"}
            type={"Ionicons"}
            onPress={this.navigateToScreen("QuemSomos")}
          />
          <MenuItem
            title={"Planos"}
            subtitle={"Conheça aqui nossos planos"}
            icon={"ios-journal"}
            type={"Ionicons"}
            onPress={this.navigateToScreen("PlanosFaceb")}
          />
          <MenuItem
            title={"Contato"}
            subtitle={"Entre em contato com a Faceb"}
            icon={"comments"}
            type={"FontAwesome5"}
            onPress={this.navigateToScreen("Contato")}
          />

          <Text style={{ marginVertical: 10, padding: 5, textAlign: "center", color: "#AAA" }}>Versão 2.3.4</Text>
        </ScrollView>
      </View>
    );
  }
}
