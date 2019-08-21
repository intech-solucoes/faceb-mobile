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
        title: "Sua Aposentadoria",
        rightMenu: true
    }
    
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            dadosSimulacao: {}
        }
    }

    componentDidMount = async () => {
        await this.setState({ loading: true });

        try {
            var result = await simuladorService.BuscarDadosSimuladorBD();
            await this.setState({ dadosSimulacao: result.data });
        } catch(err) {
            if(err.response) {
                alert(err.response.data);
            } else {
                alert(err);
            }
        }

        await this.setState({ loading: false });
    }

    render() {
        return (
            <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
                <View>
                    <Spinner visible={this.state.loading} cancelable={true} />

                    <View style={{ padding: 10, marginBottom: 10 }}>
                        
                        <CampoEstatico titulo={"Idade Mínima para Aposentadoria"} valor={this.state.dadosSimulacao.idadeMinima + " anos"} />
                        <CampoEstatico titulo={"SRC - Salário Real de Contribuição"} tipo={"dinheiro"} valor={this.state.dadosSimulacao.SRC} />
                        <CampoEstatico titulo={"SRB - Média últimos 36 SRCs"} tipo={"dinheiro"} valor={this.state.dadosSimulacao.SRC} />
                        <CampoEstatico titulo={"INSS Hipotético"} tipo={"dinheiro"} valor={this.state.dadosSimulacao.inssHipotetico} />
                        <CampoEstatico titulo={"Carência FACEB"} valor={this.state.dadosSimulacao.carencia + "/15"} />

                    </View>

                    <Button title={"Simular"} onClick={() => this.props.navigation.navigate("SimuladorBDResultado")} />
                </View>
            </ScrollView>
        );
    }
};
