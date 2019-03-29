import React from "react";
import { Text, ScrollView, View, Image, Dimensions } from "react-native";

import Styles from "../../styles";
import Separador from "../../components/Separador";

const deviceWidth = Dimensions.get('window').width;

export class PlanoCDScreen extends React.Component {

    static navigationOptions = {
        title: "Plano CEBPREV BD",
        rightMenu: false
    }

    render() {
        return (
            <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>

                <Text style={Styles.h1}>INSCRIÇÃO DE PARTICIPANTE CEBPREV</Text>
                
                <Text style={{ marginTop: 20 }}>
                    Podem solicitar sua inscrição no Plano de Previdência CEBPREV os empregados das patrocinadoras, dirigentes, ocupantes de Emprego em 
                    Comissão e os requisitados ocupantes de Função Gratificada.
                </Text>
                
                <Text style={{ marginTop: 20 }}>
                    A inscrição de Participante no Plano é feita mediante requerimento escrito, em modelo impresso a ser fornecido pela FACEB, 
                    para devida conferência e homologação da inscrição, bem como emissão e envio do Certificado de Participante.
                </Text>

                <Text style={{ marginTop: 20 }}>
                    O interessado deve informar no ato da inscrição seus dados pessoais e de seus beneficiários (RG, CPF e data de nascimento), 
                    além dos seus dados bancários, endereço, telefones e e-mail.
                </Text>

                <Text style={{ marginTop: 20 }}>
                    A inscrição pode ser solicitada pelo interessado por telefone, por e-mail (previdencia@faceb.com.br), diretamente na FACEB.
                </Text>

                <Text style={{ marginTop: 20 }}>
                    Mais esclarecimentos sobre o Plano ou sobre a inscrição podem ser obtidos pelos telefones (61) 3312-0264, 3312-0262 ou 3312-0263 
                    (Gerência de Previdência FACEB). Abaixo, outras informações importantes.
                </Text>

                <Separador />

                <Text style={Styles.h1}>QUEM PODE SE INSCREVER</Text>

                <Text style={{ marginTop: 20 }}>
                    O Plano de Benefícios CEBPREV, instituído na modalidade de contribuição definida (CD), é oferecido aos novos empregados da 
                    Companhia Energética de Brasília – CEB (Holding) e demais Patrocinadoras que firmarem Convênio de Adesão.
                </Text>

                <Separador />

                <Text style={Styles.h1}>CONCEITO</Text>

                <Text style={{ marginTop: 20 }}>
                    O Plano é constituído na modalidade de contribuição definida, onde os benefícios e pecúlios, inclusive para eventos não previsíveis, 
                    como invalidez e morte, estão vinculados ao volume de contribuições acumuladas em nome do participante, sem coberturas adicionais.
                </Text>

                <Text style={{ marginTop: 20 }}>
                    {'\u2022'+ ' Contribuições Básicas de 5%, 6%, 7%, 8%, 9% e 10%, efetuadas pelo participante com paridade da Patrocinadora;\n'}
                    {'\u2022'+ ' Contribuições de 0,1% de Taxa Administrativa com paridade da patrocinadora;\n'}
                    {'\u2022'+ ' Contribuições adicionais facultativas (mensal) ou esporádicas (eventual) a critério do participante e sem paridade da patrocinadora;\n'}
                    {'\u2022'+ ' Contribuições e Reservas convertidas em cotas que refletem o volume e a rentabilidade dos investimentos;\n'}
                    {'\u2022'+ ' Ausência de Custos adicionais para cobertura de benefícios de risco por morte e invalidez;\n'}
                    {'\u2022'+ ' Idade mínima de 55 anos para aposentadoria normal e 50 anos para aposentadoria antecipada (ou 48 anos, se aposentado pela Previdência Social), sendo necessário para qualquer uma das hipóteses, 10 anos de filiação ao Plano;\n'}
                    {'\u2022'+ ' Aposentadoria sem os valores vinculados aos benefícios oferecidos pelo INSS;\n'}
                    {'\u2022'+ ' Aposentadorias vinculadas ao volume de recursos acumulados, à expectativa de vida do participante, ao valor da cota e à importância segurada (quando houver);\n'}
                    {'\u2022'+ ' Recálculo Anual das aposentadorias, respeitando os critérios mencionados acima.\n'}
                </Text>

                <Separador />

                <Text style={Styles.h1}>BENEFÍCIOS</Text>

                <Text style={{ marginTop: 20 }}>
                    {'\u2022'+ ' Suplementação de aposentadoria;\n'}
                    {'\u2022'+ ' Suplementação de aposentadoria antecipada;\n'}
                    {'\u2022'+ ' Suplementação de aposentadoria por invalidez;\n'}
                    {'\u2022'+ ' Suplementação de pensão por morte;\n'}
                    {'\u2022'+ ' Abono anual.\n'}
                </Text>

                <Separador />

                <Text style={Styles.h1}>INSTITUTOS</Text>

                <View style={{ marginTop: 20 }}>
                    <Text><Text style={{ fontWeight: "bold" }}>Autopatrocínio:</Text> Opção por continuar contribuindo, arcando com as suas contribuições e as da patrocinadora.{'\n'}</Text>
                    <Text><Text style={{ fontWeight: "bold" }}>Benefício Proporcional Diferido – BPD:</Text> Opção por não contribuir e receber benefício proporcional quando do cumprimento das carências.{'\n'}</Text>
                    <Text><Text style={{ fontWeight: "bold" }}>Portabilidade:</Text> Opção de transferir sua reserva matemática para outra entidade de previdência complementar ou seguradora.{'\n'}</Text>
                    <Text><Text style={{ fontWeight: "bold" }}>Resgate de contribuições:</Text> corresponde ao pagamento único efetuado em função do volume de recursos acumulados no Fundo Individual e percentual do Fundo Patrocinado, em função do tempo de vínculo à FACEB, conforme tabela:{'\n'}</Text>

                    <Image source={require("../../assets/tabela.png")} style={{ marginTop: 10, width: 320, height: 95 }} />
                </View>

                <Separador />

                <Text style={Styles.h1}>BENEFÍCIOS FISCAIS</Text>

                <Text style={{ marginTop: 20 }}>
                    As contribuições básicas e adicionais efetuadas pelo participante no Plano CEBPREV serão deduzidas da base de cálculo do Imposto de Renda.
                </Text>
            </ScrollView>
        );
    }
}