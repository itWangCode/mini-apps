// pages/mes_ping/fankui/fan.js

var common = require('../../../utils/common.js');
import { Fan } from 'fan-model.js';
var fan = new Fan;
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imges: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   上传图片
   */
  bindpic: function () {
    common.chooseImage(1, (res) => {
      console.log(res);
      this.setData({
        imges: res
      });
    });
  },
  /**
   发送反馈意见
   */
  sendFan: function (e) {
    let ev = e.detail.value;
    let [content, tel, farmId] = [ev.content, ev.tel, wx.getStorageSync("farmId")];
    //验证
    if (content.trim().length == 0) {
      fan.tip('请填写反馈内容');
    } else {
      fan.valid(tel, '请输入正确的手机号码');
    }

    let tempFilePaths = this.data.imges;
    if (tempFilePaths.length != 0) {
      this.sendPic(tempFilePaths[0], (res) => {
        console.log(res);
        if (res.data.code == 0) {
          let photo = res.data.url;
          fan.addFeedback(farmId, content, tel, photo, (res) => {
            if (res.code == 0) {
              wx.showToast({
                title: '反馈成功', 
                icon: 'success',
                duration: 2000
              });
              wx.navigateBack({
                delta: 2
              });
            } else {
              wx.showToast({
                title: res.message
              });
            }
          });
        }
      });
    } else {
      let photo = '';
      fan.addFeedback(farmId, content, tel, photo, (res) => {
        if (res.code == 0) {
          wx.navigateBack({
            delta: 2
          });
        }
      });
    }


  },

  /**
   发送图片
   */
  sendPic: function (filePath, callback) {
    wx.uploadFile({
      url: 'https://qzyapi.51urmaker.com/v1_1/?service=FarmApply.setAvatar',
      filePath: filePath,
      name: 'cover_photo',
      formData: {
        'postFileName': 'cover_photo'
      },
      header: {
        'content-type': 'multipart/form-data'
      },
      success: function (res) {
        let data = res.data;
        data = JSON.parse(data);
        callback && callback(data);
      }
    });
  }


})
