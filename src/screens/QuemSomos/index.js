import React from "react";
import { Text, ScrollView } from "react-native";

import Styles from "../../styles";

export class QuemSomosScreen extends React.Component {
  static navigationOptions = {
    title: "Quem Somos",
    rightMenu: false,
  };

  render() {
    return (
      <ScrollView
        style={Styles.scrollContainer}
        contentContainerStyle={Styles.scrollContainerContent}
      >
        <Text style={Styles.h1}>Apresentação</Text>

        <Text style={{ marginTop: 20 }}>
          A FACEB é uma Entidade Fechada de Previdência Complementar – EFPC
          criada em 1976, pela Companhia Energética de Brasília – CEB
          (Patrocinadora), para oferecer aos seus empregados planos de
          benefícios de natureza previdenciária. Atualmente, os planos
          administrados pela FACEB são acessíveis exclusivamente aos empregados
          do Grupo CEB (CEB Holding, CEB Distribuição S/A, CEB Lajeado S/A, CEB
          Participações S/A e CEB Geração S/A) e a própria FACEB, que também é
          patrocinadora.{"\n"}
          {"\n"}A Fundação administra três Planos de Previdência ● Plano
          Complementar de Benefícios Previdenciais, instituído na modalidade
          Benefício Definido – Plano BD (fechado para novas adesões); ● Plano
          CEBPREV instituído na modalidade Contribuição Definida – Plano CD
          (aberto para adesões) e ● o Plano FACEB-Saldado na modalidade de
          Benefício Definido (fechado para novas adesões), e está regida pela
          Superintendência Nacional de Previdência Complementar – Previc, órgão
          de fiscalização e supervisão.{"\n"}
          {"\n"}A FACEB é também uma Operadora de Plano de Saúde, com registro
          definitivo concedido pela Agência Nacional de Saúde Suplementar – ANS,
          desde fevereiro de 2014. Administra três Planos de Saúde do
          Patrocinador – Plano CEB Saúde Vida, Plano FACEB Saúde Vida e Plano
          FACEB Família.
        </Text>
      </ScrollView>
    );
  }
}
