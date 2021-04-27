import React, { Component } from 'react';
import { Text, View, ScrollView, TextInput } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import _ from "lodash";

import Styles from "../styles";
import { Button } from "../components";

import { DadosPessoaisService, RelacionamentoService } from "./../services";
import { EmailEntidade } from '../entidades';

interface Props {
  navigation?: any;
}

interface State {
  dados: any;
  email: string;
  assunto: string;
  mensagem: string;
  height: number;
  loading: boolean;
}

export default class RelacionamentoScreen extends Component<Props, State> {

  static navigationOptions = {
    title: "Relacionamento",
    rightMenu: true
  }

  constructor(props) {
    super(props);

    this.state = {
      dados: {},
      email: "",
      assunto: "",
      mensagem: "",
      height: 0,
      loading: false
    };
  }

  async componentDidMount() {
    await this.setState({ loading: true });

    await this.carregarDadosPessoais();

    await this.setState({ loading: false });
  }

  async carregarDadosPessoais() {
    var result = await DadosPessoaisService.Buscar();
    await this.setState({
      dados: result,
      email: result.NO_EMAIL
    });
  }

  enviar = async () => {
    try {
      const msg: EmailEntidade = {
        Email: this.state.email,
        Assunto: this.state.assunto,
        Mensagem: this.state.mensagem,
      };

      await RelacionamentoService.Enviar(msg);
      await alert("Sua mensagem foi enviada com sucesso!");
      await this.props.navigation.navigate('Home');
    } catch (err) {
      if (err.response) {
        alert(err.response.data);
        this.setState({ loading: false });
      } else {
        alert("Ocorreu um erro ao processar requisição!");
      }
    }
  }

  render() {
    return (
      <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
        <Spinner visible={this.state.loading} cancelable={true} />

        <View>
          <View style={{ marginBottom: 15 }}>
            <Text>Seu E-mail:</Text>
            <TextInput style={[Styles.textInput, { padding: 0, marginBottom: 0, marginTop: 10 }]}
              placeholder={"Digite aqui seu e-mail"} keyboardType={"email-address"} underlineColorAndroid="transparent"
              value={this.state.email} onChangeText={value => this.setState({ email: value })} />
          </View>

          <View style={{ marginBottom: 15 }}>
            <Text>Assunto:</Text>
            <TextInput style={[Styles.textInput, { padding: 0, marginBottom: 0, marginTop: 10 }]}
              placeholder={"Digite aqui o assunto"} underlineColorAndroid="transparent"
              value={this.state.assunto} onChangeText={value => this.setState({ assunto: value })} />
          </View>

          <View style={{ marginBottom: 15 }}>
            <Text>Mensagem:</Text>
            <TextInput underlineColorAndroid="transparent" multiline
              value={this.state.mensagem}
              onChangeText={(text) => {
                this.setState({ mensagem: text })
              }}
              onContentSizeChange={(event) => {
                this.setState({ height: event.nativeEvent.contentSize.height })
              }}
              style={[Styles.textInput, { marginBottom: 0, marginTop: 10, height: Math.max(35, this.state.height) }]} />
          </View>

          <Button title={"Enviar"} style={{ marginTop: 20 }} onClick={this.enviar} />
        </View>
      </ScrollView>
    );
  }
}
