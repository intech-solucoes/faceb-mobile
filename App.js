import React from "react";
import { View, Text, TouchableOpacity, Button, Platform } from "react-native";
//import { KeyboardAvoidingView } from "./components/KeyboardAvoidingView";
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import { 
    LoginScreen, 
    PlanosScreen, 
    HomeScreen, 
    DadosScreen, 
    ContribuicaoScreen,
    SaldoBDScreen,
    SaldoCDScreen,
    ContrachequeScreen,
    ContrachequeDetalheScreen,
    SimuladorBDScreen,
    SimuladorBDResultadoScreen,
    SimuladorCDScreen,
    SimuladorCDPasso2Screen,
    SimuladorCDResultadoScreen,
    RelacionamentoScreen
} from "./src/screens";

import { ScreenHeader } from "./src/components"

import SideMenu from "./src/screens/SideMenu/SideMenu";

const MainStack = createStackNavigator({
    Home: HomeScreen,
    Dados: DadosScreen,
    Contribuicao: ContribuicaoScreen,
    SaldoBD: SaldoBDScreen,
    SaldoCD: SaldoCDScreen,
    Contracheque: ContrachequeScreen,
    ContrachequeDetalhe: ContrachequeDetalheScreen,
    SimuladorBD: SimuladorBDScreen,
    SimuladorBDResultado: SimuladorBDResultadoScreen,
    SimuladorCD: SimuladorCDScreen,
    SimuladorCDPasso2: SimuladorCDPasso2Screen,
    SimuladorCDResultado: SimuladorCDResultadoScreen,
    Relacionamento: RelacionamentoScreen
}, {
    navigationOptions: {
        header: (navigationOptions) => Platform.OS === 'android' ? <ScreenHeader {...navigationOptions}/> : navigationOptions.header
    }
});

const MainDrawer = createDrawerNavigator({
    DrawerStack: MainStack
}, {
    contentComponent: SideMenu,
    navigationOptions: {
      header: null
    }
})

const RootStack = createStackNavigator({
    Login: LoginScreen,
    Planos: PlanosScreen,
    Main: MainDrawer
},
{
  initialRouteName: 'Login',
  navigationOptions: {
    header: null
  }
});

export default class App extends React.Component {
    render() {
        return (
            <RootStack />
            // <KeyboardAvoidingView style={Styles.container} behavior="padding">
            //     <RootStack  style={{backgroundColor: "#000" }} />
            // </KeyboardAvoidingView>
        );
    }
}
