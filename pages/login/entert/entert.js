// entert.js
import { Entert } from 'entert-model.js';
var entert = new Entert;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasPicZ: false,
    picBgZ: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化表单验证规则
    this.WxValidate = entert.initFormVa(app);

  },
  /*
     上传资质信息
     */
  scPicZ: function () {
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res);
        let picPath = res.tempFilePaths;
        that.setData({
          picPath: picPath,
          hasPicZ: true,
          picBgZ: false,
        });
      }
    });

  },

  regFishR: function (e) {   
    let ev = e.detail.value;
    let [CName, CCode, CAddress, CYear] = [ev.CName, ev.CCode, ev.CAddress, ev.CYear];
    /**
     表单验证
     */
    //验证照片  
    if (this.data.picBgZ) {
      wx.showModal({
        title: '',
        content: '请上传营业执照照片',
        showCancel: false,
        confirmText: '知道了',
        confirmColor: '#7188FF',
      });
      return false
    }


    /**
     表单验证
    */

    if (entert.checkForm(this.WxValidate.checkForm(e), this.WxValidate, this)) {

      this.setData({
        isCCode: false,
      });
      wx.showLoading({
        title: '入驻中.....',
      });

      //上传图片  
      //1.法人照片
      let f_photo = wx.getStorageSync("f_photo");//法人照片  
      //2.营业资质照片
      let c_photo = this.data.picPath;
      entert.uploadFiles(f_photo[0], (res) => {
        console.log("法人照片");
        console.log(res);
        if (res.code == 0) {
          f_photo = res.url;
          entert.uploadFiles(c_photo[0], (res) => {//上传资质照片
            if (res.code == 0) {
              c_photo = res.url;
              //入驻
              this.registerC(f_photo, c_photo, CName, CCode, CAddress, CYear);
            } else if (res.code == 1) {
              wx.showModal({
                title: '提示',
                content: '资质照片上传失败',
              });
              wx.hideLoading();
              return false
            }
          });
        } else if (res.code == 1) {
          wx.showModal({
            title: '提示',
            content: '法人照片上传失败',
          });
          wx.hideLoading();
          return false
        }
      });
    }





  },

  /**
   入驻
   */
  registerC: function (f_photo, c_photo, CName, CCode, CAddress, CYear) {

    let addData1 = app.globalData.addData1;
    console.log(addData1);
    let addData2 = wx.getStorageSync("addData2");
    let parameters = {
      service: 'FarmApply.add',
      sellerName: addData2.FPhone,
      password: '666',
      CName: CName,
      CCode: CCode,
      CAddress: CAddress,
      CYear: CYear,
      FPhoto: f_photo,
      CPhoto: c_photo
    }
    console.log("parameters");
    Object.assign(parameters, addData1, addData2);
    console.log(parameters);
    entert.regStore(parameters, (res) => {
      if (res.code == 0) {
        wx.hideLoading();
        wx.reLaunch({
          url: '../status/stauts?first=1',
        });
        //清除缓存
        app.globalData.addData1 = '';
        wx.clearStorageSync("addData2");
        wx.clearStorageSync('codeIds');
        wx.clearStorageSync('gameIds');
        wx.clearStorageSync('codeNames');
        wx.clearStorageSync('gameNames');
      } else if (res.code == 1) {
        wx.hideLoading();
        wx.showToast({
          title: res.message + '请登录!',
          icon: 'success',
          duration: 2000
        });
        wx.reLaunch({
          url: '../login',
        });
      }
    });
  }

})