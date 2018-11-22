import React from 'react';
import { 
    WebView,
    ActivityIndicator,
    View,
    TextInput,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Detail extends React.Component {
    // 在标题中使用参数
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("title", "")
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            favorited: false
        }
    }

    render() {
        // 列表传过来的值
        const content = this.props.navigation.getParam("content", "");
        // 在网页加载之前注入一段JS代码，设置html中图片的宽高
        const injectjs = "javascript:(function(){var objs=document.getElementsByTagName('img');for(var i=0;i<objs.length;i++){var img=objs[i];img.style.maxWidth='100%';img.style.height='auto';}})()";

        return(
            <View style={{flex: 1}}>
                <WebView
                    originWhitelist={['*']}
                    source={{html: content}}
                    injectedJavaScript={injectjs}
                    style={{marginBottom: 50}}
                    startInLoadingState={true}
                    renderLoading={() => {
                        return(<ActivityIndicator size='large'/>)
                    }} />
                <View style={styles.bottomBar}>
                    <TextInput
                        placeholder="评论"
                        style={styles.bottomInput}/>
                    <View style={styles.bottomIcons}>
                        <Icon name={this.state.favorited? "md-heart" : "md-heart-empty"} style={styles.bottomIcon} onPress={() => this.favorited()}/>
                        <Icon name="md-chatbubbles" style={styles.bottomIcon}/>
                        <Icon name="md-thumbs-up" style={styles.bottomIcon}/>
                    </View>
                </View>
            </View>
        )
    }

    // 收藏
    favorited() {
        this.setState({
            favorited: !this.state.favorited
        });
    }
}

const styles = StyleSheet.create({
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#EFEFF4',
        borderColor: '#DEDEE3',
        borderTopWidth: 0.8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomInput: {
        width: '60%',
        height: 40,
        margin: 5,
        backgroundColor: 'white'
    },
    bottomIcons: {
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    bottomIcon: {
        fontSize: 24,
        color: '#0098FD'
    }
})