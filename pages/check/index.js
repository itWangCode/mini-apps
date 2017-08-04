// pages/check/index.js

var app = getApp();
import { Check } from 'index-model.js';
var check = new Check;
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    check: [
      {
        value: '',
        id: 1,
      },
      {
        value: '',
        id: 2,
      },
      {
        value: '',
        id: 3,
      },
      {
        value: '',
        id: 4,
      },
      {
        value: '',
        id: 5,
      },
      {
        value: '',
        id: 6,
      },
    ],
    focus: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onload');
    var that = this;
    //获取手机屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight,
        });
      }
    });
    console.log(this.data.height);
  },


  bindInput: function (e) {

    let pwd = e.detail.value.trim();
    console.log(pwd);
    let len = pwd.length;
    console.log(len);
    let check1 = this.data.check;

    for (var i = 0; i < len; i++) {
      check1[i].value = pwd[i];
    }

    for (let j in check1) {
      let che = check1[j];
      if ((check1[j].id) > len) {
        che.value = '';
      }
    }
    this.setData({
      check: check1,
      pwd: pwd,
    });


    //6位有效消费码
    if (len == 6) {
      let farmId = wx.getStorageSync("farmId");
      //校验
      wx.showLoading({
        title: '正在查询中...',
      });
      check.inputCode(farmId, pwd, (res) => {
        console.log(res);
        console.log("res");
        if (res.code == 0) {
          wx.hideLoading();
          let info = res.info;
          console.log(info);
          app.globalData.checkinfo = info;
          if (info.pinStatus == '2') {
            wx.redirectTo({
              url: 'status/status?gameCode=' + pwd,
            });
          } else if (info.pinStatus=='4'){
            wx.redirectTo({
              url: 'status/status?gameCode=' + pwd+"&no=1",
            });
          }
           else {
            wx.redirectTo({
              url: 'no/no',
            });
          }
        } else if (res.code == 1) {
          wx.hideLoading();
          wx.redirectTo({
            url: 'no/no',
          });
        }
      });
    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


})