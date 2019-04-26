import React from "react";
import { Text, ScrollView } from "react-native";

import Styles from "../../styles";

export class ContatoScreen extends React.Component {

    static navigationOptions = {
        title: "Contato",
        rightMenu: false
    }

    render() {
        return (
            <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
            <Text style={Styles.h1}>Previdência</Text>

                <Text style={{ marginTop: 20 }}>
                    <Text style={{ fontWeight: "bold" }}>TELEFONE:</Text> (61) 3312-0201 (opção 2){'\n'}
                    <Text style={{ fontWeight: "bold" }}>* Atendimento telefônico 24h por dia para assuntos de saúde. </Text>
                </Text>
                
                <Text style={{ marginTop: 20 }}>
                    <Text style={{ fontWeight: "bold" }}>HORÁRIO DE ATENDIMENTO PRESENCIAL</Text>{'\n'}
                    De segunda a sexta-feira, das 8h às 17h
                </Text>
                
                <Text style={{ marginTop: 20 }}>
                    <Text style={{ fontWeight: "bold" }}>ENDEREÇO</Text>{'\n'}
                    SCS Quadra 4, Bloco A, Lotes 141/ 153{'\n'}
                    Ed. FACEB,  6º andar, CEP: 70304-905,{'\n'}
                    Asa Sul – Brasília/ DF{'\n'}
                </Text>
            </ScrollView>
        );
    }
}