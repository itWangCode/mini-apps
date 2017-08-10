
import { Shop } from 'index-model.js';
var common = require('../../utils/common.js');
var shop = new Shop;
var app = getApp();
Page({
  data: {
    heaPic: {},
    tempFilePaths: [],//手机上传路径

  },
  onLoad: function (options) {

    let usInfo = app.globalData.info;
    console.log(usInfo);

    if (usInfo != null && usInfo != '') {
      let codeNames = this.changeGe(usInfo.codeNames);
      let gameNames = this.changeGe(usInfo.gameNames);
      let coverPic = usInfo.coverPic;//商铺照片   
      let coverPicArr = [];
      if (coverPic != '' && coverPic!=null) {
        coverPicArr = coverPic.split(',');
      }       
      console.log(coverPicArr);
      this.setData({
        usInfo: usInfo,
        farmName: usInfo.farmName,
        heaPic: usInfo.headLogo,//头像
        storePrice: usInfo.storePrice,
        businessTimeE: usInfo.businessTimeE,
        businessTimeS: usInfo.businessTimeS,
        addEd: usInfo.address,
        address: wx.getStorageSync("Address"),
        codeIds: usInfo.codeIds,
        gameIds: usInfo.gameIds,
        codeNames: codeNames,
        gameNames: gameNames,
        tempFilePaths: coverPicArr,//店铺照片         
      });
      console.log("未销毁");
    }
  },
  /**
   转行格式
   */
  changeGe: function (obj) {
    return obj.replace(/\,/g, '、')
  },

  /**
   店铺头像
   */
  bindHeadPor() {
    let farmId = wx.getStorageSync("farmId");
    let fildName = 'head_logo';
    common.chooseImage(1, (res) => {
      let singTempFilePaths = res;
      this.setData({
        heaPic: res,
      });
      console.log(singTempFilePaths.length);
      if (singTempFilePaths.length > 0) {
        wx.showLoading({
          title: '上传图片中....',
        });
        //上传图片
        shop.uploadFiles(singTempFilePaths[0], (res) => {
          if (res.code == 0) {
            let fildVale = res.url;
            //修改头像
            this.alterPic(farmId, fildName, fildVale);
          } else {
            wx.showModal({
              title: '提示',
              content: '店铺照片上传失败,请稍后重新上传',
            });
            wx.hideLoading();
            return false
          }
        });
      }
    });
  },
  /**
   头像修改
   */

  alterPic: function (farmId, fildName, fildVale) {
    shop.alterHeaderPhoto(farmId, fildName, fildVale, (res) => {
      if (res.code == 0) {
        wx.hideLoading();
        wx.showToast({
          title: '上传成功',
        });
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];  //上一个页面
        prevPage.setData({
          hasEdit: 1,//修改过;
        });
      } else {
        wx.hideLoading();
        wx.showToast({
          title: '上传失败,请重新上传',
        });
        this.setData({
          heaPic: '',
        });
      }
      console.log(res);
    });

  },

  /**
   店铺名称
   */
  bindName(e) {
    let ev = e.currentTarget.dataset;
    let data = ev.data;
    let storePrice = ev.price;
    wx.navigateTo({
      url: 'store_name/name?farmName=' + data + '&storePrice=' + storePrice,
    });
  },

  /**
   店铺时间
  */

  bindTime(e) {
    let ev = e.currentTarget.dataset;
    let [timeS, timeE] = [ev.times, ev.timee];
    wx.navigateTo({
      url: 'store_time/time?times=' + timeS + '&timee=' + timeE,
    });
  },
  /**
   上传店铺照片
   */
  getPic() {
    //获取店铺照片长度;
    let tempFilePaths = this.data.tempFilePaths;
    let len = tempFilePaths.length;
    let count = 5 - len;
    common.chooseImage(count, (res) => {
      let newTemp = res;
      let len = newTemp.length;
      let farmId = wx.getStorageSync("farmId");
      this.fildPic(farmId, len, newTemp, tempFilePaths);
    });
  },
  /**
   删除店铺照片
   */
  detPic(e) {
    let [arr, id] = [this.data.tempFilePaths, parseInt(e.currentTarget.dataset.id)];
    arr.splice(id, 1);
    this.setData({
      tempFilePaths: arr,
    });
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      hasDel: 1,//删除过照片
      hasDPic: true,
      tempFilePaths: arr,
    });
  },
  /**
   上传照片
   */
  fildPic: function (farmId, len, newTemp, tempFilePaths) {
    let pices = [];
    let singnewTemp = '';
    let that = this;
    if (len > 0) {
      wx.showLoading({
        title: '上传图片中....',
      });
      for (let i = 0; i < len; i++) {
        singnewTemp = newTemp[i];
        shop.uploadFiles(singnewTemp, (res) => {
          if (res.code == 0) {
            pices.push(res.url);
            if (i == len - 1) {
              //修改店铺照片
              pices = tempFilePaths.concat(pices);
              that.alterCoverPic(farmId, pices);
            }
          } else {
            wx.showModal({
              title: '提示',
              content: '店铺照片上传失败,请稍后重新上传',
            });
            wx.hideLoading();
            return false
          }
        });
      }
    }
  },


  /**
   修改店铺照片
   */
  alterCoverPic: function (farmId, pices) {
    console.log(pices);
    shop.alterCoverPhoto(farmId, pices, (res) => {
      console.log(res);
      if (res.code == 0) {
        wx.hideLoading();
        wx.showToast({
          title: '上传成功',
        });
        this.setData({
          tempFilePaths: pices,
        });

        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];  //上一个页面
        prevPage.setData({
          hasEdit: 1,//修改过;
          hasDPic: false,
        });
      } else {
        wx.hideLoading();
        wx.showToast({
          title: '上传失败,请重新上传',
        });
        this.setData({
          tempFilePaths: [],
        });
      }
    });
  },

  /**
   修改游戏
   */
  alterGame: function () {
    console.log(this.data.gameIds);
    wx.navigateTo({
      url: '../login/game/game?editG=1&gameIds=' + this.data.gameIds,
    });
  },
  /**
   修改标签
   */
  alterTag: function () {
    console.log(this.data.codeIds);
    wx.navigateTo({
      url: '../login/tag/tag?editG=1&codeIds=' + this.data.codeIds,
    });
  },

  /**
   修改地址
   */
  alterAdd: function () {
    wx.navigateTo({
      url: 'store_address/address?addEd=' + this.data.addEd,
    });

  },

  /**
   退出登录
   */
  bindLogin: function () {
    //更新用户信息  

    let farmId = wx.getStorageSync("farmId");
    shop.getShop(farmId, (res) => {
      if (res.code == 0) {
        wx.setStorageSync("loginTime", 0);
        wx.showToast({
          title: '退出成功',
          icon: 'success',
          duration: 2000
        });
        wx.reLaunch({
          url: '../login/login',
        });
      } else {    

      }
    });


  }

})