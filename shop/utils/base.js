import { Config } from 'config.js';
class Base {
  constructor() {
    this.baseRequestUrl = Config.restUrl;
  }
  /**
   发出请求 
   */
  request(parames) {
    console.log("调用方法了");
    console.log(parames);
    let url = this.baseRequestUrl + parames.url;
    if (!parames.type) {
      parames.type = 'GET';
    }
    wx.request({
      url: url,
      data: parames.data,
      method: parames.type,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("成功");
        console.log(res);
        parames.sCallBack && parames.sCallBack(res.data);
      },
      fail: function (res) {
        parames.sCallBack && parames.sCallBack(res);
        console.log("失败");
        console.log(res);
      }

    });
  }

  // 验收手机号码
  valid(mobile, title) {
    let res = /^1[34578]\d{9}$/.test(mobile);
    if (!res) {
      wx.showModal({
        title: '',
        content: title,
        showCancel: false,
        confirmText: '知道了',
        confirmColor: '#7188FF',
      });
      return false;
    } else {
      return true;
    }
  }
  /**
  提示信息
  */
  tip(title) {
    wx.showModal({
      title: '',
      content: title,
      showCancel: false,
      confirmText: '知道了',
      confirmColor: '#7188FF',
    });
  }

  /**
 将数组转化为字符串 并以'、'连接
 @param names要转化的对象
 */
  changeForm(names) {
    names = names.replace(/\[/, '');
    names = names.replace(/\]/, '');
    names = names.replace(/\,/g, '、');
    names = names.replace(/\"/g, '');
    return names
  }

  /**
   上传图片
   */
  uploadFile(parames) {
    console.log(parames);
    wx.uploadFile({
      url: parames.url,
      filePath: parames.filePath,
      name: parames.name,
      formData: parames.formData,
      header: {
        'content-type': 'multipart/form-data'
      },
      success: function (res) {
        let data = res.data;
        data = JSON.parse(data);
        parames.sCallBack && parames.sCallBack(data);
      }
    });
  }

  /**
    判断是否为空
  */
  isEmpty(obj) {
    let res = false;
    if (obj.length == 0) {
      res = true;
    }
    return res;
  }







}
export { Base };