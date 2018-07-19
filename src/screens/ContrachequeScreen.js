import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, BackHandler, AsyncStorage, FlatList, TouchableHighlight } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { TextMask } from "react-native-masked-text";

import Styles, { Variables } from "../styles";
import { ScreenHeader, ElevatedView, Button } from "../components";

import { ContrachequeService } from "advanced-service";

const config = require("../config.json");
const contrachequeService  = new ContrachequeService(config);

export default class ContrachequeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            plano: 0,
            contracheques: {},
            contrachequeSelecionado: {
                resumo: {}
            }
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
                            CONTRACHEQUE DE {this.state.contrachequeSelecionado.resumo.referencia}
                        </Text>

                        <View style={{ alignItems: 'center',  flexDirection: "row" }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text>BRUTO</Text>
                                <TextMask type={'money'} value={this.state.contrachequeSelecionado.resumo.bruto} />
                            </View>

                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text>DESCONTOS</Text>
                                <TextMask type={'money'} value={this.state.contrachequeSelecionado.resumo.descontos} />
                            </View>

                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text>LÍQUIDO</Text>
                                <TextMask type={'money'} value={this.state.contrachequeSelecionado.resumo.liquido} />
                            </View>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Button title="Detalhar" style={{ width: 300 }} onClick={() => this.props.navigation.navigate("ContrachequeDetalhe", { cronograma: this.state.contrachequeSelecionado.rubricas[0].SQ_CRONOGRAMA })} />
                        </View>
                    </ElevatedView>

                    <View>
                        <FlatList data={this.state.contracheques}
                            renderItem={
                                ({item}) => (
                                    <TouchableHighlight
                                                        style={styles.rowContainer} underlayColor={Variables.colors.gray}
                                                        onPress={() => this.carregarContracheque(item.SQ_CRONOGRAMA)}>
                                        <Text>{item.DT_REFERENCIA}</Text>
                                    </TouchableHighlight>
                                )
                            }
                            keyExtractor={(item, index) => index.toString()} />
                    </View>

                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    rowContainer: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#000',
    }
});