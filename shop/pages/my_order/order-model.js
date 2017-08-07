
import { Base } from '../../utils/base.js';
class Order extends Base {
  constructor() {
    super();
  }

  /**
   获取历史 组队 获取5条 每次
   */
  getPinsByFarmIdList(farmId, pinStatus, pageIndex, pageSize, callBack) {
    let parames = {
      url: '',
      data: {
        service: 'ProductPin.getPinsByFarmIdList',
        farmId: farmId,
        pinStatus: pinStatus,
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
   处理时间函数
   */
  setTime(stime) {
    stime = stime.split(' ');
    let data = JSON.stringify(stime[1]);
    console.log(data);
    data = data.replace(/\"/g, '');
    stime = JSON.stringify(stime[0]);
    stime = stime.replace(/\"/g, '');
    stime = stime.split('-');//时间
    let times = {
      sendcend: data,
      stime: stime,
    }
    return times;
  }
  /**
   处理时间 显示 今天
   */

  doList(obj) {
    const date = new Date();  
    for (let i in obj) {
      var c = obj[i].activitTime.split(' ');
      console.log(c);
      if (c[0] == '今天') {
        obj[i].Tody = '今天';
        obj[i].hasTody = true;
      }
    }
    return obj
  }




}
export { Order };