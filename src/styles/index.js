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
        marginBottom: 5,
        height: 40, 
        paddingHorizontal: 10,
        backgroundColor: "#F6F7F9",
        borderColor: "#e8e9ea",
        borderWidth: 1
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
        backgroundColor: "#FFF"
    },
    scrollContainerContent: {
        padding: 20,
    }
});

export { Variables };