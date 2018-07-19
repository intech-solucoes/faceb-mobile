import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, BackHandler, AsyncStorage, Slider, TextInput } from "react-native";
import { TextMask } from "react-native-masked-text";
import Spinner from 'react-native-loading-spinner-overlay';
import _ from "lodash";

import Styles, { Variables } from "../styles";
import { ScreenHeader, ElevatedView, CampoEstatico, Button } from "../components";

import { SimuladorService } from "advanced-service";

const config = require("../config.json");
const simuladorService  = new SimuladorService(config);

export default class SimuladorCDScreen extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            plano: 0,
            dadosSimulacao: {},
            percentual: 5,
            contribuicaoBasica: {},
            contribuicaoFacultativa: {}
        }

        this.alterarPercentual = this.alterarPercentual.bind(this);
    }

    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));

        await this.setState({ loading: true });

        await this.carregarPlano();
        await this.carregarDados();
        await this.alterarPercentual(5);

        await this.setState({ loading: false });
    }

    onBackPress() {
        this.props.navigation.navigate('Home');
        return false;
    }

    async carregarPlano() {
        var plano = await AsyncStorage.getItem("plano");
        await this.setState({ plano });
    }

    async carregarDados() {
        var result = await simuladorService.BuscarDadosSimuladorCD(this.state.plano);
        this.setState({ dadosSimulacao: result.data });
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
                
                <ScreenHeader titulo={"Sua Aposentadoria"} />

                <ScrollView contentContainerStyle={Styles.scrollContainer}>
                    <ElevatedView elevation={3} style={{ padding: 10, marginBottom: 10 }}>
                        
                        <CampoEstatico titulo={"Salário de Participação"} subtitulo={this.state.dadosSimulacao.dataReferencia} tipo={"dinheiro"} valor={this.state.dadosSimulacao.salarioParticipacao} />
                        
                        <Text style={[Styles.h3, { marginBottom: 10 }]}>Contribuição Básica</Text>
                        <View style={{ alignItems: "center" }}>
                            <Text style={Styles.h4}>Arraste para alterar o percentual</Text>
                        </View>
                        <Slider maximumValue={10} minimumValue={5} onValueChange={this.alterarPercentual} />
                        <View style={{ alignItems: "center" }}>
                            <Text style={[Styles.h2, { color: Variables.colors.primary}]}>
                                {this.state.percentual}% - <TextMask value={this.state.contribuicaoBasica} type={"money"} />
                            </Text>
                        </View>

                    </ElevatedView>

                    <ElevatedView elevation={3} style={{ padding: 10, marginBottom: 10 }}>
                        <Text>Contribuição Facultativa (R$)</Text>
                        <TextInput name={"contribuicaoFacultativa"} style={Styles.textInput} placeholder="0,00" keyboardType={"phone-pad"} step={1} underlineColorAndroid="transparent"
                            onChangeText={value => this.setState({ contribuicaoFacultativa: value })} />
                    </ElevatedView>

                    <Button title={"Simular"} 
                        onClick={() => this.props.navigation.navigate("SimuladorCDPasso2", { 
                            contribBasica: this.state.contribuicaoBasica, 
                            contribFacultativa: this.state.contribuicaoFacultativa })} />
                </ScrollView>
            </View>
        );
    }
};
