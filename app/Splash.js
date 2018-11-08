import React, {Component} from 'react';
import {
  Platform,
  View,
  Text,
  AsyncStorage,
  StyleSheet
} from 'react-native';

const instructions = Platform.select({
  ios: '🍎',
  android: '🤖',
});

type Props = {};
export default class Splash extends Component<Props> {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Hello World</Text>
        <Text style={styles.instructions}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }

  // 根据userToken切换到App或Auth，Splash将会被卸载(Unmount)
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    this.timer = setTimeout(() => {
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }, 2000);
  };

  // 组件将要移除时清除定时器
  componentWillUnmount() {
      this.timer && clearTimeout(this.timer);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 10,
  },
});