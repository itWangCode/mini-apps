// pages/check/status/status.js

var app = getApp();
import { Status } from 'status-model.js';
var status = new Status;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let gameCode = options.gameCode;
    let no=options.no;
    let info = app.globalData.checkinfo;
    let farmId = wx.getStorageSync("farmId");
    console.log(info);
    // info = JSON.parse(info);
    if (no==1){
      this.setData({
      hasStatus:1,
      });
    }

    this.setData({
      perInfo: info,
      gameCode: gameCode,
    });
   
  },
  /**
   返回
   */
  bindback: function () {
    wx.redirectTo({
      url: '../index',
    });
  },
  /**
   确认核对
   */
  bindconf: function () {
    let farmId = wx.getStorageSync("farmId");
    let gameCode = this.data.gameCode;
    wx.showNavigationBarLoading();
    status.checkCode(farmId, gameCode, (res) => {
      if (res.code == 0) {//核消成功
        wx.hideNavigationBarLoading();
        wx.redirectTo({
          url: '../status02/status',
        });
      } else if (res.code == 1) {
        wx.showToast({
          title: res.message,
          icon: 'success',
          duration: 2000,
        });
        wx.redirectTo({
          url: '../no/no',
        });
      }
      else {
        wx.hideNavigationBarLoading();
        wx.showToast({
          title: '核销失败!请重新输入',
          icon: 'success',
          duration: 2000,
        });
        wx.redirectTo({
          url: '../no/no',
        });
      }
    });

  }

})