
import { Base } from '../../utils/base.js';
class Cash extends Base {
  constructor() {
    super();
  }
  /**
   *提现
   */
  applyWithdraw(farmId, totalMoney, toAccount, callBack) {
    let parames = {
      url: '',
      data: {
        service: 'Farm.applyWithdraw',
        farmId: farmId,
        totalMoney: totalMoney,
        toAccount: toAccount,
      },
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    this.request(parames);
  }
}
export { Cash };