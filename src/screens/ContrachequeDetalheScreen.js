import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, BackHandler, AsyncStorage, FlatList, TouchableHighlight } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { TextMask } from "react-native-masked-text";
import _ from 'lodash'

import Styles, { Variables } from "../styles";
import { ScreenHeader, ElevatedView, Button, CampoEstatico } from "../components";

import { ContrachequeService } from "@intechprev/advanced-service";

const config = require("../config.json");
const contrachequeService  = new ContrachequeService(config);

export default class ContrachequeDetalheScreen extends Component {

    static navigationOptions = {
        title: "Contracheque"
    }

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            plano: 0,
            contracheque: {
                resumo: {},
                rubricas: []
            },
            rendimentos: [],
            descontos: []
        }
    }

    async componentDidMount() {
        await this.setState({ loading: true });

        await this.carregarPlano();
        await this.carregarContracheque();

        await this.setState({ loading: false });
    }

    async carregarPlano() {
        var plano = await AsyncStorage.getItem("plano");
        await this.setState({ plano });
    }

    async carregarContracheque() {
        var cronograma = this.props.navigation.getParam("cronograma", "0");
        var result = await contrachequeService.BuscarPorPlanoCronograma(this.state.plano, cronograma);

        var contracheque = result.data.rubricas;
        var referencia = result.data.resumo.referencia;
        var rendimentos = _.filter(contracheque, { IR_LANCAMENTO: "P" });
        var descontos = _.filter(contracheque, { IR_LANCAMENTO: "D" });

        await this.setState({ contracheque, rendimentos, descontos, referencia });
    }

    render() {
        return (
            <View>
                <Spinner visible={this.state.loading} cancelable={true} />

                <ScrollView contentContainerStyle={Styles.scrollContainer}>

                    <ElevatedView elevation={3} style={{ padding: 10, marginBottom: 10 }}>
                        <CampoEstatico titulo={"Referência"} valor={this.state.referencia} />
                    </ElevatedView>

                    <ElevatedView elevation={3} style={{ padding: 10, marginBottom: 10 }}>
                        <Text style={[Styles.h2, { color: Variables.colors.primary, marginBottom: 10 }]}>
                            RENDIMENTOS
                        </Text>

                        {this.state.rendimentos.map((rubrica, index) => {
                            return <CampoEstatico key={index} titulo={rubrica.DS_RUBRICA} tipo={"dinheiro"} valor={rubrica.VL_CALCULO} style={{ marginBottom: 0, color: Variables.colors.gray }} />;
                        })}
                    </ElevatedView>

                    <ElevatedView elevation={3} style={{ padding: 10, marginBottom: 10 }}>
                        <Text style={[Styles.h2, { color: Variables.colors.red, marginBottom: 10 }]}>
                            DESCONTOS
                        </Text>

                        {this.state.descontos.map((rubrica, index) => {
                            return <CampoEstatico key={index} titulo={rubrica.DS_RUBRICA} tipo={"dinheiro"} valor={rubrica.VL_CALCULO} style={{ marginBottom: 0, color: Variables.colors.gray }} />;
                        })}
                    </ElevatedView>

                </ScrollView>
            </View>
        );
    }
};
