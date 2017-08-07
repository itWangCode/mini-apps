
import { Base } from '../../utils/base.js';
class Inform extends Base {
  constructor() {
    super();
  }
  /**
   *获取通知列表
   */
  getInformList(farmId, pageIndex, pageSize, callBack) {
    let parames = {
      url: '',
      data: {
        service: 'App.getSysNotesList',
        farmId: farmId,
        pageIndex: pageIndex,
        pageSize: pageSize
      },
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    this.request(parames);
  }


}
export { Inform };