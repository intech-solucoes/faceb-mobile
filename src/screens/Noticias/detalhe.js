import React from "react";
import { Text, ScrollView, Dimensions, View } from "react-native";
import HTML from 'react-native-render-html';

import Styles from "../../styles";
import { NoticiaService } from "@intechprev/advanced-service";

const config = require("../../config.json");
const noticiaService = new NoticiaService(config);

export class NoticiaScreen extends React.Component {

    static navigationOptions = {
        title: "Notícia",
        rightMenu: false
    }

    state = {
        noticia: {}
    };

    componentDidMount = async () => {
        try {
            var oid = this.props.navigation.getParam("oid", "0");
            
            const result = await noticiaService.BuscarPorOid(oid);

            await this.setState({ noticia: result.data });
        } catch(err) {
            if(err.response)
                alert(err.response.data);
            else
                alert(err);
        }
    }

    render() {

        
        return (
            <ScrollView style={[Styles.scrollContainer, { flex: 1 }]} contentContainerStyle={Styles.scrollContainerContent}>
                <Text style={Styles.h1}>{this.state.noticia.TXT_TITULO}</Text>
                <Text style={[Styles.h5, { color: Variables.colors.secondary, marginBottom: 25 }]}>{this.state.noticia.DTA_CRIACAO}</Text>

                {this.state.noticia.TXT_CONTEUDO && 
                    <HTML html={this.state.noticia.TXT_CONTEUDO} imagesMaxWidth={Dimensions.get('window').width} />
                }
            </ScrollView>
        );
    }
}