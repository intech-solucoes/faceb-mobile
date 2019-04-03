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

import { SimuladorNaoParticipantesResultadoScreen } from "./resultado";
export { SimuladorNaoParticipantesResultadoScreen };

const config = require("../../config.json");
const simuladorService  = new SimuladorService(config);

const idadesAposentadoria = _.range(48, 71, 1);
const percentuaisSaque = _.range(1, 26, 1);

export class SimuladorNaoParticipantesScreen extends Component {

    static navigationOptions = {
        title: "Simulador",
        rightMenu: false
    }
    
    constructor(props) {
        super(props);

        this.state = {
            // nome: "Rony",
            // email: "ronymmoura@gmail.com",
            // dataNascimento: "18/02/1991",
            // remuneracaoInicial: "5.000,00",
            sexo: "M",
            possuiFilhos: "N",
            sexoFilhoMaisNovo: "M",
            possuiFilhoInvalido: "N",
            sexoFilhoInvalido: "M",
            percentualSaque: 0,
            percentualContribuicao: 10,
            idadeAposentadoria: 48,
            taxaJuros: 4.23
        }
    }

    simular = async () => {
        try {
            await this.setState({ loading: true });

            if(!this.state.nome || this.state.nome === "")
                throw new Error("Preencha o campo \"Nome\"");

            if(!this.state.email || this.state.email === "")
                throw new Error("Preencha o campo \"E-mail\"");

            if(!this.state.dataNascimento || this.state.dataNascimento === "")
                throw new Error("Preencha o campo \"Data de nascimento\"");

            if(!this.state.remuneracaoInicial || this.state.remuneracaoInicial === "")
                throw new Error("Preencha o campo \"Salário Bruto\"");

            if(this.state.possuiFilhos === "S") {
                if(!this.state.nascimentoFilhoMaisNovo || this.state.nascimentoFilhoMaisNovo === "")
                    throw new Error("Preencha o campo \"Data de nascimento filho mais novo\"");
            }

            if(this.state.possuiFilhoInvalido === "S") {
                if(!this.state.nascimentoFilhoInvalido || this.state.nascimentoFilhoInvalido === "")
                    throw new Error("Preencha o campo \"Data de nascimento filho inválido\"");
            }

            var remuneracao = _.toNumber(this.state.remuneracaoInicial.replace('.', '').replace(',', '.'));
            var contribBasica = remuneracao * (this.state.percentualContribuicao / 100);

            var { data: resultadoSimulacao } = await simuladorService.SimularNaoParticipante(this.state.nome, this.state.email, contribBasica, this.state.contribuicaoFacultativa, this.state.aporte,
                this.state.idadeAposentadoria, this.state.percentualSaque, this.state.dataNascimento, this.state.sexo, this.state.nascimentoConjuge, 
                this.state.nascimentoFilhoInvalido, this.state.sexoFilhoInvalido, this.state.nascimentoFilhoMaisNovo, this.state.sexoFilhoMaisNovo, this.state.taxaJuros);

            await this.setState({ loading: false });

            await this.props.navigation.navigate("SimuladorNaoParticipantesResultado", { resultado: JSON.stringify(resultadoSimulacao) });
        } catch(ex) {
            await this.setState({ loading: false });

            setTimeout(() => {
                if(ex.response)
                    alert(ex.response.data);
                else
                    alert(ex);
            });
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
                <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
                    <Spinner visible={this.state.loading} cancelable={true} />

                    <View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[Styles.h2, { color: Variables.colors.primary, marginBottom: 10, textAlign: 'center' }]}>
                                Bem-vindo ao Simulador de Benefício do Plano CEBPREV
                            </Text>

                            <Text style={{ marginBottom: 30 }}>
                                Para começar, precisamos de algumas informações sobre você e sua contribuição para o plano CEBPREV!
                            </Text>
                        </View>

                        {/* Nome */}
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ marginBottom: 10 }}>Digite seu nome</Text>
                            <TextInput name={"nome"} style={Styles.textInput} underlineColorAndroid="transparent"
                                    value={this.state.nome} style={Styles.textInput}
                                    onChangeText={nome => this.setState({ nome })} />
                        </View>

                        {/* E-mail */}
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ marginBottom: 10 }}>Digite seu e-mail</Text>
                            <TextInput name={"email"} style={Styles.textInput} underlineColorAndroid="transparent" keyboardType={"email-address"}
                                    value={this.state.email} style={Styles.textInput}
                                    onChangeText={email => this.setState({ email })} />
                        </View>

                        {/* Data Nascimento */}
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ marginBottom: 10 }}>Digite sua data de nascimento</Text>
                            <TextInputMask name={"dataNascimento"} type={'custom'} options={{ mask: "99/99/9999" }} keyboardType={"phone-pad"}
                                    style={Styles.textInput} underlineColorAndroid="transparent"
                                    value={this.state.dataNascimento} style={Styles.textInput}
                                    onChangeText={dataNascimento => this.setState({ dataNascimento })} />
                        </View>

                        {/* Sexo */}
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ marginBottom: 10 }}>Sexo</Text>
                            <DropDown titulo={"Selecione o sexo"} valor={this.state.sexo}
                                        itens={[
                                        { titulo: "MASCULINO", valor: "M" },
                                        { titulo: "FEMININO", valor: "F" }
                                        ]}
                                        onValueChange={(sexo) => this.setState({ sexo })} />
                        </View>

                        {/* Salário bruto */}
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ marginBottom: 10 }}>Digite seu salário bruto</Text>
                            <TextInputMask name={"remuneracaoInicial"} type={'money'} options={{ unit: "" }} keyboardType={"phone-pad"}
                                    style={Styles.textInput} underlineColorAndroid="transparent"
                                    value={this.state.remuneracaoInicial} style={Styles.textInput}
                                    onChangeText={remuneracaoInicial => this.setState({ remuneracaoInicial })} />
                        </View>

                        {/* Percentual */}
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ marginBottom: 10 }}>Escolha o percentual de contribuição entre 5% e 10%</Text>
                            <DropDown titulo={"Escolha o percentual"} valor={this.state.percentualContribuicao}
                                    itens={[
                                        { titulo: "5%", valor: 5 },
                                        { titulo: "6%", valor: 6 },
                                        { titulo: "7%", valor: 7 },
                                        { titulo: "8%", valor: 8 },
                                        { titulo: "9%", valor: 9 },
                                        { titulo: "10%", valor: 10 }
                                    ]}
                                    onValueChange={(percentualContribuicao) => this.setState({ percentualContribuicao })} />
                        </View>

                        {/* Contribuição facultativa */}
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ marginBottom: 10 }}>Contribuição facultativa</Text>
                            <TextInputMask name={"contribuicaoFacultativa"} type={'money'} options={{ unit: "" }} keyboardType={"phone-pad"}
                                    style={Styles.textInput} underlineColorAndroid="transparent"
                                    value={this.state.contribuicaoFacultativa} style={Styles.textInput}
                                    onChangeText={contribuicaoFacultativa => this.setState({ contribuicaoFacultativa })} />
                        </View>

                        {/* Aporte inicial */}
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ marginBottom: 10 }}>Deseja realizar um aporte inicial?</Text>
                            <TextInputMask name={"aporte"} type={'money'} options={{ unit: "" }}
                                    style={Styles.textInput} underlineColorAndroid="transparent"
                                    value={this.state.aporte} style={Styles.textInput}
                                    onChangeText={aporte => this.setState({ aporte })} />
                        </View>

                        <Separador />

                        <Text style={[Styles.h2, { marginBottom: 10 }]}>Composição Familiar</Text>

                        {/* Data Nascimento */}
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ marginBottom: 10 }}>Data de nascimento do cônjuge ou companheiro</Text>
                            <TextInputMask name={"nascimentoConjuge"} type={'custom'} options={{ mask: "99/99/9999" }} keyboardType={"phone-pad"}
                                    style={Styles.textInput} underlineColorAndroid="transparent"
                                    value={this.state.nascimentoConjuge} style={Styles.textInput}
                                    onChangeText={nascimentoConjuge => this.setState({ nascimentoConjuge })} />
                        </View>

                        {/* Filho Mais Novo */}
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ marginBottom: 10 }}>Possui filhos?</Text>
                            <DropDown titulo={"Selecione uma opção"} valor={this.state.possuiFilhos}
                                    itens={[
                                    { titulo: "SIM", valor: "S" },
                                    { titulo: "NÃO", valor: "N" }
                                ]}
                                onValueChange={(possuiFilhos) => this.setState({ possuiFilhos })} />
                        </View>

                        {this.state.possuiFilhos && this.state.possuiFilhos === "S" &&
                            <View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ marginBottom: 10 }}>Possui filho inválido (portador de necessidades especiais)?</Text>
                                    <DropDown titulo={"Selecione uma opção"} valor={this.state.possuiFilhoInvalido}
                                            itens={[
                                            { titulo: "SIM", valor: "S" },
                                            { titulo: "NÃO", valor: "N" }
                                        ]}
                                        onValueChange={(possuiFilhoInvalido) => this.setState({ possuiFilhoInvalido })} />
                                </View>

                                {this.state.possuiFilhoInvalido && this.state.possuiFilhoInvalido === "S" &&
                                    <View>
                                        <View style={{ marginBottom: 10 }}>
                                            <Text style={{ marginBottom: 10 }}>Data de nascimento do filho inválido</Text>
                                            <TextInputMask name={"nascimentoFilhoInvalido"} type={'custom'} options={{ mask: "99/99/9999" }} keyboardType={"phone-pad"}
                                                    style={Styles.textInput} underlineColorAndroid="transparent"
                                                    value={this.state.nascimentoFilhoInvalido} style={Styles.textInput}
                                                    onChangeText={nascimentoFilhoInvalido => this.setState({ nascimentoFilhoInvalido })} />
                                        </View>

                                        <View style={{ marginBottom: 10 }}>
                                            <Text style={{ marginBottom: 10 }}>Sexo do filho inválido</Text>
                                            <DropDown titulo={"Selecione o sexo"} valor={this.state.sexoFilhoInvalido}
                                                    itens={[
                                                        { titulo: "MASCULINO", valor: "M" },
                                                        { titulo: "FEMININO", valor: "F" }
                                                    ]}
                                                    onValueChange={(sexoFilhoInvalido) => this.setState({ sexoFilhoInvalido })} />
                                        </View>
                                    </View>
                                }

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ marginBottom: 10 }}>Data de nascimento do filho mais novo</Text>
                                    <TextInputMask name={"nascimentoFilhoMaisNovo"} type={'custom'} options={{ mask: "99/99/9999" }} keyboardType={"phone-pad"}
                                            style={Styles.textInput} underlineColorAndroid="transparent"
                                            value={this.state.nascimentoFilhoMaisNovo} style={Styles.textInput}
                                            onChangeText={nascimentoFilhoMaisNovo => this.setState({ nascimentoFilhoMaisNovo })} />
                                </View>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ marginBottom: 10 }}>Sexo do filho mais novo</Text>
                                    <DropDown titulo={"Selecione o sexo"} valor={this.state.sexoFilhoMaisNovo}
                                            itens={[
                                                { titulo: "MASCULINO", valor: "M" },
                                                { titulo: "FEMININO", valor: "F" }
                                            ]}
                                            onValueChange={(sexoFilhoMaisNovo) => this.setState({ sexoFilhoMaisNovo })} />
                                </View>
                            </View>
                        }

                        <Separador />

                        <Text style={[Styles.h2, { marginBottom: 10 }]}>Estamos quase lá!</Text>

                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ marginBottom: 10 }}>Com quantos anos você pretende se aposentar?</Text>
                            <DropDown titulo={"Selecione a idade"} valor={this.state.idadeAposentadoria}
                                    itens={idadesAposentadoria}
                                    onValueChange={(idadeAposentadoria) => this.setState({ idadeAposentadoria })} />
                        </View>

                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ marginBottom: 10 }}>Você deseja sacar à vista um percentual do seu saldo de contas na concessão do benefício?</Text>
                            <DropDown titulo={"Percentual"} valor={this.state.percentualSaque}
                                    itens={percentuaisSaque} textoVazio={"NÃO"} valorVazio={0} prefixo={"SIM - "} sufixo={"%"}
                                    onValueChange={(percentualSaque) => this.setState({ percentualSaque })} />
                        </View>

                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ marginBottom: 10 }}>Com quantos anos você pretende se aposentar?</Text>
                            
                        </View>

                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ marginBottom: 10 }}>Taxa de juros</Text>
                            <DropDown titulo={"Selecione uma opção"} valor={this.state.taxaJuros}
                                    itens={[
                                    { titulo: "4", valor: 4 },
                                    { titulo: "4,23", valor: 4.23 },
                                    { titulo: "4,50", valor: 4.50 },
                                    { titulo: "5,00", valor: 5.00 },
                                    { titulo: "5,50", valor: 5.50 }
                                ]}
                                sufixo={"%"}
                                onValueChange={(taxaJuros) => this.setState({ taxaJuros })} />
                        </View>

                        <Text style={[ Styles.h3, { color: Variables.colors.secondary} ]}>Dados válidos somente para essa simulação!</Text>

                        <Button title={"Próximo"} style={{ marginTop: 10 }}
                            onClick={this.simular} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}