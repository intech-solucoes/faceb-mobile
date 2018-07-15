import React from "react";
//import { KeyboardAvoidingView } from "./components/KeyboardAvoidingView";
import { createStackNavigator } from "react-navigation";
import LoginScreen from "./screens/LoginScreen";
import PlanosScreen from "./screens/PlanosScreen";
import MainScreen from "./screens/MainScreen";
import Styles, { Variables } from "./styles";

const RootStack = createStackNavigator({
    Login: { screen: LoginScreen },
    Planos: { screen: PlanosScreen },
    Main: { screen: MainScreen }
}, {
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
