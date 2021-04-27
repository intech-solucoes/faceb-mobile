import React, { Component } from 'react';
import { Text, View, ScrollView, TextInput, KeyboardAvoidingView } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import Spinner from 'react-native-loading-spinner-overlay';
import _ from "lodash";

import Styles, { Variables } from "../../styles";
import { Button, DropDown } from "../../components";
import Separador from '../../components/Separador';

import { SimuladorNaoParticipantesResultadoScreen } from "./resultado";
import { SimuladorService } from '../../services';
import { DadosSimulacaoNaoParticipante } from '../../entidades';
import moment from 'moment';
export { SimuladorNaoParticipantesResultadoScreen };

const idadesAposentadoria = _.range(48, 71, 1);
const percentuaisSaque = _.range(1, 26, 1);

interface Props {
  navigation?: any;
}

interface State {
  loading: boolean;
  nome: string;
  email: string;
  dataNascimento: string;
  remuneracaoInicial: string;
  contribuicaoFacultativa: string;
  aporte: string;
  sexo: string;
  nascimentoConjuge: string;
  possuiFilhos: string;
  sexoFilhoMaisNovo: string;
  nascimentoFilhoMaisNovo: string;
  possuiFilhoInvalido: string;
  sexoFilhoInvalido: string;
  nascimentoFilhoInvalido: string;
  percentualSaque: number;
  percentualContribuicao: number;
  idadeAposentadoria: number;
  taxaJuros: number;
}

export class SimuladorNaoParticipantesScreen extends Component<Props, State> {

