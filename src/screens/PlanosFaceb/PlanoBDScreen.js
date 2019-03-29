import React from "react";
import { Text, ScrollView, View } from "react-native";

import Styles from "../../styles";
import Separador from "../../components/Separador";

export class PlanoBDScreen extends React.Component {

    static navigationOptions = {
        title: "Plano Faceb BD",
        rightMenu: false
    }

    render() {
        return (
            <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
                <Text>
                    O Plano Complementar de Benefícios Previdenciais da FACEB é instituído na modalidade de Benefício Definido – BD, onde o volume de contribuições, dos Participantes e Patrocinadoras, 
                    asseguram uma suplementação calculada em função do SRB do participante no momento da aposentadoria, de acordo com as disposições regulamentares. O equilíbrio atuarial do 
                    plano é fundamentado no mutualismo e na solidariedade entre os seus participantes.
                </Text>
                
                <Text style={{ marginTop: 20 }}>
                    São patrocinadoras do Plano a Companhia Energética de Brasília – CEB (patrocinadora principal), a própria FACEB e outras pessoas jurídicas que venham a ser admitidas nesta categoria, 
                    celebrando convênios de adesão a este Plano de Benefícios, previamente aprovados pelos órgãos competentes de sua administração e governamentais, 
                    mediante autorização da patrocinadora principal.
                </Text>

                <Text style={{ marginTop: 20 }}>
                    O Plano é oferecido somente aos participantes que foram admitidos nas Patrocinadoras até 31/12/2005. Sua última alteração foi aprovada pela Superintendência Nacional de 
                    Previdência Complementar – PREVIC/ Ministério da Previdência Social – MPS, por meio da Portaria nº 672, de 02/12/2011, publicada em 05/12/2011 no Diário Oficial da União, 
                    Seção 1, Página 89, e por deliberação do Conselho Deliberativo da FACEB, em sua 182ª Reunião Extraordinária, realizada em 21/06/2011, que tratou do estabelecimento definitivo do SRC, 
                    entre diversas outras alterações.
                </Text>

                <Separador />

                <Text style={Styles.h1}>BENEFÍCIOS</Text>

                <Text style={{ marginTop: 20 }}>
                    As informações relativas a este item constam da Seção IX – SUPLEMENTAÇÃO DE APOSENTADORIA POR INVALIDEZ, à Seção XIX – PECÚLIO POR MORTE, do Regulamento.
                </Text>

                <Text style={{ marginTop: 20 }}>
                    Os Benefícios assegurados por este Plano BD são:
                </Text>

                <Text style={{ marginTop: 20 }}>
                    {'\u2022'+ ' Suplementação de aposentadoria por tempo de contribuição;\n'}
                    {'\u2022'+ ' Suplementação de aposentadoria por invalidez;\n'}
                    {'\u2022'+ ' Suplementação de aposentadoria por idade;\n'}
                    {'\u2022'+ ' Suplementação de aposentadoria especial;\n'}
                    {'\u2022'+ ' Suplementação de auxílio-doença;\n'}
                    {'\u2022'+ ' Suplementação do abono-anual;\n'}
                    {'\u2022'+ ' Suplementação de pensão;\n'}
                    {'\u2022'+ ' Suplementação de auxílio-reclusão;\n'}
                    {'\u2022'+ ' Resgate do pecúlio especial;\n'}
                    {'\u2022'+ ' Auxílio-funeral;\n'}
                    {'\u2022'+ ' Pecúlio por morte.\n'}
                </Text>

                <Separador />

                <Text style={Styles.h1}>INSTITUTOS</Text>

                <Text style={{ marginTop: 20 }}>
                    Os institutos assegurados pelo Regulamento deste Plano constam na Seção XX – DOS INSTITUTOS OBRIGATÓRIOS, e são os seguintes:
                </Text>

                <Text style={{ marginTop: 20 }}>
                    {'\u2022'+ ' Autopatrocínio;\n'}
                    {'\u2022'+ ' Benefício Proporcional Diferido;\n'}
                    {'\u2022'+ ' Portabilidade;\n'}
                    {'\u2022'+ ' Resgate.\n'}
                </Text>

                <Separador />

                <Text style={Styles.h1}>REGULAMENTO</Text>

                <Text style={{ marginTop: 20 }}>
                    O Regulamento do Plano Complementar de Benefícios Previdenciais da FACEB foi aprovado inicialmente na 1.068ª reunião da Diretoria Colegiada da 
                    Companhia de Eletricidade de Brasília – CEB, realizada em 03/01/1992.
                </Text>

                <Text style={{ marginTop: 20 }}>
                    Sua última alteração foi aprovada pela Superintendência Nacional de Previdência Complementar – PREVIC/ Ministério da Previdência Social – MPS, 
                    por meio da Portaria nº 672, de 02/12/2011, publicada em 05/12/2011 no Diário Oficial da União, Seção 1, Página 89, e por deliberação do Conselho 
                    Deliberativo da FACEB, em sua 182ª Reunião Extraordinária, realizada em 21/06/2011, que tratou do estabelecimento definitivo do SRC, entre diversas outras alterações.
                </Text>
            </ScrollView>
        );
    }
}