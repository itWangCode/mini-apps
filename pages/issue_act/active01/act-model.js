
import { Base } from '../../../utils/base.js';
class AddActive extends Base {
  constructor() {
    super();
  }
  /**
   *添加活动信息
   */
  addActive(param, callBack) {
    let parames = {
      url: '',
      data: param,
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    this.request(parames);
  }
  /**
   获取某年某月的天数
   */
  mGetDate(year, month) {
    var d = new Date(year, month, 0);
    return d.getDate();
  }

  /**
   编辑操作
   显示已被选择周
   @param week1周一到周三数组
  
   */
  checkWeek(activInfo, week1) {

    let addTime = activInfo.useDate;
    let editD = [];
    let eHasChange1=false;
    if (addTime == null) {
      console.log(12);
      eHasChange1=false;
    } else {
      eHasChange1 = true;   
      addTime = addTime.split('-');//时间
      console.log(addTime[0]);
      let businessTime = activInfo.businessTime;
      let editDatas = {
        year: addTime[0],
        month: addTime[1],
        day: addTime[2],
        id: 0,
      }
      editD.push(editDatas);
    }


    //周
    let weekes = {};
    let monday = parseInt(activInfo.monday);//周一
    let tuesday = parseInt(activInfo.tuesday);
    let wednesday = parseInt(activInfo.wednesday);
    let thursday = parseInt(activInfo.thursday);
    let friday = parseInt(activInfo.friday);
    let saturday = parseInt(activInfo.saturday);
    let sunday = parseInt(activInfo.sunday);

    for (let i in week1) {
      if (monday == 1) {
        week1[0].check = true;
      }
      if (tuesday == 1) {
        week1[1].check = true;
      }
      if (wednesday == 1) {
        week1[2].check = true;
      }
      if (thursday == 1) {
        week1[3].check = true;
      }
      if (friday == 1) {
        week1[4].check = true;
      }
      if (saturday == 1) {
        week1[5].check = true;
      }
      if (sunday == 1) {
        week1[6].check = true;
      }
    }
    let eHasChange2 = false;
    for (let i in week1) {
      if (week1[i].check) {
        eHasChange2 = true;//日期不能选
      }
    }

    weekes = {
      week1: week1,
      editD: editD,
      eHasChange2: eHasChange2,
      eHasChange1: eHasChange1
    }

    return weekes
  }

  /**
   显示周的数据
   @param step1:第一步选择的周数据
   格式显示 周一、周二 之间用"、"隔开
   */
  showWeekes(step1) {
    let showW = [];
    if (step1.monday == 1) {
      let d = '周一';
      showW.push(d);
    }
    if (step1.tuesday == 1) {
      let d = '周二';
      showW.push(d);
    }
    if (step1.wednesday == 1) {
      let d = '周三';
      showW.push(d);
    }
    if (step1.thursday == 1) {
      let d = '周四';
      showW.push(d);
    }
    if (step1.friday == 1) {
      let d = '周五';
      showW.push(d);
    }
    if (step1.saturday == 1) {
      let d = '周六';
      showW.push(d);
    }
    if (step1.sunday == 1) {
      let d = '周七';
      showW.push(d);
    }
    showW = showW.join('、');
    // 
    return showW
  }

}
export { AddActive };