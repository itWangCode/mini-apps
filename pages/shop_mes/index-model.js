
import { Base } from '../../utils/base.js';
class Shop extends Base {
  constructor() {
    super();
  }
  /**
   *获取店铺信息
   */
  getShop(farmId, callBack) {
    let parames = {
      url: '',
      data: {
        service: 'Farm.getFarmInfo',
        farmId: farmId,
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
   修改店铺照片   
   */

  alterCoverPhoto(farmId, coverPhoto, callBack) {
    let parames = {
      url: '',
      data: {
        service: 'Farm.setCoverPhoto',
        farmId: farmId,
        coverPhoto: coverPhoto,      
      },
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    console.log(parames);
    this.request(parames);
  }
/**
 修改头像
 */
  
  alterHeaderPhoto(farmId, fildName, fildVale, callBack) {
    let parames = {
      url: '',
      data: {
        service: 'Farm.setFileValue',
        farmId: farmId,
        fildName: fildName,
        fildVale: fildVale,
      },
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    console.log(parames);
    this.request(parames);
  }



}
export { Shop };