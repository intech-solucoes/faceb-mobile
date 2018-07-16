import React from "react";
import { Text } from "react-native";
//import { KeyboardAvoidingView } from "./components/KeyboardAvoidingView";
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import LoginScreen from "./screens/LoginScreen";
import PlanosScreen from "./screens/PlanosScreen";
import HomeScreen from "./screens/HomeScreen";
import Styles, { Variables } from "./styles";

const LoginStack = createStackNavigator({
    Login: { screen: LoginScreen },
    Planos: { screen: PlanosScreen }
}, {
    headerMode: 'none',
    navigationOptions: {
        headerTintColor: "#fff",
        
        headerStyle: {
            backgroundColor: Variables.colors.primary,
            height: 56
        }
    }
});

const MainDrawerStack = createDrawerNavigator({
    HomeScreen: HomeScreen
});

const MainStack = createStackNavigator({
    MainDrawerStack: MainDrawerStack
}, {
    navigationOptions: {
        headerTintColor: "#fff",
        
        headerStyle: {
            backgroundColor: Variables.colors.primary,
            height: 56
        }
    }
});

const RootStack = createStackNavigator({
    LoginStack: LoginStack,
    MainStack: MainStack
}, {
    headerMode: 'none'
});

// const RootStack = createDrawerNavigator({
//     Login: LoginScreen,
//     Planos: PlanosScreen,
//     Home: HomeScreen
// }, {
//     navigationOptions: {
//         headerTintColor: "#fff",
        
//         headerStyle: {
//             backgroundColor: Variables.colors.primary,
//             height: 56
//         }
//     }
// });

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
