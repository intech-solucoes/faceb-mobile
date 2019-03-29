import React, { Component } from 'react';
import { Text, View, Platform, StatusBar, TouchableOpacity } from "react-native";
import { Header, Left, Body, Right, Icon } from 'native-base';
import { Variables } from "../styles";

export default class ScreenHeader extends Component {
    render() {
        var routeIndex = this.props.navigation.state.index;
        var route = this.props.navigation.state.routes[routeIndex];
        const { descriptors } = this.props;
        const descriptor = descriptors[route.key];

        //var openDrawer = routeIndex === 0;

        return (
            <View>
                <View>
                    { 
                        Platform.OS === 'android' && Platform.Version >= 20 ?
                        <View style={{ height: 24, backgroundColor: Variables.colors.primary }} />
                        : null 
                    }

                    <Header style={{backgroundColor: Variables.colors.primary}} noShadow={true}>
                        <Left style={{ color:"white" }}>
                            <TouchableOpacity onPress={() => this.props.navigation.pop() } style={{ padding: 10 }}> 
                                <Icon name="arrow-back" style={{ color: 'white' }} /> 
                            </TouchableOpacity>
                        </Left>

                        <Body>
                            {descriptor &&
                                <Text style={{ 
                                    color:"white", 
                                    fontSize: 20, 
                                    width: Platform.OS === 'android' && Platform.Version >= 20 ? 200 : 150, 
                                    textAlign: Platform.OS === 'android' && Platform.Version >= 20 ? "left" : "center" }}
                                >
                                    {descriptor.options.title}
                                </Text>
                            }
                        </Body>
                        
                        <Right>
                            {descriptor && descriptor.options.rightMenu && 
                                <TouchableOpacity onPress={() => this.props.navigation.openDrawer() } style={{ padding: 10 }}>
                                    <Icon ios='ios-menu' android="md-menu" style={{ color: 'white' }} />
                                </TouchableOpacity>
                            }
                        </Right>
                    </Header>
                </View>
            </View>
        );
    }
};
