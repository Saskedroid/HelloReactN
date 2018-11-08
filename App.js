/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import SplashScreen from './app/Splash';
import LoginScreen from './app/Login';
import MainScreen from './app/Main';

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({
      header: null // 不显示导航栏
    })
  }
});

const AppStack = createStackNavigator({
  Main: {
    screen: MainScreen,
    navigationOptions: () => ({
      header: null
    })
  }
});

// SwitchNavigator一次只显示一个screen，默认不处理返回操作，并在切换时将路由重置为默认状态
const App = createSwitchNavigator({
  Splash: SplashScreen,
  Auth: AuthStack,
  App: AppStack,
}, {
  initialRouteName: 'Splash'
});

export default App;