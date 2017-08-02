
import { Base } from '../../../utils/base.js';
class Entert extends Base {
  constructor() {
    super();
  }
  /**
   登录
   @param   parameters 参数
    @callBack  回调函数
   */
  regStore(parameters, callBack) {
    let parames = {
      url: '',
      data: parameters,
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    console.log(parames);
    this.request(parames);
  }
  /**
   上传照片
   @param tempFilePaths图片路径
   */
  uploadFiles(tempFilePaths, callBack) {
    let parames = {
      url: 'https://qzyapi.51urmaker.com/v1_1/?service=FarmApply.setAvatar',
      filePath: tempFilePaths,
      name: 'feedback',
      formData: {
        'postFileName': 'feedback'
      },
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    this.uploadFile(parames);
  }

  /**
   初始化表单验证规则
   */

  initFormVa(app) {
    let WxValidate = app.WxValidate({
      CName: {
        required: true,
        minlength: 2,
      },
      CCode: {
        required: true,
      },
      CAddress: {
        required: true,
      },
      CYear: {
        required: true,
      }
    }, {
        CName: {
          required: '请输入执照名称',
        },
        CCode: {
          required: '请输入执照注册编号',
        },
        CAddress: {
          required: '请输入执照所在地',
        },
        CYear: {
          required: '请输入执照有效期',
        }
      });
    return WxValidate
  }


  /**
   表单验证
   */
  checkForm(obj, obj1, that) {
    let rusult = true;
    if (!obj) {
      const error = obj1.errorList[0];
      if (error.param == "CName") {
        that.setData({
          isCName: true,
        });
      } else if (error.param == "CCode") {
        that.setData({
          isCCode: true,
          isCName: false,
        });
      } else if (error.param == 'CAddress') {
        that.setData({
          isCAddress: true,
          isCName: false,
          isCCode: false,
        });
      } else if (error.param == 'CYear') {
        that.setData({
          isCName: false,
          isCCode: false,
          isCAddress: false,
          isCYear: true,
        });
      } else {
        that.setData({
          isCYear: false,
        });
      }
      wx.showModal({
        title: '',
        content: error.msg,
        showCancel: false,
        confirmText: '知道了',
        confirmColor: '#7188FF',
      });
      rusult = false;

    }
    return rusult
  }









}
export { Entert };