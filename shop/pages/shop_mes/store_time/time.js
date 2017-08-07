// pages/shop_mes/store_time/time.js
import { Time } from 'time-model.js';
const times = new Time;
var app = getApp();
const time = [];
for (let i = 0; i <= 24; i++) {
  time.push(i + ':00');
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasShow: false,
    time1: time,
    time2: time,

  },
  //改变时间
  chageTime: function () {
    this.setData({
      hasShow: true,
    }
    );

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let [times, timee] = [options.times, options.timee];
    let data = times + '-' + timee;
    this.setData({
      data: data
    });
  },
  /**
   选中时间
   */
  bindChange: function (e) {
    let val = e.detail.value;
    let etime1 = this.data.time1[val[0]];
    let etime2 = this.data.time2[val[1]];
    this.setData({
      times: etime1,
      timee: etime2
    });
  },

  /**
   确认 取消操作
   */
  queding: function (e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      hasShow: false,
    });
    if (id == 1) {//确定
      let times = this.data.times;
      let timee = this.data.timee;
      console.log(times + 'timee' + timee);
      let data = times + '-' + timee;
      this.setData({
        data: data
      });
    }
  },
  //保存时间

  saveTime: function () {
    let farmId = wx.getStorageSync("farmId");
    let fildName1 = 'business_time_s';
    let fildName2 = 'business_time_e';
    let fildVale1 = this.data.times;
    let fildVale2 = this.data.timee;

    times.saveTime(farmId, fildName1, fildVale1, (res) => {
      if (res.code == 0) {
        times.saveTime(farmId, fildName2, fildVale2, (res) => {
          if (res.code == 0) {
            wx.navigateBack({
              delta: 1
            });
            let pages = getCurrentPages();
            let prevPage = pages[pages.length - 2];  //上一个页面
            let firstPage = pages[pages.length - 3];  //上两页页面
            prevPage.setData({
              businessTimeS: fildVale1,
              businessTimeE: fildVale2,
            });
            firstPage.setData({
              hasEdit: 1,
            });
          }
        });

      }
    });



  },

})