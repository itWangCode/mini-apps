// pages/issue_act/active02/act_one.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasClick: false,
    hasClick1:false,
  },

  /**
   继续发布
   */
  continueRel: function () {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面  
    prevPage.setData({
      eidtid: 1,
    });

    this.setData({
      hasClick1: true,
    });
    setTimeout(function () {
      wx.navigateBack({
        delta: 1,
      });
    }, 100);    
  },
  /**
   返回首页
   */
  backIndex: function () {
    this.setData({
      hasClick: true,
    });
    setTimeout(function () {
      wx.navigateBack({
        delta: 2,
      });
    }, 100);

  },
  onShow: function () {
    this.setData({
      hasClick: false,
      hasClick1:false,
    });
  }

})