import React, { Component } from 'react';
import moment from 'moment';
import { Text, View, ScrollView, AsyncStorage } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { TextMask } from "react-native-masked-text";
import _ from 'lodash'

import Styles, { Variables } from "../styles";
import { CampoEstatico } from "../components";
import Separador from '../components/Separador';

import { FichaFinancAssistidoEntidade, ResumoContrachequeEntidade } from '../entidades';
import { FichaFinancAssistidoService } from '../services';

interface Props {
  navigation?: any;
}

interface State {
  loading: boolean;
  plano: number;
  contracheque: Array<FichaFinancAssistidoEntidade>;
  resumo: ResumoContrachequeEntidade;
  rendimentos: Array<FichaFinancAssistidoEntidade>;
  descontos: Array<FichaFinancAssistidoEntidade>;
  referencia: Date;
}

export default class ContrachequeDetalheScreen extends Component<Props, State> {

  static navigationOptions = {
    title: "Contracheque",
    rightMenu: true
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      plano: 0,
      contracheque: new Array<FichaFinancAssistidoEntidade>(),
      resumo: new ResumoContrachequeEntidade(),
      rendimentos: new Array<FichaFinancAssistidoEntidade>(),
      descontos: new Array<FichaFinancAssistidoEntidade>(),
      referencia: null
    }
  }

  async componentDidMount() {
    await this.setState({ loading: true });

    await this.carregarPlano();
    await this.carregarContracheque();

    await this.setState({ loading: false });
  }

  async carregarPlano() {
    var plano = await AsyncStorage.getItem("plano");
    await this.setState({ plano: parseInt(plano, 10) });
  }

  async carregarContracheque() {
    var SqProcesso = this.props.navigation.getParam("SqProcesso", "0");
    var Referencia = this.props.navigation.getParam("Referencia", "0");
    var result = await FichaFinancAssistidoService.BuscarPorProcessoReferencia(SqProcesso, moment(Referencia, "DD/MM/YYYY").format("DD.MM.YYYY"));

    var contracheque = result.Rubricas;
    var referencia = result.Resumo.Referencia;
    var rendimentos = result.Proventos;
    var descontos = result.Descontos;

    await this.setState({
      contracheque,
      rendimentos,
      descontos,
      referencia,
      resumo: result.Resumo
    });
  }

  render() {
    return (

      <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
        <Spinner visible={this.state.loading} cancelable={true} />

        {!this.state.loading && this.state.resumo.Bruto && <View>
          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <View style={{ alignItems: 'center', flexDirection: "row" }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text>BRUTO</Text>
                <TextMask type={'money'} value={this.state.resumo.Bruto.toString()} style={{ color: Variables.colors.primary }} />
              </View>

              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text>DESCONTOS</Text>
                <TextMask type={'money'} value={this.state.resumo.Descontos.toString()} style={{ color: Variables.colors.red }} />
              </View>

              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text>LÍQUIDO</Text>
                <TextMask type={'money'} value={this.state.resumo.Liquido.toString()} style={{ color: Variables.colors.blue }} />
              </View>
            </View>
          </View>

          <View>
            <CampoEstatico titulo={"Referência"} valor={this.state.referencia} />
          </View>

          <Separador />

          <View>
            <Text style={[Styles.h2, { color: Variables.colors.primary, marginBottom: 10 }]}>
              RENDIMENTOS
            </Text>

            {this.state.rendimentos.map((rubrica, index) => {
              return <CampoEstatico key={index} titulo={rubrica.DS_RUBRICA} tipo={"dinheiro"} valor={rubrica.VL_CALCULO} style={{ marginBottom: 0 }} />;
            })}
          </View>

          <Separador />

          <View style={{ marginBottom: 10 }}>
            <Text style={[Styles.h2, { color: Variables.colors.red, marginBottom: 10 }]}>
              DESCONTOS
                        </Text>

            {this.state.descontos.map((rubrica, index) => {
              return <CampoEstatico key={index} titulo={rubrica.DS_RUBRICA} tipo={"dinheiro"} valor={rubrica.VL_CALCULO} style={{ marginBottom: 0 }} />;
            })}
          </View>

        </View>}
      </ScrollView>
    );
  }
};
