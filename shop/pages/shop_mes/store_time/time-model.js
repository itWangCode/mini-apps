
import { Base } from '../../../utils/base.js';
class Time extends Base {
  constructor() {
    super();
  }
 /**
  修改营业时间
  */
  saveTime(farmId, fildName, fildVale, callBack) {
    let parames = {
      url: '',
      data: {
        service: 'Farm.setFileValue',
        farmId: farmId,
        fildName: fildName,
        fildVale: fildVale,      
      },
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    this.request(parames);
  }




}
export { Time };