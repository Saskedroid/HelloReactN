import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    Alert,
    StyleSheet
} from 'react-native';
import InputDialog from './util/InputDialog';
import Icon from 'react-native-vector-icons/EvilIcons';

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

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            modalTitle: ""
        }
    }

    render() {
        return(
            <View style={{flex: 1, backgroundColor: 'EFEFF4', marginTop: 25}}>
                <TouchableOpacity activeOpacity={0.7} style={styles.container}>
                    <Text style={styles.containerLeft}>头像</Text>
                    <View style={styles.containerRight}>
                        <Image source={require('../images/avatar.png')} style={styles.containerImage}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={()=>this.editAccount(1)}>
                    <Text style={styles.containerLeft}>昵称</Text>
                    <Text style={styles.containerRight}>Null</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={()=>this.editAccount(2)}>
                    <Text style={styles.containerLeft}>手机号</Text>
                    <Text style={styles.containerRight}>158****1234</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={[styles.container, {marginTop: 20}]}>
                    <Text style={styles.containerLeft}>性别</Text>
                    <Text style={styles.containerRight}>保密</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.container}>
                    <Text style={styles.containerLeft}>生日</Text>
                    <Text style={styles.containerRight}>1970年1月1日</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={()=>this.editAccount(3)}>
                    <Text style={styles.containerLeft}>地址</Text>
                    <Text numberOfLines={1} style={styles.containerRight}>未填写</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={[styles.container, {marginTop: 20}]}>
                    <Text style={styles.containerLeft}>修改密码</Text>
                    <Icon name="chevron-right" style={styles.containerIcon}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.containerBottom} onPress={()=>this.logout()}>
                    <Text>退出登录</Text>
                </TouchableOpacity>
                <InputDialog 
                    dlgVisible={this.state.modalVisible}
                    dlgTitle={this.state.modalTitle}
                    dlgHide={() => this.setState({ modalVisible: false })}/>
            </View>
        )
    }

    // 编辑账户
    editAccount(index) {
        var title = "";
        switch (index) {
            case 1:
                title = "修改昵称";
                break;
            case 2:
                title = "修改手机号";
                break;
            case 3:
                title = "修改地址";
                break;
        }
        this.setState({
            modalVisible: true,
            modalTitle: title
        });
    }

    // 退出登录
    logout() {
        Alert.alert('提示', '是否退出登录？', [
            { text: '取消', onPress: () => {} },
            { text: '确定', onPress: () => { this.props.navigation.navigate('Auth'); } }
        ], {
            cancelable: true
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: 'white',
        marginBottom: 0.5 // 伪分隔线
    },
    containerLeft: {
        flex: 1
    },
    containerRight: {
        flex: 2,
        textAlign: 'right',
        flexDirection: 'row-reverse',
        color: '#999'
    },
    containerImage: {
        width: 60,
        height: 60,
    },
    containerIcon: {
        fontSize: 24,
        color: '#999'
    },
    containerBottom: {
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: 'white',
        fontWeight: 'bold',
        borderTopColor: '#CECECE',
        borderTopWidth: 0.5
    }
});