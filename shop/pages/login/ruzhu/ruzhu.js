// pages/login/ruzhu/ruzhu.js

import { Register } from 'ruzhu-model.js';
var register = new Register;

var common = require('../../../utils/common.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasTIg: true,//店铺标签
    hasTigList: false,//店铺标签
    areas: [],
    hasPic: false,
    hasPicBtn: true,
    hasCheck: false,//手机验证
    hastime: true,//默认时间
    hastime1: true,//默认时间
    picBg: true,//法人照片背景色
    hasPicZ: false,//资质照片
    picBgZ: true,//资质照片   
  },

  onLoad() {
    //清除第一次选择标签
    wx.clearStorageSync('gameIds');
    wx.clearStorageSync('gameNames');
    wx.clearStorageSync('codeIds');
    wx.clearStorageSync('codeNames');
    wx.showNavigationBarLoading();
    //获取地址：
    let pca = wx.getStorageSync("PCA");
    if (pca == '' || pca == null) {
      register.getPCA(this._getPCA);
      console.log('1省市区');
    } else {
      console.log('省市区');
      let prics = register.restPCA(pca);
      wx.hideNavigationBarLoading();
      this.setData({
        priv: prics,
      });
    }
    //初始化表单验证规则
    this.WxValidate = register.initFormVa(app);
  },


  /**
   获取省市区
   */
  _getPCA: function (res) {
    if (res.code == 0) {
      let list = res.list;
      wx.setStorageSync('PCA', list);
      let pric = register.restPCA(list);
      wx.hideNavigationBarLoading();
      this.setData({
        priv: pric,
      });
    } else {
      wx.hideNavigationBarLoading();
      wx.showToast({
        title: '获取地区失败',
      });
    }
  },

  /**
   省
  */
  bindPicProvince: function (e) {
    let ids = parseInt(e.detail.value);//id
    let sid = this.data.priv[ids].id;//省id
    let pca = wx.getStorageSync('PCA');
    let city = pca[ids].citys;
    let areas = [];
    let cit = register.restPCA(city);
    this.setData({
      privIndex: e.detail.value,
      pid: sid,
      cit: cit,//市
      citIndex: '',
      areas: areas,//区
      areaIndex: '',
    });
  },
  bindPicCity: function (e) {
    let ids = parseInt(e.detail.value);//id
    let citt = this.data.cit;
    let cid = citt[ids].id;//城市id  
    let pca = wx.getStorageSync('PCA');
    let city = pca[ids].citys;
    let area = '';
    let that = this;
    for (let j in pca) {
      let pid = pca[j].id;
      if (pid == that.data.pid) {
        let city = pca[j].citys;
        for (let k in city) {
          if (city[k].id == cid) {
            let areas = city[k].area;
            area = areas;
          }
        }
        that.setData({
          citIndex: e.detail.value,
          cid: cid,
          areas: area,
          areaIndex: '',
        });
        return;
      }
    }
  },
  bindPicArea: function (e) {
    this.setData({
      areaIndex: e.detail.value,
    });

  },
  /**
   店铺标签
   */
  changTip: function () {
    wx.navigateTo({
      url: '../tag/tag',
    });
  },
  /**
   店铺照片
   */
  getPic() {
    common.chooseImage(5, (res) => {
      let lengthPic = res.length;
      if (lengthPic > 0) {
        app.globalData.editPic = res;//店铺照片      
        this.setData({
          lengthPic: lengthPic,//照片长度
          hasPic: true,
          hasPicBtn: false,
        });
      }
    });
  },

  /**
   编辑照片
   */
  editPic: function (e) {
    wx.navigateTo({
      url: 'editpic/pic',
    });
  },
  /**
   店铺时间选择
   */
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value,
      hastime: false,
    })
  },
  bindTimeChange1: function (e) {
    this.setData({
      time1: e.detail.value,
      hastime1: false,
    })
  },

  /**
   选择店内游戏
   */
  getGrames: function () {
    wx.navigateTo({
      url: '../game/game',
    });
  },

  regFish: function (e) {
    let ev = e.detail.value;
    let [farmName, storePrice, proid, cityid, areaid, address, phone, businessTimeS, businessTimeE] = [ev.farmName, ev.storePrice, ev.proid, ev.cityid, ev.areaid, ev.address, ev.phone, ev.businessTimeS, ev.businessTimeE];

    let [province, city, area] = [this.data.priv[proid].id, this.data.cit[cityid].id, this.data.areas[areaid].id];


    let codeIds = wx.getStorageSync("codeIds");
    let gameIds = wx.getStorageSync("gameIds");
    let picL = this.data.lengthPic;//照片  

    // //表单验证
    if (register.checkForm(this.WxValidate.checkForm(e), this.WxValidate, this)) {
      this.setData({
        isPrice: false,
        isPhone: false,
        isAddress: false,
        isfarmName: false,
      });
      console.log('往下走了……');
      //验证店铺标签/照片/邮箱 
      if (register.isEmpty(codeIds)) {
        register.tip('请选择店铺标签');
        return false
      } else if (picL == 0) {
        register.tip('请上传店铺照片');
        return false
      } else if (register.isEmpty(gameIds)) {
        register.tip('请选择游戏标签');
        return false
      }
      let codeNames = wx.getStorageSync("codeNames");
      let gameNames = wx.getStorageSync("gameNames");
      codeIds = codeIds.join(',');
      codeNames = codeNames.join(',');
      gameIds = gameIds.join(',');
      gameNames = gameNames.join(',');


      let addData1 = {
        farmName: farmName,
        storePrice: storePrice,
        province: province,
        city: city,
        area: area,
        address: address,
        phone: phone,
        codeIds: codeIds,
        codeNames: codeNames,
        gameIds: gameIds,
        gameNames: gameNames,
        businessTimeS: businessTimeS,
        businessTimeE: businessTimeE,
      }
      wx.showLoading({
        title: '上传图片中,请稍等!',
      });

      /**
       上传图片
       */
      let tempFilePathsArr = app.globalData.editPic;//店铺照片
      this.fileUpPic(tempFilePathsArr, addData1);
    }

    

  },

  /**
   上传照片
   @param tempFilePathsArr:图片数组
   @param addData1 第一步所填参数信息
   */
  fileUpPic: function (tempFilePathsArr, addData1) {
    let that = this;
    let [picLen, pices, tempFilePaths] = [tempFilePathsArr.length, [], ''];
    for (let i = 0; i < picLen; i++) {
      tempFilePaths = tempFilePathsArr[i];
      register.uploadFiles(tempFilePaths, (res) => {
        if (res.code == 0) {
          pices.push(res.url);
          if (i == picLen - 1) {
            console.log("pices");
            console.log(pices);
            //保存数据
            that.saveData(pices, addData1);
          }
        } else {
          wx.showModal({
            title: '提示',
            content: '店铺照片上传失败,请稍后重新上传',
          });
          wx.hideNavigationBarLoading();
          return false
        }
      });
    }
  },

  /**
   保存第一步数据
   */

  saveData(pices, addData1) {
    console.log('baoshu');
    let coverPhoto = {
      coverPhoto: pices,
    }
    Object.assign(addData1, coverPhoto);
    app.globalData.addData1 = addData1;
    console.log(addData1);
    app.globalData.editPic = '';
    wx.hideLoading();
    wx.redirectTo({
      url: '../entero/one',
    });

  },


  onShow() {
    //店铺照片
    let editPic = app.globalData.editPic;
    this.setData({
      lengthPic: editPic.length,
    });

    //店铺标签
    if (wx.getStorageSync("codeIds")) {
      let names = JSON.stringify(wx.getStorageSync("codeNames"));
      names = register.changeForm(names);
      this.setData({
        hasTIg: false,
        hasTigList: true,
        tagList: names,
      });
    } else {
      this.setData({
        hasTIg: true,
        hasTigList: false,
      });
    }
    //游戏标签
    if (wx.getStorageSync("gameIds")) {
      let name = JSON.stringify(wx.getStorageSync("gameNames"));
      name = register.changeForm(name);
      this.setData({
        hasGame: false,
        hasGameList: true,
        gameList: name,
      });
    } else {
      this.setData({
        hasGame: true,
        hasGameList: false,
      });
    }
  },

  /**
   店铺标签修改
   */
  bindEditTip: function () {
    wx.navigateTo({
      url: '../tag/tag?edit=2',
    });
  },
/**
 修改游戏标签
 */
  bindEditGame:function(){
    wx.navigateTo({
      url: '../game/game?edit=2',
    });


  },

  onunload: function () {
    console.log('页面关闭');
  },
  onHide: function () {
    console.log('页面隐藏了');
  }



})