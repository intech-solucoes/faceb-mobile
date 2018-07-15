import React, { Component } from 'react';
import { Text, View } from "react-native";

export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Faceb',
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
            <Image
              source={require('../assets/icon.png')}
              style={[styles.icon, {tintColor: tintColor}]}
            />
          )
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