import React, { Component } from 'react';
import {
  Dimensions,
  Animated,
  Easing,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast'; // 目前这个库无法避免底部Toast被软键盘遮挡的问题
import AsyncStorageUtils from './util/AsyncStorageUtils';

// 获取设备宽高
const {width, height} = Dimensions.get('window');
// 用于读取版本号
let pkgInfo = require('/React Native/HelloWorld/package.json');

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: "",
        password: "",
        isLogging: false
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/*组件内部的注释方式*/}
        <AnimeImage/>
        <View style={{marginTop: 10, height: 60}}>
          {this.state.isLogging? (<ActivityIndicator size='large'/>) : (null)}
        </View>
        <TextInput
          placeholder="请输入用户名"
          clearButtonMode="while-editing"
          autoCapitalize="none"
          defaultValue={this.state.username}
          maxLength={20}
          returnKeyType="next"
          underlineColorAndroid="transparent"
          style={styles.inputStyle}
          onChangeText={(inputData)=>this.setState({username: inputData})}/>
        <TextInput
          placeholder="请输入密码"
          secureTextEntry={true}
          clearButtonMode="while-editing"
          defaultValue={this.state.password}
          maxLength={20}
          returnKeyType="done"
          underlineColorAndroid="transparent"
          style={styles.inputStyle}
          onChangeText={(inputData)=>this.setState({password: inputData})}/>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={()=>this.login()}
          style={styles.loginButtonStyle}>
          <Text style={{color: 'white', fontSize: 16}}>登录</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity activeOpacity={0.6}>
            <Text>注册账号</Text>
          </TouchableOpacity>
          <Text>  |  </Text>
          <TouchableOpacity activeOpacity={0.6}>
            <Text>忘记密码</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomStyle}>
          <Text style={styles.textStyle}>v{pkgInfo.version}</Text>
        </View>
        <Toast ref="toast" position='center' style={{backgroundColor: 'gray'}}/>
      </View>
    );
  }

  // 登录
  login() {
    if(this.state.username == '') {
        return this.refs.toast.show("请输入用户名");
    }
    if(this.state.password == '') {
        return this.refs.toast.show("请输入密码");
    }
    this.setState({
      isLogging: true
    });
    // 保存用户名密码
    AsyncStorageUtils.save("USERNAME", this.state.username);
    AsyncStorageUtils.save("PASSWORD", this.state.password);
    // 跳转到主界面
    this.timer = setTimeout(() => {
      this.props.navigation.navigate('Main');
    }, this.randomTime());
  }

  randomTime() {
    return Math.random() * 3 + 500; // 500~1500
  }

  componentDidMount() {
    let that = this;
    // 获取用户名密码
    AsyncStorageUtils.get("USERNAME").then((value) => {
      that.setState({
        username: value
      })
    });
    AsyncStorageUtils.get("PASSWORD").then((value) => {
      that.setState({
        password: value
      })
    });
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
}

// 自定义动画组件
class AnimeImage extends Component {
  state = {
    // 初始值为0
    ratation: new Animated.Value(0),
    scaling: new Animated.Value(0)
  }

  componentDidMount() {
    // 同时执行动画
    Animated.parallel([
      // 随时间变化执行动画
      Animated.timing(this.state.ratation, {
        toValue: 1, // 最终值变为1
        duration: 2200,
        easing: Easing.linear
      }),
      Animated.timing(this.state.scaling, {
        toValue: 1,
        duration: 1000,
      })
    ]).start();
  }

  render() {
    // 插值函数，将[0, 1]映射为[0°, 360°]
    const spin = this.state.ratation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    return(
      <Animated.Image 
        source={require('../images/header_logo.png')} 
        style={[styles.logoStyle, {width: 91, height: 81, transform: [{rotate: spin}, {scale: this.state.scaling}]}]}>
        {this.props.children}
      </Animated.Image>
    );
  }
}

// 类似前端，我们可以在组件中设置style属性，也更推荐使用StyleSheet进行维护
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', // 主轴方向，默认垂直
    flex: 1,
    justifyContent: 'flex-start', // 子item在主轴的对齐方式，默认起始位置对齐
    alignItems: 'center', // 子item在交叉轴的对齐方式，若item未设置高度或设为auto，将占满整个容器的高度
    backgroundColor: '#EFEFF4',
    padding: 10
  },
  logoStyle: {
    marginTop: 50,
    marginBottom: 10
  },
  inputStyle: {
    width: width * 0.9,
    height: 42,
    backgroundColor: '#FFF',
    marginBottom: 10
  },
  loginButtonStyle: {
    width: width * 0.9,
    height: 42,
    backgroundColor: '#E9232C',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomStyle: {
    position: "absolute",
    bottom: 10
  },
  textStyle: {
    color: 'black',
    textAlign: 'left',
    fontSize: 14,
    fontWeight: 'normal',
    letterSpacing: 2, // 缩进
    textDecorationLine: 'underline', // 下划线
    textDecorationColor: 'gray',
    textDecorationStyle: 'dotted'
  }
});