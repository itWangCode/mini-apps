// pages/shop_mes/store_name/name.js
import { Name } from 'name-model.js';
var name = new Name;
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: '',
    hasPrice: true,
    hasName: true,

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let farmName = options.farmName;
    let storePrice = options.storePrice;
    if (storePrice == "undefined") {
      this.setData({
        hasPrice: false,
      });
    }
    if (farmName == "undefined") {
      this.setData({
        hasName: false,
      });
    }
    this.setData({
      farmName: farmName,
      storePrice: storePrice
    });
  },
  /**
  清空
   */
  onbindReset: function (e) {
    if (this.data.hasPrice) {
      this.setData({
        storePrice: '',
      });
    }
    if (this.data.hasName) {
      this.setData({
        farmName: '',
      });
    }
  },

  /**
   保存--提交
   */
  bindSave(e) {
    let ea = e.detail.value;
    let farmName = ea.farmName;
    let storePrice = ea.storePrice;
    let farmId = wx.getStorageSync("farmId");
    let fildName = "";
    let fildVale = "";
    //表单验证
    if (storePrice != null) {
      if (storePrice.trim().length == 0) {
        wx.showModal({
          title: '',
          content: '请输入价钱',
          showCancel: false,
          confirmText: '知道了',
          confirmColor: '#7188FF',
        });
        return false
      }
    }
    if (farmName != null) {
      if (farmName.trim().length == 0) {
        wx.showModal({
          title: '',
          content: '请输入店铺',
          showCancel: false,
          confirmText: '知道了',
          confirmColor: '#7188FF',
        });
        return false
      }
    }

    if (this.data.hasPrice) {//修改价钱
      fildName = "store_price";
      fildVale = storePrice;

    } else if (this.data.hasName) { //修改名称
      fildName = "farm_name";
      fildVale = farmName;
    }

    name.save(farmId, fildName, fildVale, (res) => {
      if (res.code == 0) {
        wx.navigateBack({
          delta: 1
        });
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];  //上一个页面
        let firstPage = pages[pages.length - 3];  //上两页页面
        prevPage.setData({
          farmName: farmName,
          storePrice: storePrice,
        });
        firstPage.setData({
          hasEdit: 1,//修改过;
        })
      } else if (res.code == 1) {
        wx.showToast({
          title: '未发生变动',
        });
        wx.navigateBack({
          delta: 1
        });
      }
    });
  },
})