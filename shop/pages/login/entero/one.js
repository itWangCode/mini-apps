// one.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasscPic: false,
    picBg: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
    //添加表单验证
    this.WxValidate = app.WxValidate({
      FName: {
        required: true,
        minlength: 2,
      },
      FPhone: {
        required: true,
        tel: true,
      },
      FCode: {
        required: true,
        idcard: true,
      },
      FWeiXin: {
        required: true,
      }
    }, {
        FName: {
          required: '请输入法人姓名',
        },
        FPhone: {
          required: '请输入电话',
          tel: '请输入正确的手机号码'
        },
        FCode: {
          required: '法人身份证号码',
        },
        FWeiXin: {
          required: '请输入微信号',
        }
      });

  },
  /**
   * 
   上传法人照片 一张
   */
  scPic: function () {
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res);
        let picPaths = res.tempFilePaths;
        wx.setStorageSync("f_photo", picPaths);//法人照片
        that.setData({
          picPaths: picPaths,
          hasscPic: true,
          picBg: false,
        });
      }
    });
  },


  regFishT: function (e) {
    let ev = e.detail.value;
    let [FName, FPhone, FCode, FWeiXin] = [ev.FName, ev.FPhone, ev.FCode, ev.FWeiXin];
    let addData2 = {
      FName: FName,
      FPhone: FPhone,
      FCode: FCode,
      FWeiXin: FWeiXin,
    }

    /**
     表单验证
     */
    //验证照片
    if (this.data.picBg) {
      wx.showModal({
        title: '',
        content: '请上传法人身份证照片',
        showCancel: false,
        confirmText: '知道了',
        confirmColor: '#7188FF',
      });
      return false
    }



    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0];
      console.log("param:" + error.param + "msg:" + error.msg);
      if (error.param == "FName") {
        this.setData({
          isFName: true,
        });
      } else if (error.param == "FPhone") {
        this.setData({
          isFPhone: true,
          isFName: false,
        });
      } else if (error.param == 'FCode') {
        this.setData({
          isFCode: true,
          isFName: false,
          isFPhone: false,
        });
      } else if (error.param == 'FWeiXin') {
        this.setData({
          isPhone: false,
          isFPhone: false,
          isFCode: false,
          isFWeiXin: true,
        });
      } else {
        this.setData({
          isFWeiXin: false,
          isFPhone: false,
        });
      }
      wx.showModal({
        title: '',
        content: error.msg,
        showCancel: false,
        confirmText: '知道了',
        confirmColor: '#7188FF',
      });
      return false
    }
    this.setData({
      isFPhone: false,
    });
    wx.setStorageSync("addData2", addData2);   
    wx.navigateTo({
      url: '../entert/entert',
    });


  }

})