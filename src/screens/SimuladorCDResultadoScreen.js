import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, BackHandler, AsyncStorage, Slider, TextInput } from "react-native";
import { TextMask } from "react-native-masked-text";
import Spinner from 'react-native-loading-spinner-overlay';
import _ from "lodash";

import Styles, { Variables } from "../styles";
import { ScreenHeader, ElevatedView, CampoEstatico, Button } from "../components";

import { SimuladorService } from "@intechprev/advanced-service";

const config = require("../config.json");
const simuladorService = new SimuladorService(config);

export default class SimuladorCDResultadoScreen extends Component {

    static navigationOptions = {
        title: "Sua Aposentadoria"
    }

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            dadosSimulacao: {
                listaPrazos: [],
                listaSaldoPercentuais: []
            }
        }
    }

    async componentDidMount() {
        await this.setState({ loading: true });

        await this.carregarDados();
        
        await this.setState({ loading: false });
    }

    async carregarDados() {
        var contribBasica = this.props.navigation.getParam("contribBasica", "0");
        var contribFacultativa = this.props.navigation.getParam("contribFacultativa", "0");
        var idadeAposentadoria = this.props.navigation.getParam("idadeAposentadoria", "0");

        var saque = this.props.navigation.getParam("saque", "0");

        var result = await simuladorService.SimularCD(contribBasica, contribFacultativa, idadeAposentadoria, saque);
        this.setState({ dadosSimulacao: result.data });
    }

    render() {
        return (
            <View>
                <Spinner visible={this.state.loading} cancelable={true} />

                <ScrollView contentContainerStyle={Styles.scrollContainer}>

                    <Text style={[Styles.h1, { color: Variables.colors.primary, marginBottom: 30, textAlign: 'center' }]}>
                        RESULTADO DA SIMULAÇÃO
                    </Text>
                    
                    <ElevatedView elevation={3} style={{ padding: 10, marginBottom: 10 }}>

                        <CampoEstatico titulo={"O seu saldo de contas PROJETADO para a data de aposentadoria é de:"} tipo={"dinheiro"} valor={this.state.dadosSimulacao.valorFuturo} />
                        <CampoEstatico titulo={"Saque do Saldo de Contas à Vista:"} tipo={"dinheiro"} valor={this.state.dadosSimulacao.valorSaque} />
                        <CampoEstatico titulo={"Data da Aposentadoria:"} valor={this.state.dadosSimulacao.dataAposentadoria} />

                    </ElevatedView>

                    <ElevatedView elevation={3} style={{ padding: 10, marginBottom: 10 }}>

                        <Text style={{ marginBottom: 15 }}>
                            O regulamento do CEBPREV permite variadas opções de recebimento da sua aposentadoria. 
                            Baseado nos parâmetros de simulação informados nos passos anteriores, 
                            seguem as estimativas calculadas para cada opção de recebimento:
                        </Text>

                        <CampoEstatico titulo={"Renda por prazo indeterminado com pensão por morte:"} tipo={"dinheiro"} valor={this.state.dadosSimulacao.rendaPrazoIndeterminadoPensaoMorte} />
                        <CampoEstatico titulo={"Renda por prazo indeterminado sem pensão por morte:"} tipo={"dinheiro"} valor={this.state.dadosSimulacao.rendaPrazoIndeterminadoSemPensaoMorte} />

                        {this.state.dadosSimulacao.listaPrazos.map((item, index) => {
                            return <CampoEstatico key={index} titulo={`Renda por prazo certo - ${item.Key} anos`} tipo={"dinheiro"} valor={item.Value} />
                        })}

                        {this.state.dadosSimulacao.listaSaldoPercentuais.map((item, index) => {
                            return <CampoEstatico key={index} titulo={`Renda por ${item.Key} % do Saldo de Contas`} tipo={"dinheiro"} valor={item.Value} />
                        })}

                    </ElevatedView>

                    <Text style={[Styles.h2, { color: Variables.colors.primary, marginVertical: 10, textAlign: 'center' }]}>
                        OBSERVAÇÕES
                    </Text>

                    <Text style={{ marginBottom: 15, marginBottom: 10, }}>
                        Renda por Prazo Indeterminado: calculada atuarialmente em função da expectativa de vida, saldo de contas acumulado, 
                        com ou sem reversão para Pensão por Morte e benefício recalculado anualmente.
                    </Text>

                    <Text style={{ marginBottom: 15, marginBottom: 10 }}>
                        Renda por Prazo Certo: recebimento entre 15 e 25 anos, cujo benefício será mantido em quantitativo de cotas e valorizado
                        pela cota do mês anterior ao pagamento.
                    </Text>

                    <Text style={{ marginBottom: 15, marginBottom: 10 }}>
                        Renda por Percentual do Saldo: aplicação de percentual entre 0,5% e 2% sobre o saldo da Conta Assistido, 
                        cujo benefício será mantido em quantitativo de cotas e valorizado pela cota do mês anterior ao pagamento.
                    </Text>

                </ScrollView>
            </View>
        );
    }
};
