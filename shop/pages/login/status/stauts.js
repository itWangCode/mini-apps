// pages/login/status/stauts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasFirst: false,
    hasDefeated: false,//审核失败
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let first = options.first;
    let fail = options.fail;//失败
    let checkReason = options.checkReason;
    console.log(checkReason);
    if (first == 1) {
      this.setData({
        has: true,
        hasFirst: true,//第一次      
        hasDefeated: false,//审核失败
      });
    } else if (fail == 1) {
      this.setData({
        has: false,
        hasFish: false,
        hasDefeated: true,
      });
    } else {
      this.setData({
        hasFirst: true,//第一次      
        hasDefeated: false,//审核失败
        has: false,
      });
    }
  },

})