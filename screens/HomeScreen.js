import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Image, ScrollView } from "react-native";
import Styles, { Variables } from "../styles";
import ScreenHeader from "../components/ScreenHeader";

const MenuItem = (props) => {
    return (
        <TouchableHighlight onPress={() => {}} style={styles.menuItemContainer} underlayColor={Variables.colors.gray}>
            <View style={styles.menuItemInner}>
                <Image source={props.icon} style={styles.menuItemIcon} />

                <View>
                    <Text style={Styles.h1}>{props.title}</Text>
                    <Text>{props.subtitle}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
}

export default class HomeScreen extends Component {
    render() {
        return (
            <View>
                <ScreenHeader title={"Faceb"} />

                <ScrollView style={{padding: 20, paddingBottom: 400}}>
                    <MenuItem title={"Dados Pessoais"} subtitle={"Confira seus dados cadastrais"} icon={require("../assets/ic_dados.png")} />
                    <MenuItem title={"Sua Contribuição"} subtitle={"Visualize e entenda sua contribuição"} icon={require("../assets/ic_contribuicao.png")} />
                    <MenuItem title={"Sua Contribuição"} subtitle={"Visualize e entenda sua contribuição"} icon={require("../assets/ic_contribuicao.png")} />
                    <MenuItem title={"Sua Contribuição"} subtitle={"Visualize e entenda sua contribuição"} icon={require("../assets/ic_contribuicao.png")} />
                    <MenuItem title={"Sua Contribuição"} subtitle={"Visualize e entenda sua contribuição"} icon={require("../assets/ic_contribuicao.png")} />
                    <MenuItem title={"Sua Contribuição"} subtitle={"Visualize e entenda sua contribuição"} icon={require("../assets/ic_contribuicao.png")} />
                    <MenuItem title={"Sua Contribuição"} subtitle={"Visualize e entenda sua contribuição"} icon={require("../assets/ic_contribuicao.png")} />
                    <MenuItem title={"Sua Contribuição"} subtitle={"Visualize e entenda sua contribuição"} icon={require("../assets/ic_contribuicao.png")} />
                    <MenuItem title={"Sua Contribuição"} subtitle={"Visualize e entenda sua contribuição"} icon={require("../assets/ic_contribuicao.png")} />
                    <MenuItem title={"Sua Contribuição"} subtitle={"Visualize e entenda sua contribuição"} icon={require("../assets/ic_contribuicao.png")} />
                    <MenuItem title={"Sua Contribuição"} subtitle={"Visualize e entenda sua contribuição"} icon={require("../assets/ic_contribuicao.png")} />
                    <MenuItem title={"Sua Contribuição"} subtitle={"Visualize e entenda sua contribuição"} icon={require("../assets/ic_contribuicao.png")} />
                    <MenuItem title={"Sua Contribuição"} subtitle={"Visualize e entenda sua contribuição"} icon={require("../assets/ic_contribuicao.png")} />
                </ScrollView>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
    menuItemContainer: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
    menuItemInner: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    menuItemIcon: {
        marginRight: 10
    }
});