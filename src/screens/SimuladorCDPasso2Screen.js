import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, BackHandler, AsyncStorage, Slider, TextInput, Picker } from "react-native";
import { TextMask } from "react-native-masked-text";
import Spinner from 'react-native-loading-spinner-overlay';
import _ from "lodash";

import Styles, { Variables } from "../styles";
import { ScreenHeader, ElevatedView, CampoEstatico, Button } from "../components";

import { SimuladorService } from "@intechprev/advanced-service";

const config = require("../config.json");
const simuladorService  = new SimuladorService(config);

export default class SimuladorCDPasso2Screen extends Component {

    static navigationOptions = {
        title: "Sua Aposentadoria"
    }
    
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            dadosSimulacao: { },
            idadeMaximAposentadoria: 70,
            idadeMinimaAposentadoria: 48,
            idadeAposentadoria: 48,
            saque: "N",
            contribBasica: "",
            contribFacultativa: ""
        }

        this.alterarIdade = this.alterarIdade.bind(this);
    }

    async componentDidMount() {
        await this.setState({ loading: true });

        await this.carregarDados();
        await this.alterarIdade(this.state.idadeMinimaAposentadoria);

        await this.setState({ loading: false });
    }

    async carregarDados() {
        var contribBasica = this.props.navigation.getParam("contribBasica", "0");
        var contribFacultativa = this.props.navigation.getParam("contribFacultativa", "0");

        var result = await simuladorService.BuscarDadosSimuladorCDPasso2();

        await this.setState({ 
            dadosSimulacao: result.data,
            idadeAposentadoria: result.data.idadeMinimaAposentadoria,
            idadeMaximAposentadoria: result.data.idadeMaximAposentadoria,
            idadeMinimaAposentadoria: result.data.idadeMinimaAposentadoria,
            contribBasica,
            contribFacultativa
        });
    }

    async alterarIdade(value) {
        value = _.round(value / 1) * 1;
        
        await this.setState({
            idadeAposentadoria: value
        });
    }

    render() {
        return (
            <View>
                <Spinner visible={this.state.loading} cancelable={true} />

                {!this.state.loading && 
                    <ScrollView contentContainerStyle={Styles.scrollContainer}>
                        <ElevatedView elevation={3} style={{ padding: 10, marginBottom: 10 }}>

                            <Text style={[Styles.h3, { marginBottom: 10 }]}>Com quantos anos você pretende se aposentar?</Text>
                            <View style={{ alignItems: "center" }}>
                                <Text style={Styles.h4}>Arraste para alterar a idade</Text>
                            </View>
                            <Slider maximumValue={this.state.idadeMaximAposentadoria ? this.state.idadeMaximAposentadoria : 70} 
                                    minimumValue={this.state.idadeMinimaAposentadoria ? this.state.idadeMinimaAposentadoria : 48} 
                                    onValueChange={this.alterarIdade} />
                            <View style={{ alignItems: "center" }}>
                                <Text style={[Styles.h2, { color: Variables.colors.primary}]}>
                                    {this.state.idadeAposentadoria} anos
                                </Text>
                            </View>

                        </ElevatedView>
                            
                        <View style={{ padding: 10, paddingBottom: 0 }}>
                            <CampoEstatico titulo={"Esse é o seu saldo de conta atualizado"} tipo={"dinheiro"} valor={this.state.dadosSimulacao.saldo} />
                        </View>

                        <Text style={{ padding: 10, marginBottom: 10, fontSize: 16 }}>
                            Para a simulação da sua aposentadoria, o seu saldo de contas atual será projetado acrescendo as contribuições mensais futuras até a data da sua aposentadoria. 
                            Os valores sofrerão uma valorização de <Text style={{ fontWeight: "bold", color: Variables.colors.primary }}>{this.state.dadosSimulacao.taxaJuros}%</Text> ao ano (valorização fictícia, válida apenas para essa simulação).
                        </Text>

                        <ElevatedView elevation={3} style={{ padding: 10, marginBottom: 10 }}>
                            <Text style={[Styles.h3, { marginBottom: 10 }]}>Você deseja sacar à vista um percentual do seu saldo de contas na concessão do benefício?</Text>
                            <Picker
                                selectedValue={this.state.saque}
                                onValueChange={(itemValue, itemIndex) => this.setState({ saque: itemValue })}>
                                <Picker.Item label="Não" value="N" />
                                {_.range(1, 26).map((percentual, index) => {
                                    return <Picker.Item key={index} label={percentual + "%"} value={percentual.toString()} />
                                })}
                            </Picker>
                        </ElevatedView>

                        <Button title={"Continuar"} onClick={() => this.props.navigation.navigate("SimuladorCDResultado", { 
                                contribBasica: this.state.contribBasica, 
                                contribFacultativa: this.state.contribFacultativa,
                                idadeAposentadoria: this.state.idadeAposentadoria,
                                saque: this.state.saque })} />
                    </ScrollView>
                }
                
            </View>
        );
    }
};
