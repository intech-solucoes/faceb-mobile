import React from "react";
import { Text, View, ImageBackground, Image, TextInput, Switch, AsyncStorage, StatusBar } from "react-native";
import Styles, { Variables } from "../styles";
import { Button } from "../components";

import { UsuarioService } from "advanced-service";

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
        height: 200,
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
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        // Armazena as referências dos inputs para fácil transição entre eles, como utilizar o tab no teclado
        this.inputs = {};

        // Cria o state do componente
        this.state = {
            cpf: "formula",
            senha: "123",
            lembrar: false
        };

        // Realiza o bind das funções do componente
        this.focusNextField = this.focusNextField.bind(this);
        this.login = this.login.bind(this);
    }

    focusNextField(id) {
        this.inputs[id].focus();
    }

    login() {

        usuarioService.Login(this.state.cpf, this.state.senha)
            .then(async (result) => {
                await AsyncStorage.setItem('token', result.data.AccessToken);
                this.props.navigation.navigate('Planos');
            })
            .catch((err) => {
                if(err.response) {
                    alert(err.response.data);
                } else {
                    alert(config.apiUrl);
                    //alert("Ocorreu um erro ao processar a requisião.");
                }
            });
    }

    render() {
        return (
            <ImageBackground source={require("../assets/LoginBackground.jpg")} style={[Styles.backgroundImage, loginStyles.container]}>
                <StatusBar barStyle="light-content" backgroundColor={Variables.colors.primary} />
                
                <View style={[Styles.content, loginStyles.content]}>
                    <Image source={require("../assets/faceb.png")} style={loginStyles.logo} />
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
                </View>
            </ImageBackground>
        );
    }
}