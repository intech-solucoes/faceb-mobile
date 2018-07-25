import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, BackHandler, AsyncStorage, Slider, TextInput } from "react-native";
import { TextMask, TextInputMask } from "react-native-masked-text";
import Spinner from 'react-native-loading-spinner-overlay';
import _ from "lodash";

import Styles, { Variables } from "../styles";
import { ScreenHeader, ElevatedView, CampoEstatico, Button } from "../components";

import { ContribuicaoService, SimuladorService } from "advanced-service";

const config = require("../config.json");
const simuladorService  = new SimuladorService(config);
const contribuicaoService  = new ContribuicaoService(config);

export default class SimuladorCDScreen extends Component {

    static navigationOptions = {
        title: "Sua Aposentadoria"
    }
    
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            plano: 0,
            dadosSimulacao: {},
            percentual: 6,
            contribuicaoBasica: "0",
            contribuicaoFacultativa: "0"
        }

        this.alterarPercentual = this.alterarPercentual.bind(this);
    }

    async componentDidMount() {
        await this.setState({ loading: true });

        await this.carregarPlano();
        await this.carregarDados();
        await this.carregarContribuicaoFacultativa();
        await this.alterarPercentual(this.state.dadosSimulacao.percentual);

        await this.setState({ loading: false });
    }

    async carregarPlano() {
        var plano = await AsyncStorage.getItem("plano");
        await this.setState({ plano });
    }

    async carregarDados() {
        var result = await simuladorService.BuscarDadosSimuladorCD();
        this.setState({ dadosSimulacao: result.data });
    }

    async carregarContribuicaoFacultativa() {
        var result = await contribuicaoService.BuscarPorPlano(this.state.plano);

        var facultativa = _.filter(result.data, { SQ_TIPO_COBRANCA: 13 })[0];
        var contribFacultativa = facultativa.VL_CONTRIBUICAO.toFixed(2);

        await this.setState({ 
            contribuicaoFacultativa: contribFacultativa
        });
    }

    alterarPercentual(value) {
        var salarioParticipacao = parseFloat(this.state.dadosSimulacao.salarioParticipacao);

        value = _.round(value / 1) * 1;

        var contribuicaoBasica = salarioParticipacao * (value / 100);

        this.setState({
            percentual: value,
            contribuicaoBasica
        });
    }

    render() {
        return (
            <View>
                <Spinner visible={this.state.loading} />

                <ScrollView contentContainerStyle={Styles.scrollContainer}>

                    <View style={{ padding: 10 }}>
                        <Text style={[Styles.h2, { color: Variables.colors.primary, marginBottom: 10, textAlign: 'center' }]}>
                            Bem vindo ao simulador de aposentadoria do plano CEBPREV!
                        </Text>

                        <Text style={{ marginBottom: 10, textAlign: 'center' }}>
                            Primeiro, vamos compor a sua contribuição. 
                            Atualmente você contribui com {this.state.dadosSimulacao.percentual}% sobre o seu salário de participação. 
                            Para efeitos de simulação, você pode alterar esse percentual, bem como realizar contribuições facultativas.
                        </Text>
                    </View>

                    <ElevatedView elevation={3} style={{ padding: 10, marginBottom: 10 }}>
                        
                        <CampoEstatico titulo={"Salário de Participação"} subtitulo={this.state.dadosSimulacao.dataReferencia} tipo={"dinheiro"} valor={this.state.dadosSimulacao.salarioParticipacao} />
                        
                        <Text style={[Styles.h3, { marginBottom: 10 }]}>Contribuição Básica</Text>
                        <View style={{ alignItems: "center" }}>
                            <Text style={Styles.h4}>Arraste para alterar o percentual</Text>
                        </View>
                        <Slider maximumValue={10} minimumValue={5} onValueChange={this.alterarPercentual} value={this.state.percentual} />
                        <View style={{ alignItems: "center" }}>
                            <Text style={[Styles.h2, { color: Variables.colors.primary }]}>
                                {this.state.percentual}% - <TextMask value={this.state.contribuicaoBasica} type={"money"} />
                            </Text>
                        </View>

                    </ElevatedView>

                    <ElevatedView elevation={3} style={{ padding: 10, marginBottom: 10 }}>
                        <Text>Contribuição Facultativa (R$)</Text>
                        <TextInputMask name={"contribuicaoFacultativa"} type={"money"} style={Styles.textInput} placeholder="R$0,00"keyboardType={"phone-pad"} step={1} underlineColorAndroid="transparent"
                                       value={this.state.contribuicaoFacultativa} onChangeText={value => this.setState({ contribuicaoFacultativa: value.replace("R$", "").replace(',', '.') })} />
                    </ElevatedView>

                    <Button title={"Próximo"} 
                            onClick={() => this.props.navigation.navigate("SimuladorCDPasso2", { 
                            contribBasica: this.state.contribuicaoBasica, 
                            contribFacultativa: this.state.contribuicaoFacultativa })} />
                </ScrollView>
            </View>
        );
    }
};
