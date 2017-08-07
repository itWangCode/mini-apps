// pages/mingxi/zhangdan.js
var app = getApp();
import { Account } from 'zhangdan-model.js';
var account = new Account;
var data = new Date();
var currentYear = data.getFullYear();
var currentMonth = data.getMonth() + 1;
var currentDay = data.getDate();
var pageIndex = 1;
var pageSize = 10;
var hasMore = true;


Page({

  data: {
    hasData: false,
    hasMore: hasMore,//加载更多
    scrollTop: 0,
    accountList: [],
  },

  onLoad: function (options) {
    console.log(pageIndex);
    console.log(hasMore);
    console.log("onLoad");
   let farmId = wx.getStorageSync("farmId");
    wx.showNavigationBarLoading();
    wx.getSystemInfo({//设置滚动高度
      success: (res) => {
        console.info(res.windowHeight);
        this.setData({
          scrollHeight: res.windowHeight
        });
      }
    });

    //账单列表
    wx.showLoading({ });
    account.getAccountLogsList(farmId, pageIndex, pageSize, this._doAccountList);
  },
  _doAccountList: function (res) {
    if (res.code == 0) {

      let accountList = res.list.list;
      let lenght = accountList.length;    
      let total = res.list.total;
      wx.hideLoading();
      if (lenght > 0) {
        accountList = account.doFormeTime(accountList, currentYear, currentMonth, currentDay);
        wx.hideNavigationBarLoading();
        if ((pageIndex * pageSize) < total) {
          hasMore = true;
        } else {
          hasMore = false;
        }
        let oldAccountList = this.data.accountList;
        console.log(oldAccountList);
        accountList = oldAccountList.concat(accountList);
        this.setData({
          accountList: accountList,
          hasMore: hasMore,
          hasData:false,
        });
      } else if (lenght == 0) {
        wx.hideNavigationBarLoading();
        this.setData({
          hasData: true,//无数据
        });

      }


    }
  },


  /**
   下拉刷新 
   */
  onReachBottom: function (e) {
    console.log('下一页');
    let farmId = wx.getStorageSync("farmId");
    if (hasMore) {
      pageIndex++;//下一页
      wx.showNavigationBarLoading();
      account.getAccountLogsList(farmId, pageIndex, pageSize, this._doAccountList);
      console.log('调用了方法');
    } else {//禁止下拉

    }
  },
  // bindscrolltolower:function(){
  //   console.log('下一页');
  //   if (hasMore) {
  //     pageIndex++;//下一页
  //     account.getAccountLogsList(farmId, pageIndex, pageSize, this._doAccountList);
  //     console.log('调用了方法');
  //   }
  // },

  onShow: function () {
    console.log("onshow");
  },
  onHide: function () {
    console.log("onHide");

  },
  onUnload: function () {
    pageIndex = 1;
  }


})