import React, { Component } from 'react';
import moment from 'moment';
import { Text, View, StyleSheet, FlatList, TouchableHighlight, AsyncStorage } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { TextMask } from "react-native-masked-text";

import Styles, { Variables } from "../styles";
import { ElevatedView, Button } from "../components";

import { FichaFinancAssistidoService, ProcessoBeneficioService } from '../services';
import { ContrachequeEntidade, FichaFinancAssistidoEntidade } from '../entidades';

interface Props {
  navigation?: any;
}

interface State {
  loading: boolean;
  plano: number;
  contracheques: Array<FichaFinancAssistidoEntidade>;
  contrachequeSelecionado: ContrachequeEntidade;
}

export default class ContrachequeScreen extends Component<Props, State> {

  static navigationOptions = {
    title: "Contracheque",
    rightMenu: true
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      plano: 0,
      contracheques: new Array<FichaFinancAssistidoEntidade>(),
      contrachequeSelecionado: new ContrachequeEntidade()
    }
  }

  async componentDidMount() {
    await this.setState({ loading: true });

    await this.carregarPlano();
    await this.carregarContracheques();
    await this.carregarContracheque(this.state.contracheques[0].SQ_PROCESSO, this.state.contracheques[0].DT_REFERENCIA);

    await this.setState({ loading: false });
  }

  async carregarPlano() {
    var plano = await AsyncStorage.getItem("plano");
    await this.setState({ plano: parseInt(plano, 10) });
  }

  async carregarContracheques() {
    const processos = await ProcessoBeneficioService.BuscarPorCpf();
    var result = await FichaFinancAssistidoService.BuscarDatasPorProcesso(processos[0].SQ_PROCESSO);
    await this.setState({ contracheques: result });
  }

  async carregarContracheque(SqProcesso: number, DataReferencia: Date) {
    var result = await FichaFinancAssistidoService.BuscarPorProcessoReferencia(SqProcesso, moment(DataReferencia, "DD/MM/YYYY").format("DD.MM.YYYY"));
    await this.setState({ contrachequeSelecionado: result });
  }

  render() {
    return (
      <View>
        <Spinner visible={this.state.loading} cancelable={true} />

        {!this.state.loading && this.state.contrachequeSelecionado.Resumo && <View>

          <ElevatedView elevation={3} style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Text style={[Styles.h2, { marginBottom: 10 }]}>
              CONTRACHEQUE DE {this.state.contrachequeSelecionado.Resumo.Referencia}
            </Text>

            <View style={{ alignItems: 'center', flexDirection: "row" }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text>BRUTO</Text>
                <TextMask type={'money'} value={this.state.contrachequeSelecionado.Resumo.Bruto.toString()} style={{ color: Variables.colors.primary }} />
              </View>

              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text>DESCONTOS</Text>
                <TextMask type={'money'} value={this.state.contrachequeSelecionado.Resumo.Descontos.toString()} style={{ color: Variables.colors.red }} />
              </View>

              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text>LÍQUIDO</Text>
                <TextMask type={'money'} value={this.state.contrachequeSelecionado.Resumo.Liquido.toString()} style={{ color: Variables.colors.blue }} />
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <Button title="Detalhar" style={{ width: 300 }} onClick={() => this.props.navigation.navigate("ContrachequeDetalhe", {
                SqProcesso: this.state.contrachequeSelecionado.Proventos[0].SQ_PROCESSO,
                Referencia: this.state.contrachequeSelecionado.Proventos[0].DT_REFERENCIA
              })} />
            </View>
          </ElevatedView>

          <View>
            <FlatList data={this.state.contracheques}
              renderItem={
                ({ item }) => (
                  <TouchableHighlight
                    style={styles.rowContainer} underlayColor={Variables.colors.gray}
                    onPress={() => this.carregarContracheque(item.SQ_PROCESSO, item.DT_REFERENCIA)}>
                    <Text>{item.DT_REFERENCIA}</Text>
                  </TouchableHighlight>
                )
              }
              keyExtractor={(item, index) => index.toString()} />
          </View>

        </View>}
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