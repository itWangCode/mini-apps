import { Base } from '../../utils/base.js';
class Check extends Base {
  constructor() {
    super();
  }
  /**
   通过消费码获取信息
    */

  inputCode(farmId, gameCode, callBack) {
    let parames = {
      url: '',
      data: {
        service: 'ProductPin.getInfoByGameCode',
        farmId: farmId,
        gameCode: gameCode
      },
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    this.request(parames);
  }
  /**
   核实消费码   
   */

  checkCode(farmId, gameCode, callBack) {
    let parames = {
      url: '',
      data: {
        service: 'ProductPin.GameCodeUsed',
        farmId: farmId,
        gameCode: gameCode
      },
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    this.request(parames);
  }


}
export { Check };