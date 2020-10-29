import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, BackHandler, AsyncStorage } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';

import Styles, { Variables } from "../styles";
import { ScreenHeader, ElevatedView, CampoEstatico } from "../components";

import { SaldoService, DadosPessoaisService } from "@intechprev/advanced-service";

const config = require("../config.json");
const dadosPessoaisService  = new DadosPessoaisService(config);
const saldoService  = new SaldoService(config);

export default class SaldoCDScreen extends Component {

    static navigationOptions = {
        title: "Seu Saldo",
        rightMenu: true
    }
    
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            saldo: {},
            nome: null
        }
    }

    async componentDidMount() {
        await this.setState({ loading: true });

        await this.carregarDadosPessoais();
        await this.carregarSaldo();

        await this.setState({ loading: false });
    }

    carregarDadosPessoais = async () =>{
        var result = await dadosPessoaisService.Buscar();
        await this.setState({ 
            nome: result.data.NO_PESSOA.split(" ")[0]
        });
    }

    carregarSaldo = async () => {
        var plano = await AsyncStorage.getItem("plano");
        var result = await saldoService.BuscarSaldoCD(plano);
        await this.setState({ saldo: result.data });
    }

    render() {
        return (
            <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
                <Spinner visible={this.state.loading} cancelable={true} />

                <View>
                    <ElevatedView elevation={3} style={{ padding: 10, paddingBottom: 0, marginBottom: 10 }}>
                        <CampoEstatico titulo={`PARABÉNS ${this.state.nome}! VOCÊ ACUMULOU ATÉ AGORA:`} tipo={"dinheiro"} valor={this.state.saldo.Total}
                                       tituloStyle={{ fontSize: 16 }} />
                    </ElevatedView>
                        
                    <CampoEstatico titulo={"Sua contribuição individual foi de:"} tipo={"dinheiro"} valor={this.state.saldo.SaldoIndividual} />
                    <CampoEstatico titulo={"A contribuição patronal foi de:"} tipo={"dinheiro"} valor={this.state.saldo.SaldoPatronal} />
                    <CampoEstatico titulo={"Rentabilidade do plano:"} tipo={"dinheiro"} valor={this.state.saldo.Rentabilidade} />
                </View>
            </ScrollView>
        )
    }
};
