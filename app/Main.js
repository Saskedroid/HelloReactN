import React from 'react';
import {
    Image,
    StyleSheet,
  } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './Home';
import ProfileScreen from './Profile';
import AboutScreen from './About';
import DetailScreen from './Detail';
import AccountScreen from './Account';

/** 
 * 关于选项卡子页面无法修改导航器选项的问题请参考官方文档：
 * https://reactnavigation.org/docs/zh-Hans/navigation-options-resolution.html#a-tab-navigator-contains-a-stack-and-you-want-to-hide-the-tab-bar-on-specific-screens
*/
const HomeStack = createStackNavigator({HomeScreen});
const ProfileStack = createStackNavigator({ProfileScreen});
const AboutStack = createStackNavigator({AboutScreen});

HomeStack.navigationOptions = {
    tabBarLabel: '资讯',
    tabBarIcon: ({ focused }) => {
        return focused? <Image style={styles.tabBarIcon} source={require('../images/icon_home_p.png')}/> : <Image style={styles.tabBarIcon} source={require('../images/icon_home_n.png')}/>
    }
};
ProfileStack.navigationOptions = {
    tabBarLabel: '活动',
    tabBarIcon: ({ focused }) => {
        return focused? <Image style={styles.tabBarIcon} source={require('../images/icon_profile_p.png')}/> : <Image style={styles.tabBarIcon} source={require('../images/icon_profile_n.png')}/>
    }
};
AboutStack.navigationOptions = {
    tabBarLabel: '我的',
    tabBarIcon: ({ focused }) => {
        return focused? <Image style={styles.tabBarIcon} source={require('../images/icon_about_p.png')}/> : <Image style={styles.tabBarIcon} source={require('../images/icon_about_n.png')}/>
    }
};

const TabStack = createBottomTabNavigator({ // 取代TabNavigator
    HomeStack,
    ProfileStack,
    AboutStack
}, {
    tabBarOptions: {
        activeTintColor: '#E9232C', // 选中Tab的文本和图标颜色
        inactiveTintColor: '#666', // 未选中Tab的文本和图标颜色
        showIcon: true, // 是否显示图标，默认false
        showLabel: true, // 是否显示文本，默认true
        style: { // TabBar样式
            backgroundColor: '#F5F5F5',
            paddingBottom: 3,
            paddingTop: 3,
            borderTopWidth: 0.2,
            borderTopColor: '#CCC'
        },
        labelStyle: { // 文本样式
            fontSize: 12,
            margin: 2
        }
    },
    // swipeEnabled: true, // 是否允许滑动（注：createBottomTabNavigator不支持该选项）
    lazy: true,
    backBehavior: 'none' // 返回键是否返回初始Tab页，可选“initalRoute”和“none”，默认“initalRoute”
});

// 添加一个StackNavigator作为TabStack的父级，并将Detail等页面放在里面
const MainStack = createStackNavigator({
    Tabs: {
        screen: TabStack,
        navigationOptions: () => ({
            header: null
        })
    },
    Detail: DetailScreen,
    Account: AccountScreen
});

export default class Main extends React.Component {
    render() {
        return <MainStack />;
    }
};

const styles = StyleSheet.create({
    tabBarIcon: {
        width: 24,
        height: 24
    }
});