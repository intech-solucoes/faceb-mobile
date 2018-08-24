import React from "react";
import { Text, View, ImageBackground, Image, TextInput, Switch, AsyncStorage, StatusBar } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import VersionNumber from 'react-native-version-number';

import Styles, { Variables } from "../styles";
import { Button } from "../components";

import { UsuarioService } from "@intechprev/advanced-service";

const config = require("../config.json");
const usuarioService = new UsuarioService(config);

const loginStyles = {
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        padding: 50,
        alignItems: "center"
    },
    logo: {
        height: 80,
        width: 200
    },
    footer: {
        height: 210,
        padding: 10
    },
    loginButton: {
        marginTop: 20
    },
    remember: {
        flex: 1,
        flexDirection: "row",
        alignSelf: "flex-end"
    },
    labelRemeber: {
        color: "#FFFFFF",
        marginTop: 3
    }
}

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        // Armazena as referências dos inputs para fácil transição entre eles, como utilizar o tab no teclado
        this.inputs = {};

        // Cria o state do componente
        this.state = {
            //cpf: "vanusa",
            cpf: "50517902168",
            senha: "123",
            lembrar: false,
            loading: false
        };

        // Realiza o bind das funções do componente
        this.focusNextField = this.focusNextField.bind(this);
        this.login = this.login.bind(this);
    }

    focusNextField(id) {
        this.inputs[id].focus();
    }

    async login() {
        try {
            await this.setState({ loading: true });

            var result = await usuarioService.Login(this.state.cpf, this.state.senha);
            await AsyncStorage.setItem('token', result.data.AccessToken);
            await this.setState({ loading: false });

            this.props.navigation.navigate('Planos');
        } catch (ex) {
            alert(ex);
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <ImageBackground source={require("../assets/LoginBackground.jpg")} style={[Styles.backgroundImage, loginStyles.container]}>

                <Spinner visible={this.state.loading} cancelable={true} />

                <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.20)" animated />

                <View style={[Styles.content, loginStyles.content]}>
                    <Image source={require("../assets/facebNegativa.png")} style={loginStyles.logo} />
                </View>

                <View style={loginStyles.footer}>
                    <TextInput name={"cpf"} style={Styles.textInput} placeholder="CPF" returnKeyType="next" blurOnSubmit={false} underlineColorAndroid="transparent"
                        onSubmitEditing={() => { this.focusNextField('senha'); }} onChangeText={value => this.setState({ cpf: value })}
                        ref={input => { this.inputs['cpf'] = input; }} />

                    <TextInput name={"senha"} style={Styles.textInput} placeholder="Senha" returnKeyType="done" secureTextEntry={true}
                        ref={input => { this.inputs['senha'] = input; }} onChangeText={value => this.setState({ senha: value })} />

                    <View style={loginStyles.remember}>
                        <Text style={loginStyles.labelRemeber}>Lembrar-me</Text>
                        <Switch value={this.state.lembrar} thumbTintColor={Variables.colors.primary}
                            onValueChange={value => this.setState({ lembrar: value })} />
                    </View>

                    <Button title="Entrar" onClick={this.login} style={loginStyles.loginButton} />

                    <Text style={{ backgroundColor: "rgba(0,0,0,0.5)", marginVertical: 10, padding: 5, textAlign:"center", color: "#FFF" }}>
                        Versão {VersionNumber.appVersion}
                    </Text>
                </View>
            </ImageBackground>
        );
    }
}