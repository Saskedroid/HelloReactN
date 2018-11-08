import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast'; // 目前这个库无法避免底部Toast被软键盘遮挡的问题

// 获取设备宽高
const {width, height} = Dimensions.get('window');

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
        <Image 
          source={require('../images/header_logo.png')} 
          style={[styles.logoStyle, {width: 91, height: 81}]}/>
        <View style={{marginTop: 10, height: 60}}>
          {this.state.isLogging? (<ActivityIndicator size='large'/>) : (null)}
        </View>
        <TextInput
          placeholder="请输入用户名"
          clearButtonMode="always"
          maxLength={20}
          returnKeyType="next"
          underlineColorAndroid="transparent"
          style={styles.inputStyle}
          onChangeText={(inputData)=>this.setState({username: inputData})}/>
        <TextInput
          placeholder="请输入密码"
          secureTextEntry={true}
          clearButtonMode="always"
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
          <Text style={styles.textStyle}>v1.0.0</Text>
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
    // 跳转到主界面
    this.timer = setTimeout(() => {
      this.props.navigation.navigate('Main');
    }, 1500);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
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