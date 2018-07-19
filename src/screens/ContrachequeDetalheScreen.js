import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, BackHandler, AsyncStorage, FlatList, TouchableHighlight } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { TextMask } from "react-native-masked-text";
import _ from 'lodash'

import Styles, { Variables } from "../styles";
import { ScreenHeader, ElevatedView, Button } from "../components";

import { ContrachequeService } from "advanced-service";

const config = require("../config.json");
const contrachequeService  = new ContrachequeService(config);

export default class ContrachequeDetalheScreen extends Component {

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
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));

        await this.setState({ loading: true });

        await this.carregarPlano();
        await this.carregarContracheque();

        await this.setState({ loading: false });
    }

    onBackPress() {
        this.props.navigation.navigate('Home');
        return false;
    }

    async carregarPlano() {
        var plano = await AsyncStorage.getItem("plano");
        await this.setState({ plano });
    }

    async carregarContracheque() {
        var cronograma = this.props.navigation.getParam("cronograma", "0");
        var result = await contrachequeService.BuscarPorPlanoCronograma(this.state.plano, cronograma);

        var contracheque = result.data.rubricas;
        var rendimentos = _.filter(contracheque, { IR_LANCAMENTO: "P" });
        var descontos = _.filter(contracheque, { IR_LANCAMENTO: "D" });

        await this.setState({ contracheque, rendimentos, descontos });
    }

    render() {
        return (
            <View>
                <Spinner visible={this.state.loading} />
                
                <ScreenHeader titulo={"Contracheques"} />

                <View>
                    <View>
                        <Text style={Styles.h1}>RENDIMENTOS</Text>
                        
                        <FlatList data={this.state.rendimentos}
                            renderItem={
                                ({item}) => <Text>{item.DS_RUBRICA}</Text>
                            }
                            keyExtractor={(item, index) => index.toString()} />
                    </View>

                    <View>
                        <Text style={Styles.h1}>DESCONTOS</Text>
                        
                        <FlatList data={this.state.descontos}
                            renderItem={
                                ({item}) => <Text>{item.DS_RUBRICA}</Text>
                            }
                            keyExtractor={(item, index) => index.toString()} />
                    </View>
                </View>
            </View>
        );
    }
};
