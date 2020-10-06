import React from "react";
import { Text, View, ScrollView, TextInput, Switch, AsyncStorage } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';

import Styles, { Variables } from "../styles";
import { Button } from "../components";

import { UsuarioService } from "@intechprev/advanced-service";

const config = require("../config.json");
const usuarioService = new UsuarioService(config);

const styles = {
    container: {
        flex: 1,
        padding: 10
    },
    content: {
        flex: 1,
        padding: 50,
        alignItems: "center"
    },
    loginField: {
        backgroundColor: "#F6F7F9",
        borderColor: "#e8e9ea",
        borderWidth: 1
        // borderBottomColor: "#CCC", 
        // borderBottomWidth: 1
    },
    remember: {
        flex: 1,
        flexDirection: "row",
        margin: 10,
        marginBottom: 30
    },
    labelRemeber: {
        marginTop: 6,
        marginLeft: 5
    }
}

export default class LoginScreen extends React.Component {

    static navigationOptions = {
        title: "Login",
        rightMenu: false
    }

    constructor(props) {
        super(props);

        // Armazena as referências dos inputs para fácil transição entre eles, como utilizar o tab no teclado
        this.inputs = {};

        // Cria o state do componente
        this.state = {
            //cpf: "48407569100",
            cpf: "47150173187",
            //cpf: "21423393104",
            senha: "123",
            //cpf: "",
            //senha: "",
            lembrar: false,
            loading: false
        };
    }

    componentDidMount = async () => {

        await this.setState({ loading: false });

        var cpf = await AsyncStorage.getItem('cpfSalvo');

        if (cpf && this.state.cpf === "")
            await this.setState({ cpf, lembrar: true });
    }

    focusNextField = (id) => {
        this.inputs[id].focus();
    }

    login = async () => {
        try {
            await this.setState({ loading: true });

            if (this.state.lembrar) {
                await AsyncStorage.setItem('cpfSalvo', this.state.cpf);
            }

            var result = await usuarioService.LoginV2(this.state.cpf, this.state.senha);
            await this.setState({ loading: false });

            await AsyncStorage.setItem('token', result.data.AccessToken);
            await AsyncStorage.setItem('pensionista', result.data.pensionista.toString());

            this.props.navigation.navigate('Planos');
        } catch (err) {
            await this.setState({ loading: false });

            setTimeout(() => {
                if (err.response)
                    alert(err.response.data);
                else
                    alert(err);
            }, 100);
        }
    }

    render() {
        return (
            <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>

                <Spinner visible={this.state.loading} cancelable={true} />

                <View>
                    <TextInput name={"cpf"} style={[Styles.textInput, styles.loginField]} placeholder="CPF" returnKeyType="next" blurOnSubmit={false} underlineColorAndroid="transparent"
                        onSubmitEditing={() => { this.focusNextField('senha'); }} onChangeText={value => this.setState({ cpf: value })}
                        ref={input => { this.inputs['cpf'] = input; }} value={this.state.cpf} />

                    <TextInput name={"senha"} style={[Styles.textInput, styles.loginField]} placeholder="Senha" returnKeyType="done" secureTextEntry={true}
                        ref={input => { this.inputs['senha'] = input; }} onChangeText={value => this.setState({ senha: value })} value={this.state.senha} />

                    <View style={styles.remember}>
                        <Switch value={this.state.lembrar} thumbColor={Variables.colors.primary} ios_backgroundColor={"#CCC"}
                            onValueChange={value => this.setState({ lembrar: value })} />
                        <Text style={styles.labelRemeber}>Lembrar-me</Text>
                    </View>

                    <Button title="Entrar" onClick={this.login} />
                </View>
            </ScrollView>
        );
    }
}