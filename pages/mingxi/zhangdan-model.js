import { Base } from '../../utils/base.js';

class Account extends Base {
  constructor() {
    super();
  }

  /**
   获取账单列表
    */
  getAccountLogsList(farmId, pageIndex, pageSize, callBack) {
    let parames = {
      url: '',
      data: {
        service: 'Farm.getFarmAccountLogsList',
        farmId: farmId,
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    this.request(parames);
  }
  /**
   根据时间 推算出周
   @param y:年 后面两位
   @param m:月
   @param d:日
   @param c:世纪数-1

   */
  getWeek(y, m, d, c) {
    let w = 0;
    let str = '';
    w = y + parseInt(y / 4) + parseInt(c / 4) - 2 * c + parseInt(26 * (m + 1) / 10) + d - 1;
    let num = 0;
    if (w < 0) {
      w = w + 70;
    }
    num = w % 7;
    console.log(num);
    switch (num) {
      case 0:
        str = '周日';
        break;
      case 1:
        str = '周一';
        break;
      case 2:
        str = '周二';
        break;
      case 3:
        str = '周三';
        break;
      case 4:
        str = '周四';
        break;
      case 5:
        str = '周五';
        break;
      case 6:
        str = '周六';
        break;

    }
    console.log(str);
    return str
  }
  /**
   格式化订单列表
     @param currentYear:当天的年
     @param currentMonth:当天的月
     @param currentDay:当天的日
     @param accountList:订单数组
     return accountList 重新组装的订单数组  
   */

  doFormeTime(accountList, currentYear, currentMonth, currentDay) {
    for (let i in accountList) {
      let showTime = accountList[i].time;
      let [year, month, day, week] = [0, 0, 0, ''];
      showTime = showTime.split(' ');
      let showTimes = showTime[1];
      showTime = JSON.stringify(showTime[0]);
      showTime = showTime.replace(/\"/g, '');
      showTime = showTime.split('-');//时间


      year = showTime[0].substr(2, 2);
      year = parseInt(year);
      month = parseInt(showTime[1]);
      day = parseInt(showTime[2]);

      let dayes = new Date(showTime[0], showTime[1], 0);
      let lastdate = dayes.getDate();//当前月的最后一天

      //显示周

      if (showTime[0] == currentYear && showTime[1] == currentMonth && showTime[2] == currentDay) {
        week = '今天';
        showTimes = showTimes;
      } else if (currentDay != 1) {
        if (showTime[0] == currentYear && showTime[1] == currentMonth && showTime[2] == (currentDay - 1)) {
          week = '昨天';
          showTimes = showTimes;
        } else {
          week = this.getWeek(year, month, day, 20);
          showTimes = showTime[1] + '-' + showTime[2];
        }
      } else if (currentDay == 1) {
        if (showTime[0] == currentYear && showTime[1] == currentMonth - 1 && showTime[2] == lastdate) {
          week = '昨天';
          showTimes = showTimes;
        } else {
          week = this.getWeek(year, month, day, 20);
          showTimes = showTime[1] + '-' + showTime[2];
        }
      }
      accountList[i].week = week;
      accountList[i].showTimes = showTimes;
    }
    return accountList
  }












}
export { Account };