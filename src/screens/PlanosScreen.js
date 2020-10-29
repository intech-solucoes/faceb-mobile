import React from "react";
import { View, Text, AsyncStorage, StatusBar } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import Styles, { Variables } from "../styles";
import { Button } from "../components";

import { DadosPessoaisService, PlanoVinculadoService, UsuarioService } from "@intechprev/advanced-service";

const config = require("../config.json");
const dadosPessoaisService = new DadosPessoaisService(config);
const planoVinculadoService = new PlanoVinculadoService(config);
const usuarioService = new UsuarioService(config);

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
        title: "Planos",
        rightMenu: false
    }

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            dadosPessoais: {},
            matriculas: [],
            planos: [],
            nome: null
        }
    }

    async componentDidMount() {
        await this.setState({ loading: true });

        await this.carregarDados();

        await this.setState({ loading: false });
    }

    carregarDados = async () => {
        var result = await dadosPessoaisService.Buscar();
        var { data: matriculas } = await usuarioService.BuscarMatriculas();

        if (matriculas.length > 1) {
            await this.setState({
                matriculas,
                matriculaSelecionada: false
            });
        } else {
            await this.setState({
                matriculaSelecionada: true
            });

            await this.carregarPlanos();
        }

        var pensionista = (await AsyncStorage.getItem("pensionista")) === "true";

        await this.setState({
            dadosPessoais: result.data,
            nome: result.data.NO_PESSOA.split(" ")[0],
            pensionista
        });
    }

    selecionarMatricula = async (matricula) => {
        try {
            var { data: login } = await usuarioService.SelecionarMatricula(matricula);

            await AsyncStorage.setItem('token', login.AccessToken);
            await AsyncStorage.setItem("pensionista", login.Pensionista.toString());

            await this.setState({
                matriculaSelecionada: true
            });

            await this.carregarPlanos();
        } catch (err) {
            var msg = err.response ? err.response.data : err;
            
            alert("Ocorreu um erro ao selecionar esta matrícula. Verifique sua situação no plano junto com a Faceb.");
        }
    }

    carregarPlanos = async () => {
        var { data: planos } = await planoVinculadoService.Buscar();
        await this.setState({ planos, loading: false });
    }

    selecionarPlano = async (plano) => {
        await AsyncStorage.setItem('plano', plano.SQ_PLANO_PREVIDENCIAL.toString());
        await AsyncStorage.setItem('assistido', (plano.DS_SIT_PLANO === "ASSISTIDO").toString());
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <View style={[Styles.content, { paddingTop: 20 }]}>

                <Spinner visible={this.state.loading} cancelable={true} />

                <Text style={Styles.h3}>Olá,</Text>
                <Text style={[Styles.h1, styles.header]}>{this.state.nome}</Text>


                {!this.state.matriculaSelecionada &&
                    <>
                        <Text style={styles.subheader}>Selecione uma de suas matrículas</Text>

                        <View>
                            {this.state.matriculas.map((matricula, index) => (
                                <View key={index} style={{ marginBottom: 20 }}>
                                    <Button title={matricula}
                                        titleStyle={[Styles.h2, styles.buttonText]}
                                        onClick={() => this.selecionarMatricula(matricula)} />
                                </View>
                            ))}
                        </View>
                    </>
                }

                {this.state.matriculaSelecionada &&
                    <>
                        <Text style={styles.subheader}>Selecione um de seus planos contratados com a Faceb</Text>

                        {
                            this.state.planos.map((plano, index) => (
                                <Button key={index} title={plano.DS_PLANO_PREVIDENCIAL} subtitle={this.state.pensionista ? "PENSIONISTA" : plano.DS_SIT_PLANO}
                                    style={[Styles.button, styles.button]} titleStyle={[Styles.h2, styles.buttonText]}
                                    onClick={() => this.selecionarPlano(plano)} />
                            ))
                        }
                    </>
                }
            </View>
        );
    }
}