  static navigationOptions = {
    title: "Simulador",
    rightMenu: false
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      nome: "",
      email: "",
      dataNascimento: "",
      remuneracaoInicial: "",
      contribuicaoFacultativa: "",
      aporte: "",
      sexo: "M",
      nascimentoConjuge: "01/01/1991",
      possuiFilhos: "N",
      sexoFilhoMaisNovo: "M",
      nascimentoFilhoMaisNovo: "",
      possuiFilhoInvalido: "N",
      sexoFilhoInvalido: "M",
      nascimentoFilhoInvalido: "",
      percentualSaque: 0,
      percentualContribuicao: 10,
      idadeAposentadoria: 48,
      taxaJuros: 4.23
    }
  }

  simular = async () => {
    try {
      await this.setState({ loading: true });

      if (!this.state.nome || this.state.nome === "")
        throw new Error("Preencha o campo \"Nome\"");

      if (!this.state.email || this.state.email === "")
        throw new Error("Preencha o campo \"E-mail\"");

      if (!this.state.dataNascimento || this.state.dataNascimento === "")
        throw new Error("Preencha o campo \"Data de nascimento\"");

      if (!this.state.remuneracaoInicial || this.state.remuneracaoInicial === "")
        throw new Error("Preencha o campo \"Salário Bruto\"");

      if (this.state.possuiFilhos === "S") {
        if (!this.state.nascimentoFilhoMaisNovo || this.state.nascimentoFilhoMaisNovo === "")
          throw new Error("Preencha o campo \"Data de nascimento filho mais novo\"");
      } else {
        await this.setState({
          nascimentoFilhoMaisNovo: ""
        });
      }

      if (this.state.possuiFilhoInvalido === "S") {
        if (!this.state.nascimentoFilhoInvalido || this.state.nascimentoFilhoInvalido === "")
          throw new Error("Preencha o campo \"Data de nascimento filho inválido\"");
      } else {
        await this.setState({
          nascimentoFilhoInvalido: ""
        });
      }

      var remuneracao = _.toNumber(this.state.remuneracaoInicial.replace('.', '').replace(',', '.'));
      var aporte = _.toNumber(this.state.aporte.replace('.', '').replace(',', '.'));
      var contribuicaoFacultativa = _.toNumber(this.state.contribuicaoFacultativa.replace('.', '').replace(',', '.'));
      var contribBasica = remuneracao * (this.state.percentualContribuicao / 100);

      const dados = new DadosSimulacaoNaoParticipante();
      dados.Nome = this.state.nome;
      dados.Email = this.state.email;
      dados.DataNascimento = moment(this.state.dataNascimento, "DD/MM/YYYY").toDate();
      dados.Sexo = this.state.sexo;
      dados.IdadeAposentadoria = this.state.idadeAposentadoria;
      dados.ContribBasica = contribBasica;
      dados.ContribFacultativa = contribuicaoFacultativa;
      dados.TaxaJuros = this.state.taxaJuros;
      dados.AporteInicial = aporte;
      dados.Saque = this.state.percentualSaque;
      dados.NascimentoConjugue = moment(this.state.nascimentoConjuge, "DD/MM/YYYY").toDate();
      dados.NascimentoFilhoInvalido = moment(this.state.nascimentoFilhoInvalido, "DD/MM/YYYY").toDate();
      dados.SexoFilhoInvalido = this.state.sexoFilhoInvalido;
      dados.NascimentoFilhoMaisNovo = moment(this.state.nascimentoFilhoMaisNovo, "DD/MM/YYYY").toDate();
      dados.SexoFilhoMaisNovo = this.state.sexoFilhoMaisNovo;

      var resultadoSimulacao = await SimuladorService.SimularNaoParticipante(dados);

      await this.setState({ loading: false });

      await this.props.navigation.navigate("SimuladorNaoParticipantesResultado", { resultado: JSON.stringify(resultadoSimulacao) });
    } catch (ex) {
      await this.setState({ loading: false });

      setTimeout(() => {
        if (ex.response)
          alert(JSON.stringify(ex.response.data));
        else
          alert(ex);
      });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
        <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
          <Spinner visible={this.state.loading} cancelable={true} />

          <View>
            <View style={{ marginBottom: 10 }}>
              <Text style={[Styles.h2, { color: Variables.colors.primary, marginBottom: 10, textAlign: 'center' }]}>
                Bem-vindo ao Simulador de Benefício do Plano CEBPREV
                            </Text>

              <Text style={{ marginBottom: 30 }}>
                Para começar, precisamos de algumas informações sobre você e sua contribuição para o plano CEBPREV!
                            </Text>
            </View>

            {/* Nome */}
            <View style={{ marginBottom: 10 }}>
              <Text style={{ marginBottom: 10 }}>Digite seu nome</Text>
              <TextInput style={Styles.textInput} underlineColorAndroid="transparent"
                value={this.state.nome} onChangeText={nome => this.setState({ nome })} />
            </View>

            {/* E-mail */}
            <View style={{ marginBottom: 10 }}>
              <Text style={{ marginBottom: 10 }}>Digite seu e-mail</Text>
              <TextInput style={Styles.textInput} underlineColorAndroid="transparent" keyboardType={"email-address"}
                value={this.state.email} onChangeText={email => this.setState({ email })} />
            </View>

            {/* Data Nascimento */}
            <View style={{ marginBottom: 10 }}>
              <Text style={{ marginBottom: 10 }}>Digite sua data de nascimento</Text>
              <TextInputMask type={'custom'} options={{ mask: "99/99/9999" }} keyboardType={"phone-pad"}
                style={Styles.textInput} underlineColorAndroid="transparent"
                value={this.state.dataNascimento} onChangeText={dataNascimento => this.setState({ dataNascimento })} />
            </View>

            {/* Sexo */}
            <View style={{ marginBottom: 10 }}>
              <Text style={{ marginBottom: 10 }}>Sexo</Text>
              <DropDown titulo={"Selecione o sexo"} valor={this.state.sexo}
                itens={[
                  { titulo: "MASCULINO", valor: "M" },
                  { titulo: "FEMININO", valor: "F" }
                ]}
                onValueChange={(sexo) => this.setState({ sexo })} />
            </View>

            {/* Salário bruto */}
            <View style={{ marginBottom: 10 }}>
              <Text style={{ marginBottom: 10 }}>Digite seu salário bruto</Text>
              <TextInputMask type={'money'} options={{ unit: "" }} keyboardType={"phone-pad"}
                style={Styles.textInput} underlineColorAndroid="transparent"
                value={this.state.remuneracaoInicial} onChangeText={remuneracaoInicial => this.setState({ remuneracaoInicial })} />
            </View>

            {/* Percentual */}
            <View style={{ marginBottom: 10 }}>
              <Text style={{ marginBottom: 10 }}>Escolha o percentual de contribuição entre 5% e 10%</Text>
              <DropDown titulo={"Escolha o percentual"} valor={this.state.percentualContribuicao}
                itens={[
                  { titulo: "5%", valor: 5 },
                  { titulo: "6%", valor: 6 },
                  { titulo: "7%", valor: 7 },
                  { titulo: "8%", valor: 8 },
                  { titulo: "9%", valor: 9 },
                  { titulo: "10%", valor: 10 }
                ]}
                onValueChange={(percentualContribuicao) => this.setState({ percentualContribuicao })} />
            </View>

            {/* Contribuição facultativa */}
            <View style={{ marginBottom: 10 }}>
              <Text style={{ marginBottom: 10 }}>Contribuição facultativa</Text>
              <TextInputMask type={'money'} options={{ unit: "" }} keyboardType={"phone-pad"}
                style={Styles.textInput} underlineColorAndroid="transparent"
                value={this.state.contribuicaoFacultativa} onChangeText={contribuicaoFacultativa => this.setState({ contribuicaoFacultativa })} />
            </View>

            {/* Aporte inicial */}
            <View style={{ marginBottom: 10 }}>
              <Text style={{ marginBottom: 10 }}>Deseja realizar um aporte inicial?</Text>
              <TextInputMask type={'money'} options={{ unit: "" }}
                style={Styles.textInput} underlineColorAndroid="transparent"
                value={this.state.aporte} onChangeText={aporte => this.setState({ aporte })} />
            </View>

            <Separador />

            <Text style={[Styles.h2, { marginBottom: 10 }]}>Composição Familiar</Text>

            {/* Data Nascimento */}
            <View style={{ marginBottom: 10 }}>
              <Text style={{ marginBottom: 10 }}>Data de nascimento do cônjuge ou companheiro</Text>
              <TextInputMask type={'custom'} options={{ mask: "99/99/9999" }} keyboardType={"phone-pad"}
                style={Styles.textInput} underlineColorAndroid="transparent"
                value={this.state.nascimentoConjuge} onChangeText={nascimentoConjuge => this.setState({ nascimentoConjuge })} />
            </View>

            {/* Filho Mais Novo */}
            <View style={{ marginBottom: 10 }}>
              <Text style={{ marginBottom: 10 }}>Possui filhos?</Text>
              <DropDown titulo={"Selecione uma opção"} valor={this.state.possuiFilhos}
                itens={[
                  { titulo: "SIM", valor: "S" },
                  { titulo: "NÃO", valor: "N" }
                ]}
                onValueChange={(possuiFilhos) => this.setState({ possuiFilhos })} />
            </View>

            {this.state.possuiFilhos && this.state.possuiFilhos === "S" &&
              <View>
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ marginBottom: 10 }}>Possui filho inválido (portador de necessidades especiais)?</Text>
                  <DropDown titulo={"Selecione uma opção"} valor={this.state.possuiFilhoInvalido}
                    itens={[
                      { titulo: "SIM", valor: "S" },
                      { titulo: "NÃO", valor: "N" }
                    ]}
                    onValueChange={(possuiFilhoInvalido) => this.setState({ possuiFilhoInvalido })} />
                </View>

                {this.state.possuiFilhoInvalido && this.state.possuiFilhoInvalido === "S" &&
                  <View>
                    <View style={{ marginBottom: 10 }}>
                      <Text style={{ marginBottom: 10 }}>Data de nascimento do filho inválido</Text>
                      <TextInputMask type={'custom'} options={{ mask: "99/99/9999" }} keyboardType={"phone-pad"}
                        style={Styles.textInput} underlineColorAndroid="transparent"
                        value={this.state.nascimentoFilhoInvalido} onChangeText={nascimentoFilhoInvalido => this.setState({ nascimentoFilhoInvalido })} />
                    </View>

                    <View style={{ marginBottom: 10 }}>
                      <Text style={{ marginBottom: 10 }}>Sexo do filho inválido</Text>
                      <DropDown titulo={"Selecione o sexo"} valor={this.state.sexoFilhoInvalido}
                        itens={[
                          { titulo: "MASCULINO", valor: "M" },
                          { titulo: "FEMININO", valor: "F" }
                        ]}
                        onValueChange={(sexoFilhoInvalido) => this.setState({ sexoFilhoInvalido })} />
                    </View>
                  </View>
                }

                <View style={{ marginBottom: 10 }}>
                  <Text style={{ marginBottom: 10 }}>Data de nascimento do filho mais novo</Text>
                  <TextInputMask type={'custom'} options={{ mask: "99/99/9999" }} keyboardType={"phone-pad"}
                    style={Styles.textInput} underlineColorAndroid="transparent"
                    value={this.state.nascimentoFilhoMaisNovo} onChangeText={nascimentoFilhoMaisNovo => this.setState({ nascimentoFilhoMaisNovo })} />
                </View>

                <View style={{ marginBottom: 10 }}>
                  <Text style={{ marginBottom: 10 }}>Sexo do filho mais novo</Text>
                  <DropDown titulo={"Selecione o sexo"} valor={this.state.sexoFilhoMaisNovo}
                    itens={[
                      { titulo: "MASCULINO", valor: "M" },
                      { titulo: "FEMININO", valor: "F" }
                    ]}
                    onValueChange={(sexoFilhoMaisNovo) => this.setState({ sexoFilhoMaisNovo })} />
                </View>
              </View>
            }

            <Separador />

            <Text style={[Styles.h2, { marginBottom: 10 }]}>Estamos quase lá!</Text>

            <View style={{ marginBottom: 10 }}>
              <Text style={{ marginBottom: 10 }}>Com quantos anos você pretende se aposentar?</Text>
              <DropDown titulo={"Selecione a idade"} valor={this.state.idadeAposentadoria}
                itens={idadesAposentadoria}
                onValueChange={(idadeAposentadoria) => this.setState({ idadeAposentadoria })} />
            </View>

            <View style={{ marginBottom: 10 }}>
              <Text style={{ marginBottom: 10 }}>Você deseja sacar à vista um percentual do seu saldo de contas na concessão do benefício?</Text>
              <DropDown titulo={"Percentual"} valor={this.state.percentualSaque}
                itens={percentuaisSaque} textoVazio={"NÃO"} valorVazio={0} prefixo={"SIM - "} sufixo={"%"}
                onValueChange={(percentualSaque) => this.setState({ percentualSaque })} />
            </View>

            <View style={{ marginBottom: 10 }}>
              <Text style={{ marginBottom: 10 }}>Com quantos anos você pretende se aposentar?</Text>

            </View>

            <View style={{ marginBottom: 10 }}>
              <Text style={{ marginBottom: 10 }}>Taxa de juros</Text>
              <DropDown titulo={"Selecione uma opção"} valor={this.state.taxaJuros}
                itens={[
                  { titulo: "4", valor: 4 },
                  { titulo: "4,23", valor: 4.23 },
                  { titulo: "4,50", valor: 4.50 },
                  { titulo: "5,00", valor: 5.00 },
                  { titulo: "5,50", valor: 5.50 }
                ]}
                sufixo={"%"}
                onValueChange={(taxaJuros) => this.setState({ taxaJuros })} />
            </View>

            <Text style={[Styles.h3, { color: Variables.colors.secondary }]}>Dados válidos somente para essa simulação!</Text>

            <Button title={"Próximo"} style={{ marginTop: 10 }}
              onClick={this.simular} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}