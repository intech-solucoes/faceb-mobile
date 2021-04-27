import React from "react";
import { View, Text, AsyncStorage } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import Styles from "../styles";
import { Button } from "../components";

import { DadosPessoaisService, PlanoVinculadoService, UsuarioService } from "../services";

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

interface Props {
  navigation?: any;
}

interface State {
  loading: boolean;
  dadosPessoais: any;
  matriculas: Array<any>;
  planos: Array<any>;
  nome: string;
  matriculaSelecionada: boolean;
  pensionista: boolean;
}

export default class PlanosScreen extends React.Component<Props, State> {

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
      nome: null,
      matriculaSelecionada: false,
      pensionista: false
    }
  }

  async componentDidMount() {
    await this.setState({ loading: true });

    await this.carregarDados();

    await this.setState({ loading: false });
  }

  carregarDados = async () => {
    var result = await DadosPessoaisService.Buscar();
    var matriculas = await UsuarioService.BuscarMatriculas();

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
      dadosPessoais: result,
      nome: result.NO_PESSOA.split(" ")[0],
      pensionista
    });
  }

  selecionarMatricula = async (matricula) => {
    try {
      var login = await UsuarioService.SelecionarMatricula(matricula.Matricula);

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
    var planos = await PlanoVinculadoService.Buscar();
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
        <Text style={[Styles.h1, {
          marginTop: 10,
          marginBottom: 10,
          fontWeight: "bold"
        }]}>{this.state.nome}</Text>


        {!this.state.matriculaSelecionada &&
          <>
            <Text style={styles.subheader}>Selecione uma de suas matrículas</Text>

            <View>
              {this.state.matriculas.map((matricula, index) => (
                <View key={index} style={{ marginBottom: 20 }}>
                  <Button title={`${matricula.Matricula} - ${matricula.Empresa}`}
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