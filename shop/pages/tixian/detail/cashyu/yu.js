// yu.js
var app = getApp();
Page({

  data: {

  },
  onLoad: function (options) {
    let [fWeixin, cashYu] = [options.fWeixin, options.cashYu];
    this.setData({
      fWeixin: fWeixin,
      cashYu: cashYu
    })

  },
  /**
   提现
   */
  bindTiXin: function () {
    let cashBalance = this.data.cashYu;
    let fWeixin = this.data.fWeixin;
    wx.redirectTo({
      url: '../../tixian?cashBalance=' + cashBalance + '&fWeixin='+fWeixin,
    });
  },

  /**
   查看余额账户明细
   */
  bindmingxi: function () {
    wx.redirectTo({
      url: '../../../mingxi/zhangdan',
    });
  },

})