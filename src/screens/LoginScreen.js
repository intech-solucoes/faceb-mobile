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
        height: 240,
        padding: 10,
        paddingBottom: 0
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
            // cpf: "82069174115",
            // senha: "123",
            cpf: "",
            senha: "",
            lembrar: false,
            loading: false
        };
    }

    componentDidMount = async () => {
        var cpf = await AsyncStorage.getItem('cpfSalvo');

        if(cpf) {
            await this.setState({
                cpf: cpf,
                lembrar: true
            });
        }
    }

    focusNextField = (id) => {
        this.inputs[id].focus();
    }

    login = async () => {
        try {
            await this.setState({ loading: true });

            if(this.state.lembrar) {
                await AsyncStorage.setItem('cpfSalvo', this.state.cpf);
            }

            var result = await usuarioService.Login(this.state.cpf, this.state.senha);
            await AsyncStorage.setItem('token', result.data.AccessToken);
            await this.setState({ loading: false });

            this.props.navigation.navigate('Planos');
        } catch (err) {
            await this.setState({ loading: false });

            if(err.response) {
                alert(err.response.data);
            }
            else {
                alert(err);
            }
        }
    }

    render() {
        return (
            <ImageBackground source={require("../assets/login_background.jpg")} style={[Styles.backgroundImage, loginStyles.container]}>

                <Spinner visible={this.state.loading} cancelable={true} />

                <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.20)" animated />

                <View style={[Styles.content, loginStyles.content]}>
                    <Image source={require("../assets/faceb_negativa.png")} style={loginStyles.logo} />
                </View>

                <View style={loginStyles.footer}>
                    <TextInput name={"cpf"} style={Styles.textInput} placeholder="CPF" returnKeyType="next" blurOnSubmit={false} underlineColorAndroid="transparent"
                        onSubmitEditing={() => { this.focusNextField('senha'); }} onChangeText={value => this.setState({ cpf: value })}
                        ref={input => { this.inputs['cpf'] = input; }} value={this.state.cpf} />

                    <TextInput name={"senha"} style={Styles.textInput} placeholder="Senha" returnKeyType="done" secureTextEntry={true}
                        ref={input => { this.inputs['senha'] = input; }} onChangeText={value => this.setState({ senha: value })} value={this.state.senha} />

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