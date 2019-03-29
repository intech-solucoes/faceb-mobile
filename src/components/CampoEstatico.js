import React, { Component } from 'react';
import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { TextMask } from "react-native-masked-text";

import Styles, { Variables } from "../styles";

export default class CampoEstatico extends Component {

    static propTypes = {
        titulo: PropTypes.string.isRequired,
        subtitulo: PropTypes.string,
        valor: PropTypes.any,
        style: PropTypes.any,
        tituloStyle: PropTypes.any,
        subtituloStyle: PropTypes.any,
        tipo: PropTypes.oneOf(['dinheiro', 'texto']),
        semMargem: PropTypes.bool
    }

    static defaultProps = {
        tipo: 'texto',
        semMargem: false
    }

    render() {
        return (
            <View style={{marginBottom: this.props.semMargem ? 0 : 15}}>
                <Text style={[Styles.h4, styles.label, this.props.tituloStyle]}>{this.props.titulo}</Text>

                {this.props.subtitulo &&
                    <Text style={[Styles.h5, this.props.subtituloStyle]}>{this.props.subtitulo}</Text>}

                {this.props.tipo === "dinheiro" && 
                    <TextMask style={[Styles.h3, styles.valor, this.props.style]} type={'money'} value={this.props.valor} />}

                {this.props.tipo === "texto" &&
                    <Text style={[Styles.h3, styles.valor, this.props.style]}>{this.props.valor}</Text>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    valor: {
    },
    label: {
        color: "#535771"
    }
});
