import React from "react";
import { Text, ScrollView, Dimensions, View } from "react-native";
import HTML from 'react-native-render-html';
import { NoticiaEntidade } from "../../entidades";
import { NoticiaService } from "../../services/NoticiaService";

import Styles, { Variables } from "../../styles";

interface Props {
  navigation?: any;
}

interface State {
  noticia: NoticiaEntidade;
}

export class NoticiaScreen extends React.Component<Props, State> {

  static navigationOptions = {
    title: "Notícia",
    rightMenu: false
  }

  state = {
    noticia: new NoticiaEntidade()
  };

  componentDidMount = async () => {
    try {
      var oid = this.props.navigation.getParam("oid", "0");

      const result = await NoticiaService.BuscarPorOid(oid);

      await this.setState({ noticia: result });
    } catch (err) {
      if (err.response)
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