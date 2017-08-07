
import { Base } from '../../utils/base.js';
class Login extends Base {
  constructor() {
    super();
  }
  /**
   *获取手机验证码
   */
  getToken(mobile, callBack) {
    let parames = {
      url: '',
      data: {
        service: 'Farm.getToken',
        mobile: mobile,
      },
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    this.request(parames);
  }
  /**
   登录
   @param   fPhone 手机号码
    @token   token 验证码
   */
  login(fPhone, token, callBack) {
    let parames = {
      url: '',
      data: {
        service: 'Farm.TokenLogin',
        sellerName: fPhone,
        token: token,
      },
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    this.request(parames);


  }

}
export { Login };