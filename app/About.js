import React, { Component } from 'react';
import {
  View,
  ImageBackground,
  SectionList,
  TouchableOpacity,
  Image,
  Text,
  BackHandler,
  ToastAndroid,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

let exitTime = 0;

const sectionData = [
    { key: 0, title: "个人", data: [[{name: "账号信息", icon: 'md-person'}, {name: "修改密码", icon: 'md-key'}, {name: "意见反馈", icon: 'md-send'}, {name: "我的收藏", icon: 'md-star-outline'}]] },
    { key: 1, title: "商城", data: [[{name: "官方网站", icon: 'md-home'}, {name: "活动专区", icon: 'md-heart-empty'}, {name: "积分兑换", icon: 'md-gift'}]] },
    { key: 2, title: "关于", data: [[{name: "使用帮助", icon: 'md-help'}, {name: "开源许可", icon: 'md-share'}]] }
];

export default class About extends Component {
    static navigationOptions = {
        header: null
        // headerTitle: (
        //     <Text style={{flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>我的</Text>
        // ),
    }

    _didFocusSubscription;
    _willBlurSubscription;

    constructor(props) {
        super(props);

        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        });
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <ImageBackground source={require('../images/bg.png')} style={styles.topLayout}>
                    <Image source={require('../images/avatar.png')} style={{width: 120, height: 120}}/>
                </ImageBackground>
                <SectionList
                    keyExtractor={(item, index) => item + index}
                    renderSectionHeader={({section: {title}}) => this.renderSectionHeader(title)}
                    renderItem={({section: {data}}) => this.renderSectionItem(data[0])}
                    sections={sectionData}/>
            </View>
        )
    }

    renderSectionHeader(title) {
        return(
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{title}</Text>
            </View>
        );
    }

    renderSectionItem(data) {
        return(
            <View style={styles.sectionItem}>
                {
                    data.map((value, index) => {
                        return(
                            <TouchableOpacity 
                                activeOpacity={0.5}
                                key={index}
                                style={styles.sectionItemChild}>
                                <Icon style={styles.sectionItemChildImage} name={value.icon}/>
                                <Text style={styles.sectionItemChildText}>{value.name}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        );
    }

    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        });
    }

    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    onBackAndroid = () => {
        if (this.exitTime && this.exitTime + 2000 >= Date.now()) {
            return false;
        }
        this.exitTime = Date.now();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        return true;
    };
}

const styles = StyleSheet.create({
    topLayout: {
        width: '100%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    sectionHeader: {
        height: 35,
        justifyContent: 'center',
        paddingLeft: 10
    },
    sectionHeaderText: {
        color: '#666'
    },
    sectionItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#EFEFF4'
    },
    sectionItemChild: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    sectionItemChildImage: {
        fontSize: 34,
        color: '#E7A258'
    },
    sectionItemChildText: {
        fontSize: 12,
        color: '#999',
        marginTop: 3
    }
})