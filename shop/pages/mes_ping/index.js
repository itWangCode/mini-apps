// pages/mes_ping/index.js
var app = getApp();
import { Ping } from 'ping-model.js';
var ping = new Ping;
var WxParse = require('../../wxParse/wxParse.js');
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
    //常见问题
    ping.getOptions((res) => {
      console.log(res);
      if (res.code == 0) {
        let article = res.info.content;
        WxParse.wxParse('article', 'html', article, this, 5);
      }
    });

  },
  /**
   反馈意见
   */
  bindfankui: function () {
    wx.navigateTo({
      url: 'fankui/fan',
    });
  },

  /**
   联系 
   */
  bindContact: function () {
    ping.getContact((res) => {
      if (res.code == 0) {
        this.setData({
          telphoneNumber: res.list,
          hasTel: true,
        });
      } else {
        ping.tip('获取联系方式失败!');
      }
    })
  },

  /**
   拨打电话
   */
  bindcall: function (e) {
    let numbdrer = e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: numbdrer,
    });
  },
  /**
   取消
   */
  bindcancel: function () {
    this.setData({
      hasTel: false,
    });
  }
})