import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, BackHandler, AsyncStorage } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';

import Styles, { Variables } from "../styles";
import { ScreenHeader, ElevatedView, CampoEstatico } from "../components";

import { SaldoService } from "@intechprev/advanced-service";

const config = require("../config.json");
const saldoService  = new SaldoService(config);

export default class SaldoBDScreen extends Component {

    static navigationOptions = {
        title: "Seu Saldo"
    }
    
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            saldo: {}
        }
    }

    async componentDidMount() {
        await this.setState({ loading: true });

        await this.carregarSaldo();

        await this.setState({ loading: false });
    }

    async carregarSaldo() {
        var result = await saldoService.BuscarSaldoBD();
        await this.setState({ saldo: result.data });
    }

    render() {
        return (
            <View>
                <Spinner visible={this.state.loading} />

                <ScrollView contentContainerStyle={Styles.scrollContainer}>
                    <ElevatedView elevation={3} style={{ padding: 10, marginBottom: 10 }}>
                        
                        <CampoEstatico titulo={"A) Reserva de Poupança Individual:"} tipo={"dinheiro"} valor={this.state.saldo.ReservaIndividual} />
                        <CampoEstatico titulo={"B) Saldo da Conta Autopatrocinio:"} tipo={"dinheiro"} valor={this.state.saldo.SaldoContaAutopatrocinio} />
                        <CampoEstatico titulo={"C) Valor Bruto para Resgate:"} subtitulo={"(A + 35%A) + B"} tipo={"dinheiro"} valor={this.state.saldo.Resgate} />
                        <CampoEstatico titulo={"D) Valor Bruto para Portabilidade:"} subtitulo={"(A + 100%A) + B"} tipo={"dinheiro"} valor={this.state.saldo.Portabilidade} />

                    </ElevatedView>
                </ScrollView>
            </View>
        )
    }
};
