// pages/issue_act/activity.js
import { Active } from 'activ-model.js';
var active = new Active;
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasList: false,
    hasClick:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    //获取发布活动列表
    let farmId = wx.getStorageSync("farmId");
    this.getActiveList(farmId);
  },
  /**
   获取活动列表
   */
  getActiveList: function (farmId) {
    active.getActiveList(farmId, (res) => {
      if (res.code == 0) {
        console.log(res);
        let list = res.list;
        console.log(list);
        let len = list.length;
        if (len > 0) {
          for (let i in list) {
            list[i].week = active.getWeeday(list[i]);
          }
        }
        console.log(list);
        this.setData({
          list: list,
          hasList: true,
        });

      } else if (res.code == 1) {
        this.setData({
          hasList: false,
        });
      }
    });
  },
  /**
   点击效果
   */
  setTimeEffects(url) { 
    setTimeout(function () {
      wx.navigateTo({
        url: url,
      });
    }, 100);
  },


  /**
   新建活动
   */
  addActive: function () {

    let ui = app.globalData.info;
    let times = ui.businessTimeS + '-' + ui.businessTimeE;
    let storePrice = ui.storePrice;
    this.setData({
      hasClick:true,
    });
    let url = 'active01/act_one?times=' + times + '&storePrice=' + storePrice;
    // wx.navigateTo({
    //   url: 'active01/act_one?times=' + times + '&storePrice=' + storePrice,
    // });
    this.setTimeEffects(url);
  },
  /**
   编辑
   */

  edit: function (e) {
    let activityId = e.currentTarget.dataset.activityId;

    let ui = app.globalData.info;
    let storePrice = ui.storePrice;
    console.log('编辑'+storePrice);
    let farmId = wx.getStorageSync('farmId');
    active.editActive(farmId, activityId, (res) => {
      if (res.code == 0) {
        wx.setStorageSync("activInfo", res.info);
        wx.navigateTo({
          url: 'active01/act_one?editActive=1&storePrice='+ storePrice,
        });
      }
    });
  },
  /**
   取消
   */
  cancelActive: function (e) {
    let activityId = e.currentTarget.dataset.activityId;
    let farmId = wx.getStorageSync('farmId');
    let that = this;
    wx.showModal({
      title: '',
      content: '是否取消当前发布的任务',
      showCancel: true,
      confirmText: '取消任务',
      confirmColor: '#7188FF',
      cancelText: '不操作',
      cancelColor: '#aaa',
      success: function (res) {
        if (res.confirm) {//删除
          active.deltActive(farmId, activityId, (res) => {
            if (res.code == 0) {
              that.getActiveList(farmId);
            }
          });
        }
      }
    });
  },

  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    let eidtid = this.data.eidtid;
    if (eidtid == 1) {//修改过
      let farmId = wx.getStorageSync("farmId");
      this.getActiveList(farmId);
    }
    this.setData({
      hasClick: false,
    });  
  },
  onUnload: function () {
    this.setData({
      eidtid: '',
    });
  },
  /**
   隐藏
   */
  onHide: function () {
    console.log('新建活动隐藏');
  }



})