import React from "react";
import { Text, View, Image, ScrollView, TouchableHighlight } from "react-native";
import { Icon } from 'native-base';
import { Constants } from 'expo';

import Styles, { Variables } from "../../styles";

const styles = {
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    headerContent: {
        padding: 50,
        alignItems: "center"
    },
    logo: {
        width: 250,
        height: 70
    },
    menuItemContainer: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        marginBottom: 10,
        backgroundColor: "#FFF"
    },
    menuItemInner: {
        flexDirection: 'row'
    },
    menuItemIconContainer: {
        justifyContent: 'center', 
        alignItems: 'center'
    },
    menuItemIcon: {
        marginLeft: 10,
        marginRight: 20,
        color: Variables.colors.primary
    },
    menuItemContent: {
        flex: 1
    },
    menuItemContentTitle: {
        flex: 1
    },
    menuItemContentSubtitle: {
        flex: 2
    }
}

const MenuItem = (props) => {
    return (
        <TouchableHighlight onPress={props.onPress} style={styles.menuItemContainer} underlayColor={Variables.colors.gray}>
            <View style={styles.menuItemInner}>
                <View style={styles.menuItemIconContainer}>
                    <Icon name={props.icon} style={styles.menuItemIcon} /> 
                </View>

                <View style={styles.menuItemContent}>
                    <Text style={[Styles.h1, styles.menuItemContentTitle]}>{props.title}</Text>
                    <Text style={styles.menuItemContentSubtitle}>{props.subtitle}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
}

export class LandingPageScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    navigateToScreen = (route) => () => {
        this.props.navigation.navigate(route);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={Styles.scrollContainer} contentContainerStyle={Styles.scrollContainerContent}>
                    <View style={styles.headerContent}>
                        <Image source={require("../../assets/faceb.png")} style={styles.logo} resizeMode="contain" />
                    </View>

                    <MenuItem title={"Notícias"} subtitle={"Leia as últimas notícias sobre Previdência na FACEB"} icon={"md-paper"} onPress={this.navigateToScreen("Noticias")} />
                    <MenuItem title={"Planeje Sua Aposentadoria"} subtitle={"Simule aqui a sua aposentadoria"} icon={"md-rose"} onPress={this.navigateToScreen("SimuladorNaoParticipantes")} />
                    <MenuItem title={"Calendário de Pagamentos"} subtitle={"Confira a data de pagamento das aposentadorias e pensões em 2019"} icon={"md-calendar"} onPress={this.navigateToScreen("Calendario")} />
                    <MenuItem title={"Área Restrita"} subtitle={"Destinado à aposentados, pensionistas e participantes"} icon={"md-unlock"} onPress={this.navigateToScreen("Login")} />
                    <MenuItem title={"Quem Somos"} subtitle={"Uma breve apresentação da FACEB"} icon={"star"} onPress={this.navigateToScreen("QuemSomos")} />
                    <MenuItem title={"Planos"} subtitle={"Conheça aqui nossos planos"} icon={"ios-journal"} onPress={this.navigateToScreen("PlanosFaceb")} />
                    <MenuItem title={"Contato"} subtitle={"Entre em contato com a Faceb"} icon={"ios-chatboxes"} onPress={this.navigateToScreen("Contato")} />

                    <Text style={{ marginVertical: 10, padding: 5, textAlign:"center", color: "#AAA" }}>
                        Versão {Constants.manifest.version}
                    </Text>
                </ScrollView>
            </View>
        );
    }
}