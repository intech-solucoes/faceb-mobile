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

export default class SimuladorCDResultadoScreen extends Component {
    
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
        var contribBasica = this.props.navigation.getParam("contribBasica", "0");
        var contribFacultativa = this.props.navigation.getParam("contribFacultativa", "0");
        var idadeAposentadoria = this.props.navigation.getParam("idadeAposentadoria", "0");

        alert(contribBasica);
        
        var result = await simuladorService.SimularCD(this.state.plano, contribBasica, contribFacultativa, idadeAposentadoria);
        this.setState({ dadosSimulacao: result.data });
    }

    render() {
        return (
            <View>
                <Spinner visible={this.state.loading} />
                
                <ScreenHeader titulo={"Sua Aposentadoria"} />

                <ScrollView contentContainerStyle={Styles.scrollContainer}>
                    <ElevatedView elevation={3} style={{ padding: 10, marginBottom: 10 }}>
                        
                        <CampoEstatico titulo={"O seu saldo de contas PROJETADO para a data de aposentadoria é de:"} tipo={"dinheiro"} valor={this.state.dadosSimulacao.valorFuturo} />

                    </ElevatedView>
                </ScrollView>
            </View>
        );
    }
};
