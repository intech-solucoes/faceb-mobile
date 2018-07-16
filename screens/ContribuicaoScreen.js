import React, { Component } from 'react';
import { Text, View, Platform, StatusBar, StyleSheet, ToolbarAndroid } from "react-native";
import { Variables } from "../styles";

export default class ContribuicaoScreen extends Component {
    static navigationOptions = {
        title: 'Faceb'
    };
    
    render() {
        return (
            <View>
                <ScreenHeader title={"Faceb"} />

                <View style={{padding: 50}}>
                    <Text>
                        Contribuição
                    </Text>
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});