import React from "react";
import { View, Text, AsyncStorage, StatusBar } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import Styles, { Variables } from "../styles";
import { Button } from "../components";

import { DadosPessoaisService, PlanoVinculadoService } from "advanced-service";

const config = require("../config.json");
const dadosPessoaisService  = new DadosPessoaisService(config);
const planoVinculadoService = new PlanoVinculadoService(config);

const styles = {
    header: {
        marginTop: 10,
        marginBottom: 10,
        fontWeight: "bold"
    },
    subheader: {
        marginBottom: 40
    },
    button: {
        marginBottom: 20,
        padding: 5
    },
    buttonText: {
        fontWeight: "bold"
    }
}

export default class PlanosScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            usuario: {},
            planos: []
        }

        this.selecionarPlano = this.selecionarPlano.bind(this);
        this.carregarDadosPessoais = this.carregarDadosPessoais.bind(this);
        this.carregarPlanos = this.carregarPlanos.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true }, this.carregarDadosPessoais);
    }

    async carregarDadosPessoais() {
        var result = await dadosPessoaisService.Buscar();
        this.setState({ usuario: result.data }, this.carregarPlanos);
    }

    async carregarPlanos() {
        var result = await planoVinculadoService.Buscar();
        await this.setState({ planos: result.data, loading: false });
    }

    async selecionarPlano(plano) {
        await AsyncStorage.setItem('plano', plano.SQ_PLANO_PREVIDENCIAL.toString());
        await AsyncStorage.setItem('assistido', (plano.DS_SIT_PLANO === "ASSISTIDO").toString());
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <View style={[Styles.content, { paddingTop: 50 }]}>

                <Spinner visible={this.state.loading} />

                <Text style={Styles.h3}>Olá,</Text>
                <Text style={[ Styles.h1, styles.header ]}>{this.state.usuario.NO_PESSOA}</Text>
                <Text style={styles.subheader}>Selecione um de seus planos contratados com a Faceb</Text>

                {
                    this.state.planos.map((plano, index) => (
                        <Button key={index} title={plano.DS_PLANO_PREVIDENCIAL} subtitle={plano.DS_SIT_PLANO} 
                                style={[Styles.button, styles.button]} titleStyle={[Styles.h2, styles.buttonText]}
                                onClick={() => this.selecionarPlano(plano)} />
                    ))
                }
            </View>
        );
    }
}