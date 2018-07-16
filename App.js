import React from "react";
import { Text } from "react-native";
//import { KeyboardAvoidingView } from "./components/KeyboardAvoidingView";
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import { LoginScreen, PlanosScreen, HomeScreen, DadosScreen, ContribuicaoScreen } from "./screens";

import SideMenu from "./screens/SideMenu/SideMenu";

// const LoginStack = createStackNavigator({
//     Login: { screen: LoginScreen },
//     Planos: { screen: PlanosScreen }
// }, {
//     headerMode: 'none',
//     navigationOptions: {
//         headerTintColor: "#fff",
        
//         headerStyle: {
//             backgroundColor: Variables.colors.primary,
//             height: 56
//         }
//     }
// });

// const MainDrawerStack = createDrawerNavigator({
//     HomeScreen: HomeScreen
// });

// const MainStack = createStackNavigator({
//     MainDrawerStack: MainDrawerStack
// }, {
//     navigationOptions: {
//         headerTintColor: "#fff",
        
//         headerStyle: {
//             backgroundColor: Variables.colors.primary,
//             height: 56
//         }
//     }
// });

// const RootStack = createStackNavigator({
//     LoginStack: LoginStack,
//     MainStack: MainStack
// }, {
//     headerMode: 'none'
// });

const RootStack = createDrawerNavigator({
    Login: LoginScreen,
    Planos: PlanosScreen,
    Home: HomeScreen,
    Dados: DadosScreen,
    Contribuicao: ContribuicaoScreen
}, {
    contentComponent: SideMenu,
    navigationOptions: {
        headerTintColor: "#fff",
        
        headerStyle: {
            backgroundColor: Variables.colors.primary,
            height: 56
        }
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
