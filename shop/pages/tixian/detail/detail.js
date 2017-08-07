// detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function (options) {

    let [fWeixin, time, toAccount, cashYu] = [options.fWeixin, options.time, options.toAccount, options.cashYu];
    this.setData({
      fWeixin: fWeixin,
      time: time,
      toAccount: toAccount,
      cashYu: cashYu,
    });
  },

  bindfish: function () {   
    let cashYu = this.data.cashYu;
    let fWeixin = this.data.fWeixin;
    wx.redirectTo({
      url: 'cashyu/yu?cashYu=' + cashYu + '&fWeixin=' + fWeixin,
    });
  }
})