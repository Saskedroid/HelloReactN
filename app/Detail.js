import React from 'react';
import { WebView } from 'react-native';

export default class Detail extends React.Component {
    // 在标题中使用参数
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("title", "")
        }
    };

    render() {
        // 列表传过来的值
        const content = this.props.navigation.getParam("content", "");
        // 在网页加载之前注入一段JS代码，设置html中图片的宽高
        const injectjs = "javascript:(function(){var objs=document.getElementsByTagName('img');for(var i=0;i<objs.length;i++){var img=objs[i];img.style.maxWidth='100%';img.style.height='auto';}})()";

        return(
            <WebView
                originWhitelist={['*']}
                source={{html: content}}
                injectedJavaScript={injectjs} />
        )
    }
}