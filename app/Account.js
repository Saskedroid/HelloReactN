import React from 'react';
import { View, Text } from 'react-native';

export default class Detail extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("title", ""),
            headerStyle: {
                backgroundColor: '#E7A258'
            },
            headerTintColor: '#FFF'
        }
    };

    render() {
        return(
            <View></View>
        )
    }
}