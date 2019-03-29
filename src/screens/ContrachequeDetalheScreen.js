import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, BackHandler, AsyncStorage, FlatList, TouchableHighlight } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { TextMask } from "react-native-masked-text";
import _ from 'lodash'

import Styles, { Variables } from "../styles";
import { ScreenHeader, ElevatedView, Button, CampoEstatico } from "../components";
import Separador from '../components/Separador';

import { ContrachequeService } from "@intechprev/advanced-service";

const config = require("../config.json");
const contrachequeService  = new ContrachequeService(config);

export default class ContrachequeDetalheScreen extends Component {

    static navigationOptions = {
        title: "Contracheque",
        rightMenu: true
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
            resumo: {},
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

        await this.setState({ 
            contracheque, 
            rendimentos, 
            descontos, 
            referencia, 
            resumo: result.data.resumo
        });
    }

    render() {
        return (

            <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
                <Spinner visible={this.state.loading} cancelable={true} />

                <View>
                    <View style={{justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                        <View style={{ alignItems: 'center',  flexDirection: "row" }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text>BRUTO</Text>
                                <TextMask type={'money'} value={this.state.resumo.bruto} style={{ color: Variables.colors.primary }} />
                            </View>

                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text>DESCONTOS</Text>
                                <TextMask type={'money'} value={this.state.resumo.descontos} style={{ color: Variables.colors.red }} />
                            </View>

                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text>LÍQUIDO</Text>
                                <TextMask type={'money'} value={this.state.resumo.liquido} style={{ color: Variables.colors.blue }} />
                            </View>
                        </View>
                    </View>

                    <View>
                        <CampoEstatico titulo={"Referência"} valor={this.state.referencia} />
                    </View>

                    <Separador />

                    <View>
                        <Text style={[Styles.h2, { color: Variables.colors.primary, marginBottom: 10 }]}>
                            RENDIMENTOS
                        </Text>

                        {this.state.rendimentos.map((rubrica, index) => {
                            return <CampoEstatico key={index} titulo={rubrica.DS_RUBRICA} tipo={"dinheiro"} valor={rubrica.VL_CALCULO} style={{ marginBottom: 0 }} />;
                        })}
                    </View>

                    <Separador />

                    <View style={{ marginBottom: 10 }}>
                        <Text style={[Styles.h2, { color: Variables.colors.red, marginBottom: 10 }]}>
                            DESCONTOS
                        </Text>

                        {this.state.descontos.map((rubrica, index) => {
                            return <CampoEstatico key={index} titulo={rubrica.DS_RUBRICA} tipo={"dinheiro"} valor={rubrica.VL_CALCULO} style={{ marginBottom: 0 }} />;
                        })}
                    </View>

                </View>
            </ScrollView>
        );
    }
};
