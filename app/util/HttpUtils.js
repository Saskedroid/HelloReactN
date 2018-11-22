import {NetInfo} from 'react-native';

export default class HttpUtils {

    static API_GET_NEWS = "http://spider.dcloud.net.cn/api/news";

    static apiGetNews = function(callback) {
        HttpUtils.baseGet(HttpUtils.API_GET_NEWS, null, callback);
    };

    static baseGet(url, params, callback) {
        NetInfo.isConnected.fetch().then(isConnected => {
            if(!isConnected) {
                callback(false, "网络未连接");
            }

            if(params) {
                let paramsArray = [];
                Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
                if (url.search(/\?/) === -1) {
                    url += '?' + paramsArray.join('&');
                } else {
                    url += '&' + paramsArray.join('&');
                }
            }

            fetch(url, {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                if(response.ok) {
                    return response.json();
                } else {
                    callback(false, response.status); // TBC
                }
            })
            .then((response) => {
                callback(true, response);
            })
            .catch((error) => {
                callback(false, error); // TBC
            })
        });
    }

    static basePost(url, formData) {
        NetInfo.isConnected.fetch().then(isConnected => {
            if(!isConnected) {
                callback(false, "网络未连接");
            }

            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: formData
            })
            .then((response) => {
                if(response.ok) {
                    return response.json();
                } else {
                    callback(false, response.status); // TBC
                }
            })
            .then((response) => {
                callback(true, response);
            })
            .catch((error) => {
                callback(false, error); // TBC
            })
        });
    }
}