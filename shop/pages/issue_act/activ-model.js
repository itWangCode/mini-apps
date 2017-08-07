
import { Base } from '../../utils/base.js';
class Active extends Base {
  constructor() {
    super();
  }
  /**
   *获取活动列表
   */
  getActiveList(farmId, callBack) {
    let parames = {
      url: '',
      data: {
        service: 'Activities.getActivitieList',
        farmId: farmId,
      },
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    this.request(parames);
  }
  /**
   显示周
   */
  getWeeday(obj) {
    let showW = [];
    if (obj.monday == 1) {
      let d = '周一';
      showW.push(d);
    }
    if (obj.tuesday == 1) {
      let d = '周二';
      showW.push(d);
    }
    if (obj.wednesday == 1) {
      let d = '周三';
      showW.push(d);
    }
    if (obj.thursday == 1) {
      let d = '周四';
      showW.push(d);
    }
    if (obj.friday == 1) {
      let d = '周五';
      showW.push(d);
    }
    if (obj.saturday == 1) {
      let d = '周六';
      showW.push(d);
    }
    if (obj.sunday == 1) {
      let d = '周日';
      showW.push(d);
    }
    showW = showW.join('、');
    return showW
  }

  /**
   编辑活动
   */
  editActive(farmId, activityId, callBack) {
    let parames = {
      url: '',
      data: {
        service: 'Activities.getActivitiesInfo',
        farmId: farmId,
        activityId: activityId,
      },
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    this.request(parames);
  }
  /**
   删除 
   */
  deltActive(farmId, activityId, callBack) {
    let parames = {
      url: '',
      data: {
        service: 'Activities.deleteActivities',
        farmId: farmId,
        activityId: activityId,
      },
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    this.request(parames);
  }





}
export { Active };