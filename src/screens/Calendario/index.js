import React from "react";
import { Text, ScrollView, View } from "react-native";
import { Variables } from "../../styles";

const Item = (props) => {
    return (
        <View style={{ flexDirection: "row", padding: 10, borderColor: "#CCC", borderWidth: 1, marginVertical: 5 }}>
            <Text style={{ flex: 1, fontSize: 16, color: Variables.colors.secondary }}>{props.mes}</Text>
            <Text style={{ flex: 1, fontSize: 16, color: Variables.colors.primary, textAlign: "right" }}>{props.dia}</Text>
        </View>
    );
}

export class CalendarioScreen extends React.Component {

    static navigationOptions = {
        title: "Calendário",
        rightMenu: false
    }

    render() {
        return (
            <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
                <Text style={{ marginBottom: 20 }}>
                    Confira abaixo a data em que estará disponível o pagamento das aposentadorias e pensões em 2019.
                </Text>

                <Item mes="Janeiro" dia={25} />
                <Item mes="Fevereiro" dia={28} />
                <Item mes="Março" dia={29} />
                <Item mes="Abril" dia={30} />
                <Item mes="Maio" dia={31} />
                <Item mes="Junho" dia={28} />
                <Item mes="Julho" dia={31} />
                <Item mes="Agosto" dia={30} />
                <Item mes="Setembro" dia={27} />
                <Item mes="Outubro" dia={31} />
                <Item mes="Novembro" dia={29} />
                <Item mes="Dezembro" dia={20} />
                <Item mes="13º" dia={20} />
                
            </ScrollView>
        );
    }
}