// pages/tongzhi/tong.js
var pageIndex = 1;
const pageSize = 10;
var hasMore = true;//是否还有
var app = getApp();

import { Inform } from 'tong-model.js';
var inform = new Inform;


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
    wx.showNavigationBarLoading();
    const farmId = wx.getStorageSync("farmId");
    inform.getInformList(farmId, pageIndex, pageSize, (res) => {
      console.log(res);
      if (res.code == 0) {
        let total = res.list.total;
       wx.hideNavigationBarLoading();
        if (total < (pageIndex * pageSize)) {
          this.setData({
            hasMore: false
          });
        } else {
          this.setData({
            hasMore: true,
          });
        }
        app.globalData.informList = res.list.list;
        this.setData({
          informList: res.list.list,
        });
      } else {
        wx.hideNavigationBarLoading();
        wx.showToast({
          title: '获取信息失败！',
        });
      }
    });

  },


  onbindDetail: function (e) {
   
   let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'detail/tong?id='+id,
    })
  },



  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (hasMore) {
      pageIndex++;//下一页
      wx.showNavigationBarLoading();
      inform.getInformList(farmId, pageIndex, pageSize, this._doInformList);
      console.log('调用了方法');

    }
  },
  _doInformList: function (res) {
    if (res.code == 0) {
      let informList = res.list.list;
      let lenght = informList.length;     
      let total = res.list.total;
      if (lenght > 0) {
        if ((pageIndex * pageSize) < total) {
          hasMore = true;
        } else {
          hasMore = false;
        }
        let oldinformList = this.data.informList;
        informList = oldinformList.concat(informList);
        app.globalData.informList = informList;
        this.setData({
          informList: informList,
          hasMore: hasMore,
          hasData: false,
        });
      } else if (lenght == 0) {
        wx.hideNavigationBarLoading();
        this.setData({
          hasData: true,//无数据
        });

      }


    }
  },

})