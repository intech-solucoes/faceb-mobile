import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, Text, View, Image, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation';

import styles from './SideMenu.style';
import { Variables } from '../../styles';

const MenuItem = (props) => {
    return (
        <TouchableHighlight onPress={props.onPress} underlayColor={Variables.colors.gray}>
            <View style={styles.navItemStyle}>
                <Image source={props.icon} style={styles.navIcon} />
                <Text style={styles.navText}>
                    {props.title}
                </Text>
            </View>
        </TouchableHighlight>
    );
}

class SideMenu extends Component {
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.header}>
                        <Image source={require("../../assets/facebNegativa.png")} style={styles.headerImage} />
                    </View>

                    <View style={styles.navSectionStyle}>

                        <MenuItem onPress={this.navigateToScreen('Home')} icon={require("../../assets/ic_home.png")} title="Início" />
                        <MenuItem onPress={this.navigateToScreen('Dados')} icon={require("../../assets/ic_dados.png")} title="Seus Dados" />
                        <MenuItem onPress={this.navigateToScreen('Contribuicao')} icon={require("../../assets/ic_contribuicao.png")} title="Sua Contribuição" />
                        <MenuItem onPress={this.navigateToScreen('Saldo')} icon={require("../../assets/ic_saldo.png")} title="Seu Saldo" />
                        <MenuItem onPress={this.navigateToScreen('Contracheque')} icon={require("../../assets/ic_contracheque.png")} title="Contracheque" />

                    </View>
                </ScrollView>

                <View style={styles.footerContainer}>
                    <Text>Versão 0.0.1</Text>
                </View>
            </View>
        );
    }
}

SideMenu.propTypes = {
    navigation: PropTypes.object
};

export default SideMenu;