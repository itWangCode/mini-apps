
import { Base } from '../../../utils/base.js';
class Register extends Base {
  constructor() {
    super();
  }
  /**
   获取省市区
   @param callBack:function 回调函数
   */
  getPCA(callBack) {
    let parames = {
      url: '',
      data: {
        service: 'App.getAreaList',
      },
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    this.request(parames);
  }

  /**
    上传照片
    @param tempFilePaths:string  图片路径
    @param callBack:function 回调函数
    */
  uploadFiles(tempFilePaths, callBack) {
    let parames = {
      url: 'https://qzyapi.51urmaker.com/v1_1/?service=FarmApply.setAvatar',
      filePath: tempFilePaths,
      name: 'feedback',
      formData: {
        'postFileName': 'feedback',
      },
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    this.uploadFile(parames);
  }

  /**
   * 初始化表单验证规则
   */
  initFormVa(app) {
    let WxValidate = app.WxValidate({
      farmName: {
        required: true,
        minlength: 2,
        maxlength: 10,
      },
      phone: {
        required: true,
        tel: true,
      },
      address: {
        required: true,
        minlength: 5,
        maxlength: 60,
      },
      storePrice: {
        required: true,
        number: true,
      },
      proid: {
        required: true,
      },
      cityid: {
        required: true,
      }
      , areaid: {
        required: true,
      }
      , businessTimeS: {
        required: true,
      },
      businessTimeE: {
        required: true,
      }
    }, {
        farmName: {
          required: '请输入店铺名称',
        },
        phone: {
          required: '请输入电话',
          tel: '请输入正确的手机号码'
        },
        address: {
          required: '请输入地址',
        },
        storePrice: {
          required: '请输入店铺价格',
          number: '请输入数值'
        },
        proid: {
          required: '请选择省份',
        },
        cityid: {
          required: '请选择城市',
        },
        areaid: {
          required: '请选择区域',
        },
        businessTimeS: {
          required: '请选择店铺营业开始时间',
        },
        businessTimeE: {
          required: '请选择店铺营业结束时间',
        }
      });
    return WxValidate
  }
  /**
   重组省市区数据
   */
  restPCA(pca) {
    let pric = [];
    for (let i in pca) {
      let names = pca[i];
      let citys = names.citys;
      let ite = {
        id: names.id,
        name: names.name,
      }
      pric.push(ite);
    }
    return pric
  }

  /**
   表单验证
   */
  
checkForm(obj,obj1,that){
  let rusult=true;
  if (!obj) {
    const error = obj1.errorList[0];
    if (error.param == "farmName") {
      that.setData({
        isfarmName: true,
      });
    } else if (error.param == "address") {
      that.setData({
        isAddress: true,
        isPhone: false,
      });
    } else if (error.param == 'phone') {
      that.setData({
        isfarmName: false,
        isPhone: true,
      });
    } else if (error.param == 'storePrice') {
      that.setData({
        isPhone: false,
        isAddress: false,
        isfarmName: false,
        isPrice: true,
      });
    } else {
      that.setData({
        isPrice: false,
      });
    }
    wx.showModal({
      title: '',
      content: error.msg,
      showCancel: false,
      confirmText: '知道了',
      confirmColor: '#7188FF',
    });
    rusult=false;
    
  }
  return rusult
}



}
export { Register }