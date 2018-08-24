import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, BackHandler, AsyncStorage } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { TextMask } from "react-native-masked-text";
import _ from 'lodash';

import Styles, { Variables } from "../styles";
import { ScreenHeader, ElevatedView, CampoEstatico } from "../components";

import { ContribuicaoService, SalarioContribuicaoService } from "@intechprev/advanced-service";

const config = require("../config.json");
const contribuicaoService  = new ContribuicaoService(config);
const salarioContribService = new SalarioContribuicaoService(config);

const ViewRubricas = (props) => (
    <ElevatedView elevation={3} style={{ marginBottom: 10 }}>
        <Text style={Styles.h2}>
            {props.titulo}
        </Text>

        {props.lista.map((contrib, index) => {
            return <CampoEstatico key={index} titulo={contrib.DS_TIPO_COBRANCA} tipo={"dinheiro"} valor={contrib.VL_CONTRIBUICAO} />;
        })}
    </ElevatedView>
)

export default class ContribuicaoScreen extends Component {

    static navigationOptions = {
        title: "Sua Contribuicao"
    }

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            contribuicoes: [],
            mesReferencia: "",
            salario: {},
            plano: 1,
            planoBD: true,
            fundoIndividual: {},
            fundoPatronal: {},
            fundoAdm: 9,
            fundoRisco: 11,
            listaIndividual: [],
            listaPatronal: [],
            listaAdm: [],
            listaRisco: []
        }
    }

    async componentDidMount() {
        this.setState({ loading: true });
        
        await this.carregarPlano();
        await this.carregarContribuicao();
        await this.carregarSalarioContribuicao();
        await this.filtrarContribuicoes();

        this.setState({ loading: false });
    }

    async carregarPlano() {
        var plano = await AsyncStorage.getItem("plano");
        var planoBD = plano === "1";

        await this.setState({ 
            plano, 
            planoBD,
            fundoIndividual: planoBD ? 2 : 8,
            fundoPatronal: planoBD ? 1 : 7
        });
    }

    async carregarContribuicao() {
        var result = await contribuicaoService.BuscarPorPlano(this.state.plano);
        var mesReferencia = result.data[0].DT_REFERENCIA;

        await this.setState({ 
            contribuicoes: result.data,
            mesReferencia: mesReferencia
        });
    }

    async carregarSalarioContribuicao() {
        var result = await salarioContribService.BuscarUltimoPorPlano(this.state.plano);
        await this.setState({ salario: result.data });
    }

    async filtrarContribuicoes() {
        var listaIndividual = _.filter(this.state.contribuicoes, { SQ_TIPO_FUNDO: this.state.fundoIndividual });
        var listaPatronal = _.filter(this.state.contribuicoes, { SQ_TIPO_FUNDO: this.state.fundoPatronal });
        var listaAdm = _.filter(this.state.contribuicoes, { SQ_TIPO_FUNDO: this.state.fundoAdm });
        var listaRisco = _.filter(this.state.contribuicoes, { SQ_TIPO_FUNDO: this.state.fundoRisco });

        await this.setState({ 
            listaIndividual, 
            listaPatronal,
            listaAdm,
            listaRisco
        });
    }

    render() {
        return (
            <View>
                <Spinner visible={this.state.loading} cancelable={true} />

                <ScrollView contentContainerStyle={Styles.scrollContainer}>
                    
                    <ElevatedView elevation={3} style={styles.header}>
                        <View style={{marginBottom: 15}}>
                            <Text style={[Styles.h4, styles.headerText]}>
                                Referência
                            </Text>
                            <Text style={[Styles.h2, styles.headerText]}>
                                {this.state.mesReferencia}
                            </Text>
                        </View>

                        <View>
                            <Text style={[Styles.h4, styles.headerText]}>
                                Salário de Contribuição
                            </Text>
                            <Text style={[Styles.h2, styles.headerText]}>
                                <TextMask type={'money'} value={this.state.salario.VL_BASE_FUNDACAO} />
                            </Text>
                        </View>
                    </ElevatedView>

                    <ViewRubricas titulo={"INDIVIDUAL"} lista={this.state.listaIndividual} />
                    <ViewRubricas titulo={"PATROCINADORA"} lista={this.state.listaPatronal} />

                    {!this.state.planoBD &&
                        <View>
                            <ViewRubricas titulo={"ADMINISTRATIVO"} lista={this.state.listaAdm} />
                            <ViewRubricas titulo={"RISCO"} lista={this.state.listaRisco} />
                        </View>}
                </ScrollView>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: Variables.colors.secondary,
        padding: 10,
        marginBottom: 10
    },
    headerText: {
        color: "white"
    },
    rubrica: {
        marginVertical: 10
    },
    rubricaDes: {

    },
    rubricaValor: {
        color: Variables.colors.primary
    }
});