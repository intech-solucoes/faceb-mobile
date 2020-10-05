import React from "react";
import { Text, ScrollView, View } from "react-native";
import { Variables } from "../../styles";

import { CalendarioService } from "@intechprev/advanced-service";

const config = require("../../config.json");
const calendarioService = new CalendarioService(config);

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

    state = {
        calendario: []
    }

    componentDidMount = async () => {
        try {
            var result = await calendarioService.BuscarPorPlano("1");
            await this.setState({ calendario: result.data });
        } catch (err) {
            if (err.response) {
                console.warn(err.response.data);
            } else {
                console.warn(err);
            }
        }
    }

    render() {
        return (
            <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
                <Text style={{ marginBottom: 20 }}>
                    Confira abaixo a data em que estará disponível o pagamento das aposentadorias e pensões em 2020.
                </Text>

                {this.state.calendario.map((mes, index) => {
                    return <Item key={index} mes={mes.DES_MES} dia={mes.NUM_DIA} />;
                })}

            </ScrollView>
        );
    }
}