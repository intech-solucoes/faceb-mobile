import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from "react-native";

export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Faceb'
    };
    
    render() {
        return (
            <View style={{padding: 50}}>
                <Text>
                    Page1
                </Text>
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