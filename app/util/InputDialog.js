import React, { Component } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Button,
    Dimensions,
    StyleSheet
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class InputDialog extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Modal
                animationType="fade"
                visible={this.props.dlgVisible}
                transparent={true}
                // 注意！不能这样写：onRequestClose={()=>this.props.dlgHide}
                onRequestClose={this.props.dlgHide}>
                <View style={styles.background}>
                    <View style={styles.dialog}>
                        <Text style={styles.title}>{this.props.dlgTitle}</Text>
                        <TextInput style={styles.input}/>
                        <View style={styles.buttonLayout}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={this.props.dlgHide}
                                style={[styles.button, {marginRight: 5}]}>
                                <Text style={{color: 'white', fontSize: 14, padding: 10}}>取消</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={this.props.dlgHide}
                                style={[styles.button, {marginLeft: 5}]}>
                                <Text style={{color: 'white', fontSize: 14, padding: 10}}>确定</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    dialog: {
        alignItems: 'center',
        width: width * 0.8,
        backgroundColor: 'white',
        borderRadius: 5
    },
    title: {
        padding: 10
    },
    input: {
        width: '95%',
        height: 42,
        margin: 10,
        borderColor: '#999',
        borderWidth: 0.5
    },
    buttonLayout: {
        flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5,
        padding: 10
    },
    button: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF9900',
        marginLeft: 10,
        marginRight: 10
    }
});