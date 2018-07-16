import React from "react";
import { View, Text, TouchableHighlight, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from "react-navigation";
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
    static navigationOptions = {
        title: 'Planos'
    };

    constructor(props) {
        super(props);

        this.state = {
            usuario: {},
            planos: []
        }

        this.selecionarPlano = this.selecionarPlano.bind(this);
    }

    componentDidMount() {
        dadosPessoaisService.Buscar()
            .then(result => {
                this.setState({
                    usuario: result.data
                });
            })
            .catch(err => {
                alert(err);
            });

        planoVinculadoService.Buscar()
            .then(result => {
                this.setState({
                    planos: result.data
                });
            })
            .catch(err => {
                alert(err);
            });
    }

    selecionarPlano(plano) {
        AsyncStorage.setItem('plano', plano, () => {
            this.props.navigation.navigate('MainStack')
        });
    }

    render() {
        return (
            <View style={[Styles.content, { paddingTop: 50 }]}>

                <Text style={Styles.h3}>Olá,</Text>
                <Text style={[ Styles.h1, styles.header ]}>{this.state.usuario.NO_PESSOA}</Text>
                <Text style={styles.subheader}>Selecione um de seus planos contratados com a Faceb</Text>

                {
                    this.state.planos.map((plano, index) => (
                        <Button key={index} title={plano.DS_PLANO_PREVIDENCIAL} subtitle={plano.DS_SIT_PLANO} 
                                style={[Styles.button, styles.button]} titleStyle={[Styles.h2, styles.buttonText]}
                                onClick={() => this.selecionarPlano(plano.SQ_PLANO_PREVIDENCIAL)} />
                    ))
                }
            </View>
        );
    }
}