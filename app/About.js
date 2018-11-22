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
    { key: 0, title: "应用", data: [[
        {name: "账号信息", icon: 'md-person'}, 
        {name: "我的收藏", icon: 'md-star-outline'}, 
        {name: "使用帮助", icon: 'md-help'}, 
        {name: "意见反馈", icon: 'md-paper-plane'}, 
        {name: "开源许可", icon: 'md-share'}]]
    }, { key: 1, title: "推广", data: [[
        {name: "官方网站", icon: 'md-home'}, 
        {name: "活动专区", icon: 'md-basket'}, 
        {name: "积分兑换", icon: 'md-gift'}]]
    }
];

export default class About extends Component {
    static navigationOptions = {
        header: null
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
                <Text style={styles.sectionHeaderText}>▎{title}</Text>
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
                                onPress={() => this.itemClick(value)}
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

    itemClick(value) {
        switch (value.name) {
            case '账号信息':
                this.props.navigation.navigate('Account', { title: value.name })
                break;
        }
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
        if (exitTime && exitTime + 2000 >= Date.now()) {
            return false;
        }
        exitTime = Date.now();
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
        color: '#777'
    },
    sectionItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#EFEFF4',
        flexWrap: 'wrap'
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