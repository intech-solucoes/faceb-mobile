import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, BackHandler, AsyncStorage } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';

import Styles, { Variables } from "../styles";
import { ScreenHeader, ElevatedView, CampoEstatico } from "../components";

import { ContrachequeService } from "advanced-service";

const config = require("../config.json");
const contrachequeService  = new ContrachequeService(config);

export default class ContrachequeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            contracheques: {},
            contrachequeSelecionado: {}
        }
    }

    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));

        await this.setState({ loading: true });

        await this.carregarPlano();
        await this.carregarContracheques();
        await this.carregarContracheque(this.state.contracheques[0].SQ_CRONOGRAMA);

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

    async carregarContracheques() {
        var result = await contrachequeService.BuscarDatasPorPlano(this.state.plano);
        await this.setState({ contracheques: result.data });
    }

    async carregarContracheque(cronograma) {
        var result = await contrachequeService.BuscarPorPlanoCronograma(this.state.plano, cronograma);
        await this.setState({ contrachequeSelecionado: result.data });
    }

    render() {
        return (
            <View>
                <Spinner visible={this.state.loading} />
                
                <ScreenHeader titulo={"Contracheques"} />

                <View>
                    
                    <ElevatedView elevation={3} style={{justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                        <Text style={[Styles.h2, { marginBottom: 10 }]}>
                            CONTRACHEQUE DE 00/00/0000
                        </Text>

                        <View style={{ alignItems: 'center',  flexDirection: "row" }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text>BRUTO</Text>
                                <Text>0,00</Text>
                            </View>

                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text>DESCONTOS</Text>
                                <Text>0,00</Text>
                            </View>

                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text>LÍQUIDO</Text>
                                <Text>0,00</Text>
                            </View>
                        </View>
                    </ElevatedView>

                    <View>
                        <Text style={Styles.h1}>Lista</Text>
                    </View>

                </View>
            </View>
        );
    }
};
