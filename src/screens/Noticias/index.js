import React from "react";
import { Text, ScrollView, StyleSheet, FlatList, View, ActivityIndicator } from "react-native";

import Styles, { Variables } from "../../styles";
import { NoticiaService } from "@intechprev/advanced-service";
import { Button } from "../../components";

import { NoticiaScreen } from "./detalhe";
export {
    NoticiaScreen
}

const config = require("../../config.json");
const noticiaService = new NoticiaService(config);

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 20,
    },

    listItem: {
        backgroundColor: '#EEE',
        marginVertical: 10,
        padding: 20,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
    },
});

export class NoticiasScreen extends React.Component {

    static navigationOptions = {
        title: "Notícias",
        rightMenu: false
    }

    state = {
        noticias: [],
        page: 1,
        loading: false,
    };

    componentDidMount = async () => {
        await this.loadRepositories();
    }

    loadRepositories = async () => {
        try {
            if (this.state.loading) return;

            const { page } = this.state;

            await this.setState({ loading: true });

            const result = await noticiaService.BuscarPorPagina(page);

            await this.setState({
                noticias: [...this.state.noticias, ...result.data],
                page: page + 1,
                loading: false,
            });
        } catch(err) {
            await this.setState({ loading: false });

            if(err.response)
                alert(err.response.data);
            else
                alert(err);
        }
    }

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View>
                <ActivityIndicator />
            </View>
        );
    };

    renderItem = ({ item }) => (
        <View style={styles.listItem}>
            <Text style={[Styles.h2, { color: Variables.colors.secondary, marginBottom: 5 }]}>{item.TXT_TITULO}</Text>
            <Text style={[Styles.h5, { color: Variables.colors.secondary, marginBottom: 5 }]}>{item.DTA_CRIACAO}</Text>
            <Text>{item.TXT_RESUMO}</Text>
            <Button title="Visualizar" style={{ width: 300, marginTop: 10 }} onClick={() => this.props.navigation.navigate("Noticia", { oid: item.OID_NOTICIA })} />
        </View>
    );

    render() {
        return (
            <FlatList
                contentContainerStyle={styles.list}
                data={this.state.noticias}
                renderItem={this.renderItem}
                keyExtractor={item => item.OID_NOTICIA.toString()}
                onEndReached={this.loadRepositories}
                onEndReachedThreshold={0.1}
                ListFooterComponent={this.renderFooter}
            />
        );
    }
}