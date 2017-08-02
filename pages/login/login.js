
import { Login } from 'login-model.js';
var login = new Login;
var app = getApp();

var countdown = 60;
var settime = function (that) {
  if (countdown == 0) {
    that.setData({
      is_show: true,
      isStop: true,
    })
    countdown = 60;
    return;
  } else {
    that.setData({
      is_show: false,
      last_time: countdown
    });
    countdown--;
  }
  setTimeout(function () {
    settime(that)
  }
    , 1000);
}


Page({
  data: {
    hasValid: false,//手机验证 
    last_time: '',
    is_show: true,
    focus1: true,
    hasClick: false,//点击登陆
    hasTen:false,//发送验证码
  },

  onLoad: function () {
    //一小时之前是否登录;
    let loginTime = wx.getStorageSync("loginTime");
    let nowTime = new Date().getTime();
    console.log(nowTime);
    console.log(loginTime);
    if (loginTime == '' || loginTime == null) {
    } else {
      if (loginTime >= nowTime) {
        console.log('直接进入首页');
        wx.redirectTo({
          url: '../index/index',
        });
      } else {
        console.log("重新登录");
      }
    }
    this.setData({
      hasClick: false,//点击登陆
    });
  },


  /**
   获取手机验证码
   */
  _getToken: function (e) {
    var that = this;
    // 将获取验证码按钮隐藏60s，60s后再次显示

    let mobile = e.detail.value.mobile;
    if (login.valid(mobile, '请输入正确的手机号')) {
      this.setData({       
        hasTen: true,//点击效果
      });
      login.getToken(mobile, (res) => {
        if (res.code == 0) {
          console.log(res.token);
          //6位
          this.setData({
            token: res.token,
            isStop: false,
            focus2: true,           
          });         
            that.setData({
              hasTen:false,
              is_show: (!that.data.is_show)   //false
            });              
          settime(that);
        } else {
          this.setData({
            hasTen: false,//点击效果
          });
          wx.showToast({
            title: '获取验证码失败！',
          });
        }
      });
    };
  },

  /**
   校验
   */
  checkValid: function (value) {
    console.log(value);
    if (value != this.data.token) {
      this.setData({
        hasValid: true,
      });
    } else {
      this.setData({
        hasValid: false,
      });
      console.log('else');
    }
  },

  /**
   登录
   */
  _tokenLogin: function (e) {
    let ev = e.detail.value;
    let [fPhone, token] = [ev.mobile, ev.token];
    let isT = this.data.isStop;
    //验证通过
    if (login.valid(fPhone, '请输入正确的手机号')) {
      if (token.length == 6) {
        if (isT) {
          login.tip('验证码已经失效，请重新发送！');
          return
        } else {
          //校验验证码
          this.checkValid(token);
          if (!this.data.hasValid) {
            //显示登入中.....
            wx.showLoading({
              title: '登录中...',
            });
            login.login(fPhone, token, this._loginCallBack);
          }
        }
      } else {
        login.tip('请输入验证码');
      }
    }
  },
  /**
   点击效果
   */
  clickEff(url) {
    this.setData({
      hasClick: true,
    });
    setTimeout(function () {
      wx.redirectTo({
        url: url,
      });
    }, 100);
  },
  /**
   登录回调函数
   */
  _loginCallBack: function (res) {
    console.log(res);
    if (res.code == 0) {//跳转等 
      let check = res.info.isCheck;
      wx.hideLoading();//隐藏登入中.....
      if (check == 1) {//通过 跳转到首页
        let loginTime = new Date().getTime();
        loginTime = loginTime + 3600 * 1000 * 1;
        wx.setStorageSync("loginTime", loginTime);//登录时间
        app.globalData.info = res.info;
        wx.setStorageSync("farmId", res.info.farmId);
        this.clickEff('../index/index');
      } else if (check == 0) {//未审核
        this.clickEff('status/stauts');
      } else if (check == 2) {//审核失败
        console.log('审核失败');
        this.clickEff('status/stauts?fail=1&checkReason=' + res.info.checkReason);
      }
    } else if (res.code == 1) {//入驻
      wx.hideLoading();//隐藏登入中.....
      login.tip(res.message + '请先入驻');
      this.setData({
        hasRuzhu: true,
      });
    }
  },
  /**
   入驻
   */
  _ruzhu: function () {
    wx.redirectTo({
      url: 'ruzhu/ruzhu',
    });
  },

  /**
   页面销毁
   */
  onUnload: function () {
    this.setData({
      hasClick: false,
    });
  }


});