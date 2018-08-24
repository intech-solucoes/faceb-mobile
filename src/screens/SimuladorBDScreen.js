import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, BackHandler, AsyncStorage } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';

import Styles, { Variables } from "../styles";
import { ScreenHeader, ElevatedView, CampoEstatico, Button } from "../components";

import { SimuladorService } from "@intechprev/advanced-service";

const config = require("../config.json");
const simuladorService  = new SimuladorService(config);

export default class SimuladorBDScreen extends Component {

    static navigationOptions = {
        title: "Sua Aposentadoria"
    }
    
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            dadosSimulacao: {}
        }
    }

    async componentDidMount() {
        await this.setState({ loading: true });

        await this.carregarDados();

        await this.setState({ loading: false });
    }

    async carregarDados() {
        var result = await simuladorService.BuscarDadosSimuladorBD();
        this.setState({ dadosSimulacao: result.data });
    }

    render() {
        return (
            <View>
                <Spinner visible={this.state.loading} cancelable={true} />

                <ScrollView contentContainerStyle={Styles.scrollContainer}>

                    <ElevatedView elevation={3} style={{ padding: 10, marginBottom: 10 }}>
                        
                        <CampoEstatico titulo={"Idade Mínima para Aposentadoria"} valor={this.state.dadosSimulacao.idadeMinima + " anos"} />
                        <CampoEstatico titulo={"SRC - Salário Real de Contribuição"} tipo={"dinheiro"} valor={this.state.dadosSimulacao.SRC} />
                        <CampoEstatico titulo={"SRB - Média últimos 36 SRCs"} tipo={"dinheiro"} valor={this.state.dadosSimulacao.SRC} />
                        <CampoEstatico titulo={"INSS Hipotético"} tipo={"dinheiro"} valor={this.state.dadosSimulacao.inssHipotetico} />
                        <CampoEstatico titulo={"Carência FACEB"} valor={this.state.dadosSimulacao.carencia + "/15"} />

                    </ElevatedView>

                    <Button title={"Simular"} onClick={() => this.props.navigation.navigate("SimuladorBDResultado")} />
                </ScrollView>
            </View>
        );
    }
};
