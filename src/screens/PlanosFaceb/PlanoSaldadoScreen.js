import React from "react";
import { Text, ScrollView, View, Image, Dimensions } from "react-native";

import Styles from "../../styles";
import Separador from "../../components/Separador";

const deviceWidth = Dimensions.get("window").width;

export class PlanoSaldadoScreen extends React.Component {
  static navigationOptions = {
    title: "Plano CEBPREV BD",
    rightMenu: false,
  };

  render() {
    return (
      <ScrollView
        style={Styles.scrollContainer}
        contentContainerStyle={Styles.scrollContainerContent}
      >
        <Text style={Styles.h1}>PLANO FACEB SALDADO</Text>

        <Text style={{ marginTop: 20 }}>
          FACEB-SALDADO: é o plano de benefícios previdenciais da FACEB
          estruturado na modalidade de Benefício Definido, decorrente do
          saldamento do Plano Complementar de Benefícios da FACEB.
        </Text>

        <Text style={{ marginTop: 20 }}>
          O Plano recepcionou os Participantes e Assistidos, com seus direitos e
          obrigações que optaram expressa e voluntariamente pela migração até
          30/06/2020 e fechado ao ingresso de novos Participantes.
        </Text>

        <Separador />

        <Text style={Styles.h1}>BENEFÍCIOS </Text>

        <Text style={{ marginTop: 20 }}>
          As informações relativas a este item constam do Capítulo VI – DOS
          BENEFÍCIOS SALDADOS.
        </Text>

        <Text style={{ marginTop: 20 }}>
          Os benefícios assegurados pelo Plano FACEB-SALDADO são:
        </Text>

        <Text style={{ marginTop: 20 }}>
          {"\u2022" + " Benefício Saldado de Aposentadoria Programada\n"}
          {"\u2022" + " Benefício Saldado de Pensão por Morte\n"}
          {"\u2022" + " Benefício Saldado por Invalidez\n"}
        </Text>

        <Separador />

        <Text style={Styles.h1}>INSTITUTOS</Text>

        <Text style={{ marginTop: 20 }}>
          Os institutos assegurados pelo Regulamento deste Plano constam no
          Capítulo V – DAS CONDIÇÕES ESPECIAIS DE PARTICIPAÇÃO, e são os
          seguintes:
        </Text>

        <Text style={{ marginTop: 20 }}>
          {"\u2022" + " Autopatrocínio;\n"}
          {"\u2022" + " Benefício Proporcional Diferido;\n"}
          {"\u2022" + " Resgate dos Valores Vertidos ao Plano;\n"}
          {"\u2022" + " Portabilidade.\n"}
        </Text>

        <Separador />

        <Text style={Styles.h1}>REGULAMENTO</Text>

        <Text style={{ marginTop: 20 }}>
          O Regulamento do Plano FACEB Saldado foi aprovado pela Previc em 17/03/2020.
        </Text>
      </ScrollView>
    );
  }
}
