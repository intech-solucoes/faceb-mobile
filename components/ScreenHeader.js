import React, { Component } from 'react';
import { Text, View, Platform, StatusBar, StyleSheet, ToolbarAndroid } from "react-native";
import { Variables } from "../styles";

export default class ScreenHeader extends Component {
    render() {
        return (
            <View>
                { Platform.OS === 'android' && Platform.Version >= 20 ?
                    <View
                    style={{
                        height: 24,
                        backgroundColor: Variables.colors.primary,
                    }}
                    />
                    : null }
                <ToolbarAndroid
                    style={{
                        height: 56,
                        backgroundColor: Variables.colors.primary,
                        elevation: 4,
                    }}
                    titleColor="white"
                    title={this.props.title}
                />
                <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.20)" animated />
            </View>
        );
    }
};
