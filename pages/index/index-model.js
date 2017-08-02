import { Base } from '../../utils/base.js';
class Home extends Base {
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
  *获取店铺信息
   @param farmId:string  商铺id
   @param callBack:function 回调函数
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
  显示地址文字信息
  @param pca:object 省市区数据
  @param ui:object 商铺信息
  */

  getAddress(pca, ui) {
    let pcaAdd = '';
    for (let i in pca) {
      let pri = pca[i];
      if (pri.id == ui.province) {
        pcaAdd += pri.name;
        let cit = pri.citys;
        for (let j in cit) {
          let cti = cit[j];
          if (ui.city == cti.id) {
            pcaAdd += cti.name;
            let ar = cti.area;
            for (let k in ar) {
              let ari = ar[k];
              if (ui.area == ari.id) {
                pcaAdd += ari.name;
              }
            }
          }
        }
      }
    }
    return pcaAdd
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
        'postFileName': 'feedback'
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


}
export { Home };