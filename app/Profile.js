import React, { Component } from 'react';
import {
  View,
  Text,
  BackHandler,
  ToastAndroid,
  StyleSheet
} from 'react-native';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import DateUtils from './util/DateUtils';

// 日历本地化配置
LocaleConfig.locales['cn'] = {
    monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    monthNamesShort: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
    dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
};
LocaleConfig.defaultLocale = 'cn';

let exitTime = 0;

export default class Profile extends Component {
    static navigationOptions = {
        headerTitle: (
            <Text style={{flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>活动</Text>
        ),
    }

    _didFocusSubscription;
    _willBlurSubscription;

    constructor(props) {
        super(props);
        this.state = {
            selected: DateUtils.getCurrentDateString()
        };

        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        });
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <Calendar
                    style={styles.calendar}
                    monthFormat={'yyyy年MM月'}
                    onDayPress={(day) => this.onDayPress(day)}
                    markedDates={{
                        [this.state.selected]: {selected: true}
                    }}/>
                    <ActionButton buttonColor='rgba(52,152,219,1)' offsetX={16} offsetY={16}>
                        <ActionButton.Item buttonColor='#1abc9c' title="New Task" onPress={() => this.onActionButtonItemPress(1)}>
                            <Icon name="md-create" style={styles.actionButtonIcon}/>
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#e74c3c' title="Notifications" onPress={() => this.onActionButtonItemPress(2)}>
                            <Icon name="md-notifications" style={styles.actionButtonIcon}/>
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#9b59b6' title="All Tasks" onPress={() => this.onActionButtonItemPress(3)}>
                            <Icon name="md-done-all" style={styles.actionButtonIcon}/>
                        </ActionButton.Item>
                    </ActionButton>
            </View>
        )
    }

    onDayPress(day) {
        this.setState({
            selected: day.dateString
        });
    }

    onActionButtonItemPress(index) {
        
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
    calendar: {
        width: '100%'
    },
    actionButtonIcon: {
        fontSize: 20,
        color: 'white'
    }
})