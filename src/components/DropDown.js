import React from 'react';
import { TouchableOpacity } from "react-native";
import { Picker, Icon, Header, Left, Right, Body, Title } from "native-base";
import _ from "lodash";

export const DropDown = (props) => {
    var prefixo = props.prefixo ? props.prefixo : " ";
    var sufixo = props.sufixo ? props.sufixo : " ";

    if(props.textoVazio) {
        return (
            <Picker
                renderHeader={backAction =>
                    <Header style={{ backgroundColor: Variables.colors.primary }}>
                        <Left>
                            <TouchableOpacity onPress={backAction}>
                                <Icon name="arrow-back" style={{ color: "#fff" }} />
                            </TouchableOpacity>
                        </Left>
                        <Body style={{ flex: 3 }}>
                            <Title style={{ color: "#fff" }}>{props.titulo}</Title>
                        </Body>
                        <Right />
                    </Header>}
                mode="dialog"
                style={Styles.textInput}
                selectedValue={props.valor} 
                onValueChange={props.onValueChange}
            >
                <Picker.Item label={props.textoVazio} value={props.valorVazio} />
    
                {props.itens.map((item, index) => {
                    if(typeof(item) === "string" || typeof(item) === "number")
                        return <Picker.Item key={index} label={prefixo + item.toString() + sufixo} value={item} />
                    else
                        return <Picker.Item key={index} label={prefixo + item.titulo + sufixo} value={item.valor} />
                })}
            </Picker>
        );
    } else {
        return (
            <Picker
                renderHeader={backAction =>
                    <Header style={{ backgroundColor: Variables.colors.primary }}>
                        <Left>
                            <TouchableOpacity onPress={backAction}>
                                <Icon name="arrow-back" style={{ color: "#fff" }} />
                            </TouchableOpacity>
                        </Left>
                        <Body style={{ flex: 3 }}>
                            <Title style={{ color: "#fff" }}>{props.titulo}</Title>
                        </Body>
                        <Right />
                    </Header>}
                mode="dialog"
                style={Styles.textInput}
                selectedValue={props.valor} 
                onValueChange={props.onValueChange}
            >
                {props.itens.map((item, index) => {
                    if(typeof(item) === "string" || typeof(item) === "number")
                        return <Picker.Item key={index} label={prefixo + item.toString() + sufixo} value={item} />
                    else
                        return <Picker.Item key={index} label={prefixo + item.titulo + sufixo} value={item.valor} />
                })}
            </Picker>
        );
    }
    
}