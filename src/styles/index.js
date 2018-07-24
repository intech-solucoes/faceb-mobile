import React from "react";
import { StyleSheet, Platform, StatusBar, Image } from 'react-native';
import Variables from './Variables';

export default Styles = StyleSheet.create({
    content: {
        padding: 20
    },
    container: {
        flex: 1
    },
    backgroundImage: {
        justifyContent: 'center',
        flex: 1, 
        width: null,
        height: null,
    },
    button: {
        alignItems: 'center',
        backgroundColor: Variables.colors.primary,
        padding: 10
    },
    buttonView: {
        alignItems: 'center',
    },
    buttonText: {
        color: "white",
        fontSize: 16
    },
    textInput: {
        backgroundColor: "white",
        marginBottom: 5,
        height: 40, 
        padding: 10,
        borderColor: "#FFFFFF"
    },
    h1: {
        fontSize: 24
    },
    h2: {
        fontSize: 20
    },
    h3: {
        fontSize: 16
    },
    h4: {
        fontSize: 12
    },
    h5: {
        fontSize: 10
    },
    scrollContainer: {
        padding: 20
    }
});

export { Variables };