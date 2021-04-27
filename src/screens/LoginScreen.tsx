import React from "react";
import { Text, View, ScrollView, TextInput, Switch, AsyncStorage } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';

import Styles, { Variables } from "../styles";
import { Button } from "../components";

import { UsuarioService } from "./../services";
import { Session } from "@intech/expo-service";

const styles = {
  container: {
    flex: 1,
    padding: 10
  },
  content: {
    flex: 1,
    padding: 50,
    alignItems: "center"
  },
  loginField: {
    backgroundColor: "#F6F7F9",
    borderColor: "#e8e9ea",
    borderWidth: 1
    // borderBottomColor: "#CCC",
    // borderBottomWidth: 1
  },
  remember: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    marginBottom: 30
  },
  labelRemeber: {
    marginTop: 6,
    marginLeft: 5
  }
}

interface Props {
  navigation?: any;
}

interface State {
  cpf: string;
  senha: string;
  lembrar: boolean;
  loading: boolean;
}

export default class LoginScreen extends React.Component<Props, State> {

  static navigationOptions = {
    title: "Login",
    rightMenu: false
  }

  // Armazena as referências dos inputs para fácil transição entre eles, como utilizar o tab no teclado
  inputs = {};

  constructor(props) {
    super(props);

    // Cria o state do componente
    this.state = {
      cpf: "",
      senha: "",
      lembrar: false,
      loading: false
    };
  }

  componentDidMount = async () => {
    await this.setState({ loading: false });

    var cpf = await AsyncStorage.getItem('cpfSalvo');

    if (cpf && this.state.cpf === "")
      await this.setState({ cpf, lembrar: true });
  }

  focusNextField = (id) => {
    this.inputs[id].focus();
  }

  login = async () => {
    try {
      if (this.state.cpf.trim() === "" || this.state.senha.trim() === "") {
        alert("Os campos CPF e senha são obrigatórios!");
        return;
      }

      await this.setState({ loading: true });

      if (this.state.lembrar) {
        await AsyncStorage.setItem('cpfSalvo', this.state.cpf);
      } else {
        await AsyncStorage.removeItem('cpfSalvo');
      }

      const user = {
        Cpf: this.state.cpf,
        Senha: this.state.senha
      };

      var result = await UsuarioService.Login(user);
      await this.setState({ loading: false });

      await Session.setToken(result.AccessToken);

      await AsyncStorage.setItem('token', result.AccessToken);
      await AsyncStorage.setItem('pensionista', result.Pensionista.toString());

      this.props.navigation.navigate('Planos');
    } catch (err) {
      await this.setState({ loading: false });

      setTimeout(() => {
        if (err.response)
          alert(err.response.data);
        else
          alert(err);
      }, 100);
    }
  }

  render() {
    return (
      <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
        <Spinner visible={this.state.loading} cancelable={true} />

        <View>
          <TextInput style={[Styles.textInput, styles.loginField]} placeholder="CPF" returnKeyType="next" blurOnSubmit={false} underlineColorAndroid="transparent"
            onSubmitEditing={() => { this.focusNextField('senha'); }} onChangeText={value => this.setState({ cpf: value })}
            ref={input => { this.inputs['cpf'] = input; }} value={this.state.cpf} />

          <TextInput style={[Styles.textInput, styles.loginField]} placeholder="Senha" returnKeyType="done" secureTextEntry={true}
            ref={input => { this.inputs['senha'] = input; }} onChangeText={value => this.setState({ senha: value })} value={this.state.senha} />

          <View style={{
            flex: 1,
            flexDirection: "row",
            margin: 10,
            marginBottom: 30
          }}>
            <Switch value={this.state.lembrar} thumbColor={Variables.colors.primary} ios_backgroundColor={"#CCC"}
              onValueChange={value => this.setState({ lembrar: value })} />
            <Text style={styles.labelRemeber}>Lembrar-me</Text>
          </View>

          <Button title="Entrar" onClick={this.login} />
        </View>
      </ScrollView>
    );
  }
}