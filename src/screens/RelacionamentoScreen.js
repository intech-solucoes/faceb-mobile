import React, { Component } from 'react';
import { Text, View, ScrollView, BackHandler, AsyncStorage, TextInput } from "react-native";
import { TextMask, TextInputMask } from "react-native-masked-text";
import Spinner from 'react-native-loading-spinner-overlay';
import _ from "lodash";

import Styles, { Variables } from "../styles";
import { ScreenHeader, ElevatedView, CampoEstatico, Button } from "../components";

import { DadosPessoaisService, RelacionamentoService } from "@intechprev/advanced-service";

const config = require("../config.json");
const dadosPessoaisService  = new DadosPessoaisService(config);
const relacionamentoService = new RelacionamentoService(config);

export default class RelacionamentoScreen extends Component {

    static navigationOptions = {
        title: "Relacionamento",
        rightMenu: true
    }

    constructor(props) {
        super(props);

        this.state = {
            dados: {},
            email: "",
            assunto: "",
            mensagem: "",
            height: 0
        };
    }

    async componentDidMount() {
        await this.setState({ loading: true });

        await this.carregarDadosPessoais();

        await this.setState({ loading: false });
    }

    async carregarDadosPessoais() {
        var result = await dadosPessoaisService.Buscar();
        await this.setState({ 
            dados: result.data,
            email: result.data.NO_EMAIL
        });
    }

    enviar = async () => {
        try {
            await this.setState({ loading: true });

            await relacionamentoService.Enviar(this.state.email, this.state.assunto, this.state.mensagem);
            alert("Sua mensagem foi enviada com sucesso!");
            this.props.navigation.navigate('Home');

            await this.setState({ loading: false });
        } catch(err) {
            if(err.response) {
                alert(err.response.data);
                this.setState({ loading: false });
            } else {
                alert("Ocorreu um erro ao processar requisição!");
            }
        }
    }

    render() {
        return (
            <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
                <Spinner visible={this.state.loading} cancelable={true} />

                <View>
                    <View style={{ marginBottom: 15 }}>
                        <Text>Seu E-mail:</Text>
                        <TextInput name={"email"} style={[Styles.textInput, { padding: 0, marginBottom: 0, marginTop: 10 }]} 
                                   placeholder={"Digite aqui seu e-mail"} keyboardType={"email-address"} underlineColorAndroid="transparent"
                                   value={this.state.email} onChangeText={value => this.setState({ email: value })} />
                    </View>

                    <View style={{ marginBottom: 15 }}>
                        <Text>Assunto:</Text>
                        <TextInput name={"assunto"} style={[Styles.textInput, { padding: 0, marginBottom: 0, marginTop: 10 }]} 
                                   placeholder={"Digite aqui o assunto"} underlineColorAndroid="transparent"
                                   value={this.state.assunto} onChangeText={value => this.setState({ assunto: value })} />
                    </View>

                    <View style={{ marginBottom: 15 }}>
                        <Text>Mensagem:</Text>
                        <TextInput name={"mensagem"} underlineColorAndroid="transparent" multiline
                                value={this.state.mensagem}
                                onChangeText={(text) => {
                                    this.setState({ mensagem: text })
                                }}
                                onContentSizeChange={(event) => {
                                    this.setState({ height: event.nativeEvent.contentSize.height })
                                }}
                                style={[Styles.textInput, { marginBottom: 0, marginTop: 10, height: Math.max(35, this.state.height) }]} />
                    </View>

                    <Button title={"Enviar"} style={{ marginTop: 20 }} onClick={this.enviar} />
                </View>
            </ScrollView>
        );
    }
}
