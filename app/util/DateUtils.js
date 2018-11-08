export default class DateUtils {

    /** 获取当前年月日 yyyy-MM-dd*/
    static getCurrentDateString() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        
        if(month < 10) {
            month = "0" + month;
        }
        if(day < 10) {
            day = "0" + day;
        }
        return year + "-" + month + "-" + day;
    }
}