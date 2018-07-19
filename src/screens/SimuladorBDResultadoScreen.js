import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, BackHandler, AsyncStorage } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';

import Styles, { Variables } from "../styles";
import { ScreenHeader, ElevatedView, CampoEstatico, Button } from "../components";

import { SimuladorService } from "advanced-service";

const config = require("../config.json");
const simuladorService  = new SimuladorService(config);

export default class SimuladorBDResultadoScreen extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            plano: 0,
            dadosSimulacao: {}
        }
    }

    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));

        await this.setState({ loading: true });

        await this.carregarPlano();
        await this.carregarDados();

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
        var result = await simuladorService.SimularBD(this.state.plano);
        this.setState({ dadosSimulacao: result.data });
    }

    render() {
        return (
            <View>
                <Spinner visible={this.state.loading} />
                
                <ScreenHeader titulo={"Sua Aposentadoria"} />

                <ScrollView contentContainerStyle={Styles.scrollContainer}>
                    <ElevatedView elevation={3} style={{ padding: 10, marginBottom: 10 }}>
                        
                        <CampoEstatico titulo={"Tipo de Aposentadoria"} valor={"APOSENTADORIA NORMAL"} />
                        <CampoEstatico titulo={"Suplementação bruta estimada"} tipo={"dinheiro"} valor={this.state.dadosSimulacao.valorSuplementacao} />
                        <CampoEstatico titulo={"Data da aposentadoria"} valor={this.state.dadosSimulacao.dataAposentadoria} />
                        <CampoEstatico titulo={"Referência do Cálculo"} valor={this.state.dadosSimulacao.dataReferencia} />

                    </ElevatedView>

                    <Text>
                        Esta é uma simulação de benefício considerando as informações cadastrais do futuro do participante posicionada na data da realização do cálculo. 
                        Os cálculos apresentados não são definitivos e resultam de projeções de caráter apenas ilustrativo, 
                        não gerando qualquer direito ao recebimento. O presente cálculo poderá sofrer alterações quando da concessão 
                        definitiva do benefício. Esta simulação observou as regras do Regulamento do Plano de Benefícios ao qual 
                        o participante se vinculará, vigentes na data da realização do cálculo do benefício.
                    </Text>
                </ScrollView>
            </View>
        );
    }
};
