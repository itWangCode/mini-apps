import { Base } from '../../utils/base.js';
class Ping extends Base {
  constructor() {
    super();
  }
  /**
    获取常见问题
    */
  getOptions(callBack) {
    let parames = {
      url: '',
      data: {
        service: 'App.getSystemSet',
        id: 2,
      },
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    this.request(parames);
  }
  /**
   获取联系电话 
   */
  getContact(callBack) {
    let parames = {
      url: '',
      data: {
        service: 'App.getServerTels',      
      },
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    this.request(parames);
  }


}
export { Ping };