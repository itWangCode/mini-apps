
import { Base } from '../../../utils/base.js';
class Name extends Base {
  constructor() {
    super();
  }
  /**
   登录
   @param   farmId 店铺id
    @param   token 验证码
   */
  save(farmId, fildName, fildVale, callBack) {
    let parames = {
      url: '',
      data: {
        service: 'Farm.setFileValue',
        farmId: farmId,
        fildName: fildName,
        fildVale: fildVale
      },
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    this.request(parames);


  }

}
export { Name };