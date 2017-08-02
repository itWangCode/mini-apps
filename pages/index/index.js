var app = getApp();
import { Home } from 'index-model.js';
var home = new Home;
Page({
  data: {
    hasClick: false,
    singCenter: [{
      src: '/images/index/icon_message.png',
      text: '消息中心',
      bind: 'onbindTong',
      id: 0,
      hasClick: false,
    },
    {
      src: '/images/index/icon_check.png',
      text: '核对消息码',
      bind: 'onbindCheck',
      id: 1,
      hasClick: false,
    },
    {
      src: '/images/index/icon_fabu.png',
      text: '发布活动',
      bind: 'onbindActive',
      id: 2,
      hasClick: false,

    },
    {
      src: '/images/index/icon_shop.png',
      text: '店铺信息',
      bind: 'onbindShop',
      id: 3,
      hasClick: false,

    }, {
      src: '/images/index/icon_team.png',
      text: '我的订单',
      bind: 'onbindOrder',
      id: 4,
      hasClick: false,

    }, {
      src: '/images/index/icon_huodong.png',
      text: '其他活动',
      bind: 'onbindOther',
      id: 5,
      hasClick: false,
    }, {
      src: '/images/index/icon_ser.png',
      text: '联系平台',
      bind: 'onbindPing',
      id: 6,
      hasClick: false,
    }]
  },
  /**
   加载用户信息
   */
  onLoad: function () {
    wx.showNavigationBarLoading();
    let ui = app.globalData.info;
    let farmId = wx.getStorageSync("farmId");
    let pca = wx.getStorageSync('PCA');//省市区  
    this.setData({
      hasClick: false,
    });
    if (ui == '' || ui == null) {
      home.getShop(farmId, (res) => {
        if (res.code == 0) {
          app.globalData.info = res.info;
          this.setData({
            userInfo: res.info,
          });
          ui = res.info;
          if (pca == '' || pca == null) {
            home.getPCA((res) => {
              wx.hideNavigationBarLoading();
              if (res.code == 0) {
                pca = res.list;
                wx.setStorageSync('PCA', pca);//省市区       
                this.doAddress(pca, ui);
              }
            });
          } else {
            wx.hideNavigationBarLoading();
            this.doAddress(pca, ui);
          }
        } else {
          wx.hideNavigationBarLoading();
          wx.showToast({
            title: '获取店铺信息失败',
            icon: 'success',
            duration: 2000
          });
        }
      });
    } else {

      this.setData({
        userInfo: ui,
      });
      if (pca == '' || pca == null) {
        home.getPCA((res) => {
          wx.hideNavigationBarLoading();
          if (res.code == 0) {
            pca = res.list;
            wx.setStorageSync('PCA', pca);//省市区       
            this.doAddress(pca, ui);
          }
        });
      } else {
        wx.hideNavigationBarLoading();
        this.doAddress(pca, ui);
      }
    }
  },

  /**
   * 点击效果,延迟跳转
   */
  setTimeEffects(url,id) {
    let arrinfo = this.data.singCenter;
    for (let i in arrinfo) {
      if (arrinfo[i].id == id) {
        arrinfo[i].hasClick = true;
      }
    }
    this.setData({
      singCenter: arrinfo
    });
    setTimeout(function () {
      wx.navigateTo({
        url: url,
      });
    }, 100);
  },


  /**
  显示地址文字信息
  */

  doAddress(pca, ui) {
    let pcaAdd = '';
    pcaAdd = home.getAddress(pca, ui);
    wx.setStorageSync("Address", pcaAdd);
    this.setData({
      addressD: pcaAdd,
    });
  },

  onReady: function () {
    console.log('indexonraady');

  },
  onShow: function () {
    //返回执行这里 只要店铺名称 和地址有修改就调用接口
    console.log('indexoonShow');
    let editFlag = this.data.hasEdit;
    let farmId = wx.getStorageSync("farmId");
    /**
     去掉点击效果
     */
    let arrinfo = this.data.singCenter;
    for (let i in arrinfo) {     
        arrinfo[i].hasClick = false;      
    }
    this.setData({
      singCenter: arrinfo,
    });

    if (editFlag == 1) {//表示修改过
      home.getShop(farmId, (res) => {
        if (res.code == 0) {
          app.globalData.info = res.info;
          // wx.setStorageSync("info", res.info);
          this.setData({
            userInfo: res.info,
          });
          let pca = wx.getStorageSync('PCA');//省市区 
          this.doAddress(pca, res.info);
        }
      });
    }

    //删除照片 为重新上传的情况
    if (this.data.hasDPic) {
      let tempFilePaths = this.data.tempFilePaths;
      let farmId = wx.getStorageSync("farmId");
      wx.showLoading({
        title: '图片信息更新中',
      })
      home.alterCoverPhoto(farmId, tempFilePaths, (res) => {
        if (res.code == 0) {
          wx.hideLoading();
          wx.showToast({
            title: '店铺照片,更新图片信息成功',
          });
          home.getShop(farmId, (res) => {
            if (res.code == 0) {
              app.globalData.info = res.info;
              this.setData({
                userInfo: res.info,
              });
              let pca = wx.getStorageSync('PCA');//省市区 
              this.doAddress(pca, res.info);
            }
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '店铺照片,图片更新信息失败!请重新编辑',
          });
        }
      });
    }


  },
  onHide() {
    this.setData({
      hasEdit: 0,
      hasDPic: false,
      hasClick: false,
      tempFilePaths: [],
    });
  },


  /**
   店铺信息 --点击头像部分
   */
  onbindMes: function () {

    wx.navigateTo({
      url: '../shop_mes/index',
    });

  },
  /**
  明细
   */
  bindming: function () {
    wx.navigateTo({
      url: '../mingxi/zhangdan'
    });
  },

  /**
   提现
   */
  bindti: function () {
    let cashBalance = this.data.userInfo.cashBalance;
    let fWeixin = this.data.userInfo.fWeixin;
    wx.navigateTo({
      url: '../tixian/tixian?cashBalance=' + cashBalance + '&fWeixin=' + fWeixin,
    });
  },

  /**
   点击cash
   */
  bindDeposit: function () {
    let cashYu = this.data.userInfo.cashBalance;
    let fWeixin = this.data.userInfo.fWeixin;
    wx.navigateTo({
      url: '../tixian/detail/cashyu/yu?cashYu=' + cashYu + '&fWeixin=' + fWeixin,
    });
  },

  /**
   消息中心
   */
  onbindTong: function (e) {   
    let id = parseInt(e.currentTarget.dataset.id);
    let url = '../tongzhi/tong';
    this.setTimeEffects(url, id);
  },
  /**
   校队消息码
    */
  onbindCheck: function (e) {

    let id = parseInt(e.currentTarget.dataset.id);
    let url = '../check/index';
    this.setTimeEffects(url, id);
  
  },

  /**
发布活动
*/

  onbindActive: function (e) {
    let id = parseInt(e.currentTarget.dataset.id);
    let url = '../issue_act/activity';
    this.setTimeEffects(url, id);
  },
  /**
店铺信息
*/
  onbindShop: function (e) {
    let id = parseInt(e.currentTarget.dataset.id);  
    let url = '../shop_mes/index';
    this.setTimeEffects(url,id);
  },

  /**
 我的订单
 */

  onbindOrder: function (e) {
    let id = parseInt(e.currentTarget.dataset.id);
    let url = '../my_order/index';
    this.setTimeEffects(url, id);   
  },

  /**
    其他活动
    */
  onbindOther: function (e) {
    let id = parseInt(e.currentTarget.dataset.id);
    let url = '../other_act/index';
    this.setTimeEffects(url, id);
  },

  /**
 联系平台
  */
  onbindPing: function (e) {
    let id = parseInt(e.currentTarget.dataset.id);
    let url = '../mes_ping/index';
    this.setTimeEffects(url, id);
  },


})