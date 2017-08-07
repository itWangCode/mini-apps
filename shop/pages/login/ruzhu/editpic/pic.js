// pic.js
var common = require('../../../../utils/common.js');
const app = getApp();
Page({
  data: {
    pic: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pic =app.globalData.editPic;   
    this.setData({
      pic: pic,
    });

  },
  /**
   删除照片
   */
  delpic: function (e) {
    let [pic, id] = [this.data.pic, parseInt(e.currentTarget.dataset.id)];
    pic.splice(id, 1);
    this.setData({
      pic: pic,
    });
    app.globalData.editPic = pic; 
  },


  /**
   编辑照片
   */
  changePic: function () {
    let that = this;
    //在原来基础上追加照片
    let pics = this.data.pic;
    let leng = (5 - pics.length);
    console.log(leng + '照片图片');
    if (leng > 0) {
      common.chooseImage(leng, (res) => {
        let lengthPic = res.length;
        let filePaths = pics.concat(res);
        if (lengthPic > 0) {
          app.globalData.editPic = filePaths;      
          that.setData({
            pic: filePaths,
          });
        }
      });
    } else if (leng == 0) {
      wx.showToast({
        title: '最多只能传5张照片！',
      });
    }

  },
  /**
   完成 
   */
  accomplish: function () {
    let len = app.globalData.editPic.length;  
    if (len == 0) {
      wx.showModal({
        title: '',
        content: '请选择照片',
        showCancel: false,
        confirmText: '知道了',
        confirmColor: '#7188FF',
      });
    } else {
      wx.navigateBack({
        delta: 1,
      });
    }

  }




})