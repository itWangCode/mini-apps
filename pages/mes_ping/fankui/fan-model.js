
import { Base } from '../../../utils/base.js';
class Fan extends Base {
  constructor() {
    super();
  }
  /**
   *添加反馈信息
   */
  addFeedback(farmId, content, tel, photo, callBack) {
    let parames = {
      url: '',
      data: {
        service: 'Farm.feedback',
        farmId: farmId,
        content: content,
        tel: tel,
        photo:photo
      },
      type: 'POST',
      sCallBack: function (res) {
        
        callBack && callBack(res.data);
      }
    }
    this.request(parames);
  }





}
export { Fan };