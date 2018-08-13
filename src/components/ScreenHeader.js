import React, { Component } from 'react';
import { Text, View, Platform, StatusBar, StyleSheet, ToolbarAndroid } from "react-native";
import { Variables } from "../styles";
import Icon from 'react-native-vector-icons/Ionicons'

export default class ScreenHeader extends Component {
    render() {
        var routeIndex = this.props.navigation.state.index;
        var route = this.props.navigation.state.routes[routeIndex];
        const { descriptors } = this.props;
        const descriptor = descriptors[route.key];

        var openDrawer = routeIndex === 0;

        const onLeftPress = () => {
            if(openDrawer)
                this.props.navigation.openDrawer();
            else
                this.props.navigation.pop();
        }

        return (
            
            <View>
                { Platform.OS === 'android' && Platform.Version >= 20 ?
                    <View style={{ height: 24, backgroundColor: Variables.colors.primary }} />
                    : null }
                <Icon.ToolbarAndroid
                    navIconName={openDrawer ? 'md-menu': 'md-arrow-back'}
                    onIconClicked={onLeftPress}
                    style={{ height: 56, backgroundColor: Variables.colors.primary}}
                    titleColor={'white'}
                    title={descriptor.options.title} />
                <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.20)" animated />
            </View>
            
        );
    }
};
