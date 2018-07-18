import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, BackHandler, AsyncStorage } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';

import Styles, { Variables } from "../styles";
import { ScreenHeader, ElevatedView, CampoEstatico } from "../components";

import { SaldoService } from "advanced-service";

const config = require("../config.json");
const saldoService  = new SaldoService(config);

export default class SaldoCDScreen extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            saldo: {}
        }
    }

    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));

        await this.setState({ loading: true });

        await this.carregarSaldo();

        await this.setState({ loading: false });
    }

    onBackPress() {
        this.props.navigation.navigate('Home');
        return false;
    }

    async carregarSaldo() {
        var result = await saldoService.BuscarSaldoCD();
        await this.setState({ saldo: result.data });
    }

    render() {
        return (
            <View>
                <Spinner visible={this.state.loading} />
                
                <ScreenHeader titulo={"Seu Saldo"} />

                <ScrollView contentContainerStyle={Styles.scrollContainer}>
                    <ElevatedView elevation={3} style={{ padding: 10, marginBottom: 10 }}>
                        <CampoEstatico titulo={"Parabéns! Você acumulou até agora:"} tipo={"dinheiro"} valor={this.state.saldo.Total} />
                    </ElevatedView>

                    <ElevatedView elevation={3} style={{ padding: 10, marginBottom: 10 }}>
                        
                        <CampoEstatico titulo={"Sua contribuição individual foi de:"} tipo={"dinheiro"} valor={this.state.saldo.SaldoIndividual} />
                        <CampoEstatico titulo={"A contribuição patronal foi de:"} tipo={"dinheiro"} valor={this.state.saldo.SaldoPatronal} />
                        <CampoEstatico titulo={"Rentabilidade do plano:"} tipo={"dinheiro"} valor={this.state.saldo.Rentabilidade} />

                    </ElevatedView>
                </ScrollView>
            </View>
        )
    }
};
