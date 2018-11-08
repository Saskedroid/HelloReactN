import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
  StyleSheet
} from 'react-native';
import HttpUtils from './util/HttpUtils';

let exitTime = 0;

export default class Home extends Component {
    static navigationOptions = {
        headerTitle: (
            <Text style={{flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>资讯</Text>
        )
    };

    _didFocusSubscription;
    _willBlurSubscription;

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            refreshing: false
        };
        
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        });

        // ES6中，在自定义函数中使用this关键字，需要对其进行“绑定”操作，否则this的指向不对
        // 在constructor中使用bind是其中一种做法，还有一些其他做法，如使用箭头函数等
        this.fetchData = this.fetchData.bind(this);
        this.renderListView = this.renderListView.bind(this);
    }

    render() {
        if(!this.state.loaded) {
            return this.renderLoadingView();
        }
        if(this.state.data == null) {
            return this.renderNothingView();
        }
        
        return(
            <FlatList
                keyExtractor={(item) => item.id + ""} // 默认每行要提供一个不重复的key属性
                data={this.state.data}
                renderItem={this.renderListView}
                ItemSeparatorComponent={() => { // 分割线
                    return(
                        <View style={{height: 1, backgroundColor: 'lightgray'}}/>
                    )
                }}
                ListFooterComponent={ // Footer视图
                    <Text style={styles.footer}>到底了，没有啦！</Text>
                }
                refreshControl={ // 下拉刷新
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}/>
                }/>
        )
    }

    // 正在加载视图
    renderLoadingView() {
        return(
            <View style={styles.container}>
                <Text>正在加载数据…</Text>
            </View>
        )
    }

    // 加载完成视图
    renderListView({item}) {
        return(
            <TouchableOpacity 
                activeOpacity={0.8}
                style={styles.container} 
                onPress={()=>this.props.navigation.navigate('Detail', { title: item.title, content: item.content })}>
                <Image style={styles.cover} source={{uri: item.cover}}/>
                <View style={styles.rightContainer}>
                    <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                    <View style={styles.authorContainer}>
                        <Text style={styles.author}>{item.author_name}</Text>
                        <Text style={styles.author}>{item.published_at}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    // 加载失败视图
    renderNothingView() {
        return(
            <View style={styles.container}>
                <Text>无数据</Text>
            </View>
        )
    }

    // 下拉刷新
    onRefresh = () => {
        this.setState({
            refreshing: true
        });
        this.fetchData();
    }

    // 请求数据
    fetchData() {
        HttpUtils.apiGetNews((success, rsp) => {
            if(success) {
                this.setState({
                    data: rsp,
                    loaded: true,
                    refreshing: false
                });
            } else {
                this.setState({
                    loaded: true,
                    refreshing: false
                });
            }
        });
    }

    // 组件加载完成
    componentDidMount() {
        this.fetchData();
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        });
    }

    // 组件即将移除
    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    // Android返回键监听
    onBackAndroid = () => {
        if (this.exitTime && this.exitTime + 2000 >= Date.now()) {
            // BackHandler.exitApp();
            return false;
        }
        this.exitTime = Date.now();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        return true;
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightContainer: {
        flex: 1,
        paddingLeft: 8,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    cover: {
        width: 90,
        height: 70
    },
    title: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'left'
    },
    authorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    author: {
        color: '#999'
    },
    footer: {
        alignSelf: 'center',
        fontSize: 13,
        color: 'gray',
        margin: 5
    }
})