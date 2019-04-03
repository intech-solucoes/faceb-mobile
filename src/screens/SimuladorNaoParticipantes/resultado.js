import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, BackHandler, AsyncStorage, TouchableOpacity, Slider, TextInput, KeyboardAvoidingView } from "react-native";
import { Picker, Icon, Header, Left, Right, Body, Title } from "native-base";
import { TextMask, TextInputMask } from "react-native-masked-text";
import Spinner from 'react-native-loading-spinner-overlay';
import _ from "lodash";

import Styles, { Variables } from "../../styles";
import { ScreenHeader, ElevatedView, CampoEstatico, Button, DropDown } from "../../components";
import Separador from '../../components/Separador';

import { SimuladorService } from "@intechprev/advanced-service";

const config = require("../../config.json");
const simuladorService  = new SimuladorService(config);

export class SimuladorNaoParticipantesResultadoScreen extends Component {

    state = {
        dadosSimulacao: {
            listaPrazos: [],
            listaSaldoPercentuais: []
        }
    }

    static navigationOptions = {
        title: "Resultado",
        rightMenu: false
    }

    componentDidMount = async () => {
        var resultado = JSON.parse(this.props.navigation.getParam("resultado", "{}"));
        await this.setState({
            dadosSimulacao: resultado
        });
    }

    aderir = async () => {
        try {
            var { data: resultadoSimulacao } = await simuladorService.Aderir(this.state.dadosSimulacao.nome, this.state.dadosSimulacao.email);
            console.warn(resultadoSimulacao);
            await alert(resultadoSimulacao);
        } catch(ex) {
            if(ex.response)
                await alert(ex.response.data);
            else
                await alert(ex);
        }
    }

    render() {
        return (
            <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
                <View>
                    <Text style={[Styles.h1, { color: Variables.colors.primary, marginBottom: 30, textAlign: 'center' }]}>
                        RESULTADO DA SIMULAÇÃO
                    </Text>
                    
                    <View style={{ padding: 10 }}>

                        <CampoEstatico titulo={"O seu saldo de contas PROJETADO para a data de aposentadoria é de:"} tipo={"dinheiro"} valor={this.state.dadosSimulacao.valorFuturo} />
                        <CampoEstatico titulo={"Saque do Saldo de Contas à Vista:"} tipo={"dinheiro"} valor={this.state.dadosSimulacao.valorSaque} />
                        <CampoEstatico titulo={"Data da Aposentadoria:"} valor={this.state.dadosSimulacao.dataAposentadoria} />

                    </View>

                    <Separador />

                    <View style={{ padding: 10, marginBottom: 10 }}>

                        <Text style={{ marginBottom: 15 }}>
                            O regulamento do CEBPREV permite variadas opções de recebimento da sua aposentadoria. 
                            Baseado nos parâmetros de simulação informados nos passos anteriores, 
                            seguem as estimativas calculadas para cada opção de recebimento:
                        </Text>
                        
                        <View style={{ marginBottom: 15 }}>
                            <Text style={[Styles.h4, { fontWeight: "bold" }]}>
                                Renda por prazo indeterminado <Text style={{ textDecorationLine: "underline" }}>com pensão</Text> por morte:
                            </Text>
                            <TextMask style={[Styles.h2, { color: Variables.colors.primary }]} type={'money'} value={this.state.dadosSimulacao.rendaPrazoIndeterminadoPensaoMorte} />
                        </View>

                        <View style={{ marginBottom: 0 }}>
                            <Text style={[Styles.h4, { fontWeight: "bold" }]}>
                                Renda por prazo indeterminado <Text style={{ textDecorationLine: "underline" }}>sem pensão</Text> por morte:
                            </Text>
                            <TextMask style={[Styles.h2, { color: Variables.colors.primary }]} type={'money'} value={this.state.dadosSimulacao.rendaPrazoIndeterminadoSemPensaoMorte} />
                        </View>

                        <Separador />

                        {this.state.dadosSimulacao.listaPrazos.map((item, index) => {
                            return <CampoEstatico key={index} titulo={`Renda por prazo certo - ${item.Key} anos`} tipo={"dinheiro"} valor={item.Value} />
                        })}

                        <Separador />

                        {this.state.dadosSimulacao.listaSaldoPercentuais.map((item, index) => {
                            return <CampoEstatico key={index} titulo={`Renda por ${item.Key} % do Saldo de Contas`} tipo={"dinheiro"} valor={item.Value} />
                        })}

                    </View>

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

                    <Button title={"Gostei. Quero aderir!"} style={{ marginTop: 10 }} onClick={this.aderir} />

                </View>
            </ScrollView>
        );
    }
}