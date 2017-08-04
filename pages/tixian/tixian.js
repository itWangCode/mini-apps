// tixian.js
import { Cash } from 'tixian-model.js';
var cash = new Cash;
var app = getApp();
var formatTime = require("../../utils/util.js");

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
    let totalMoney = options.cashBalance;
    let fWeixin = options.fWeixin;
    this.setData({
      totalMoney: totalMoney,
      fWeixin: fWeixin,
    });
  },


  /**
   全部提现
   */
  bindAll: function () {
    let totalMoney = this.data.totalMoney;
    this.setData({
      hasCash: totalMoney
    });
  },
  //提现
  bindcash: function (e) {
    let toAccount1 = parseFloat(e.detail.value.toAccount);
    let [farmId, totalMoney, fWeixin] = [wx.getStorageSync("farmId"), parseFloat(this.data.totalMoney), this.data.fWeixin];

    if (toAccount1 > totalMoney) {
      wx.showToast({
        title: '你输入的金额超出您的余额，请重新输入',
      });
      return false
    }
    if (toAccount1 == 0 || toAccount1 == '' || isNaN(toAccount1)) {
      wx.showToast({
        title: '你输入提现金额',
      });
      return false
    }

    wx.showModal({
      title: '提现操作',
      content: '确认从账号余额中提现金额' + toAccount1 + '元吗?',
      confirmText: '确认',
      confirmColor: '#7188FF',
      cancelText: '取消',
      cancelColor: '#aaa',
      success: function (res) {
        if (res.confirm) {//删除         
          cash.applyWithdraw(farmId, toAccount1, fWeixin, (res) => {
            if (res.code == 0) {

              let timestamp = new Date().getTime();
              let mill = timestamp + 3600 * 1000*24;
              let date = new Date(mill);
              let formatTime1 = formatTime.formatTime(date);


              let pages = getCurrentPages();
              let prevPage = pages[pages.length - 2];  //上一个页面   
              prevPage.setData({
                hasEdit: 1,
              });
              
              wx.redirectTo({
                url: 'detail/detail?fWeixin=' + fWeixin + '&time=' + formatTime1 + '&toAccount=' + toAccount1 + '&cashYu=' + (totalMoney - toAccount1),
              });
            }
          });
        }
      }


    })





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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

})