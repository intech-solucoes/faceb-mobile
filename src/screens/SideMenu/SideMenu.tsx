import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, Text, View, Image, TouchableHighlight, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

import styles from './SideMenu.style';
import { Variables } from '../../styles';

interface Props {
  navigation?: any;
}

interface State {
  loading: boolean;
  plano: number;
  planoBD: boolean;
  assistido: boolean;
}

const MenuItem = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor={Variables.colors.gray}>
      <View style={{
        padding: 10,
        flex: 1,
        flexDirection: 'row'
      }}>
        <Image source={props.icon} style={styles.navIcon} />
        <Text style={styles.navText}>
          {props.title}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

class SideMenu extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      plano: 1,
      planoBD: true,
      assistido: false
    }
  }

  async componentDidMount() {
    await this.carregarPlano();
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  async carregarPlano() {
    var plano = await AsyncStorage.getItem("plano");
    var assistido = await AsyncStorage.getItem("assistido");
    var planoBD = plano === "1";

    this.setState({
      plano: parseInt(plano, 10),
      planoBD,
      assistido: assistido === "true"
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{
            backgroundColor: Variables.colors.primary,
            flex: 1,
            padding: 50,
            paddingTop: 70,
            alignItems: "center"
          }}>
            <Image source={require("../../assets/faceb_negativa.png")} style={styles.headerImage} />
          </View>

          <View style={styles.navSectionStyle}>

            <MenuItem onPress={this.navigateToScreen('Home')} icon={require("../../assets/ic_home.png")} title="Início" />
            <MenuItem onPress={this.navigateToScreen('Dados')} icon={require("../../assets/ic_dados.png")} title="Seus Dados" />

            {!this.state.assistido &&
              <MenuItem onPress={this.navigateToScreen('Contribuicao')} icon={require("../../assets/ic_contribuicao.png")} title="Sua Contribuição" />}

            {this.state.planoBD && !this.state.assistido &&
              <MenuItem title={"Seu Saldo"} icon={require("../../assets/ic_saldo.png")} onPress={this.navigateToScreen("SaldoBD")} />}

            {!this.state.planoBD && !this.state.assistido &&
              <MenuItem title={"Seu Saldo"} icon={require("../../assets/ic_saldo.png")} onPress={this.navigateToScreen("SaldoCD")} />}

            {this.state.assistido &&
              <MenuItem onPress={this.navigateToScreen('Contracheque')} icon={require("../../assets/ic_contracheque.png")} title="Contracheque" />}

            {!this.state.assistido && this.state.planoBD &&
              <MenuItem onPress={this.navigateToScreen('SimuladorBD')} icon={require("../../assets/ic_sim_beneficio.png")} title="Sua Aposentadoria" />}

            {!this.state.assistido && !this.state.planoBD &&
              <MenuItem onPress={this.navigateToScreen('SimuladorCD')} icon={require("../../assets/ic_sim_beneficio.png")} title="Sua Aposentadoria" />}

            <MenuItem onPress={this.navigateToScreen('Relacionamento')} icon={require("../../assets/ic_chat.png")} title="Relacionamento" />
            <MenuItem onPress={this.navigateToScreen('Planos')} icon={require("../../assets/ic_plano.png")} title="Selecionar Plano" />
            <MenuItem onPress={this.navigateToScreen('Login')} icon={require("../../assets/ic_out.png")} title="Sair" />
          </View>
        </ScrollView>

        <View style={styles.footerContainer}>
          {/* <Text>Versão {Constants.manifest.version}</Text> */}
        </View>
      </View>
    );
  }
}

// SideMenu.propTypes = {
//     navigation: PropTypes.object
// };

export default SideMenu;