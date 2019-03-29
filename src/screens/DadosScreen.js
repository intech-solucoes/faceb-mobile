import React, { Component } from 'react';
import { Text, View, ScrollView, BackHandler, AsyncStorage } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';

import Styles, { Variables } from "../styles";
import { ScreenHeader, ElevatedView, CampoEstatico } from "../components";

import { DadosPessoaisService, PlanoVinculadoService } from "@intechprev/advanced-service";
import Separador from '../components/Separador';

const config = require("../config.json");
const dadosPessoaisService  = new DadosPessoaisService(config);
const planoVinculadoService = new PlanoVinculadoService(config);

export default class DadosScreen extends Component {

    static navigationOptions = {
        title: "Seus Dados",
        rightMenu: true
    }
    
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            dados: {},
            plano: {}
        }
    }

    async componentDidMount() {
        await this.setState({ loading: true });

        await this.carregarDadosPessoais();
        await this.carregarPlano();

        await this.setState({ loading: false });
    }

    async carregarDadosPessoais() {
        var result = await dadosPessoaisService.Buscar();
        await this.setState({ dados: result.data });
    }

    async carregarPlano() {
        var cdPlano = await AsyncStorage.getItem("plano");
        var pensionista = (await AsyncStorage.getItem("pensionista")) === "true";
        var { data: plano } = await planoVinculadoService.BuscarPorPlano(cdPlano);

        await this.setState({ 
            plano,
            pensionista
         });
    }

    render() {
        return (
            <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
                <Spinner visible={this.state.loading} cancelable={true} />

                <View>
                    <CampoEstatico titulo={"Nome"} valor={this.state.dados.NO_PESSOA} semMargem />
                </View>

                <Separador />

                <View>
                    {!this.state.pensionista &&
                        <View>
                            <CampoEstatico titulo={"Empresa"} valor={this.state.dados.SIGLA_EMPRESA} />
                            <CampoEstatico titulo={"Matrícula"} valor={this.state.dados.NR_REGISTRO} />
                        </View>
                    }
                    <CampoEstatico titulo={"CPF"} valor={this.state.dados.NR_CPF} />
                    <CampoEstatico titulo={"Data de Nascimento"} valor={this.state.dados.DT_NASCIMENTO} />
                    <CampoEstatico titulo={"Sexo"} valor={this.state.dados.DS_SEXO} semMargem />
                </View>

                <Separador />

                <View>
                    <CampoEstatico titulo={"CEP"} valor={this.state.dados.NR_CEP} />
                    <CampoEstatico titulo={"Endereço"} valor={this.state.dados.DS_ENDERECO} />
                    <CampoEstatico titulo={"Número"} valor={this.state.dados.NR_ENDERECO} />
                    <CampoEstatico titulo={"Complemento"} valor={this.state.dados.DS_COMPLEMENTO} />
                    <CampoEstatico titulo={"Bairro"} valor={this.state.dados.NO_BAIRRO} />
                    <CampoEstatico titulo={"Telefone"} valor={this.state.dados.NR_FONE} />
                    <CampoEstatico titulo={"Celular"} valor={this.state.dados.NR_CELULAR} />
                    <CampoEstatico titulo={"E-mail"} valor={this.state.dados.NO_EMAIL} />
                </View>

                <Separador />

                {!this.state.pensionista &&
                    <View>

                        <View>
                            <CampoEstatico titulo={"Data de admissão"} valor={this.state.dados.DT_ADMISSAO} />
                            {this.state.dados.DT_DEMISSAO &&
                                <CampoEstatico titulo={"Data de demissão"} valor={this.state.dados.DT_DEMISSAO} />}
                        </View>

                        <Separador />

                        <View>
                            <CampoEstatico titulo={"Plano"} valor={this.state.plano.DS_PLANO_PREVIDENCIAL} />
                            <CampoEstatico titulo={"Data de Filiação"} valor={this.state.plano.DT_INSC_PLANO} />
                            <CampoEstatico titulo={"Situação do Plano"} valor={this.state.plano.DS_SIT_PLANO} />
                        </View>
                    </View>
                }
            </ScrollView>
        )
    }
};