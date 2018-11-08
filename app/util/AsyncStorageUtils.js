import { AsyncStorage } from 'react-native';

export default class AsyncStorageUtils {
    
    /** 保存*/
    static save(key, value) {
       return AsyncStorage.setItem(key, JSON.stringify(value));
    }

    /** 获取*/
    static get(key) {
        return AsyncStorage.getItem(key).then((value) => {
            return JSON.parse(value);
        });
    }

    /** 更新*/
    static update(key, value) {
        return AsyncStorageUtils.get(key).then((item) => {
            value = typeof value === 'string'? value : Object.assign({}, item, value);
            return AsyncStorageUtils.save(key, JSON.stringify(value));
        });
    }

    /** 删除*/
    static delete(key) {
        return AsyncStorage.removeItem(key);
    }
}