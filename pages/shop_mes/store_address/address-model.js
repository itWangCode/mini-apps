
import { Base } from '../../../utils/base.js';
class Adress extends Base {
  constructor() {
    super();
  }
  /**
   获取 省份
   */

  getProvinces(pca) {
    let provinces = [];//省
    for (let i in pca) {
      let item = pca[i];
      let tiems = {
        id: item.id,
        name: item.name
      }
      provinces.push(tiems);
    }
    return provinces
  }
  /**
   市和区 默认第一个位置
   */
  getChangeCitys(pcitys) {
    let citys = [];//市
    let countys = [];//区
    for (let i in pcitys) {
      let cti = pcitys[i];
      let item = {
        id: cti.id,
        name: cti.name
      }
      citys.push(item);
      let iteare = cti.area;//区域
      for (let j in iteare) {
        let itemr = iteare[j];
        let itemrs = {
          id: itemr.id,
          name: itemr.name
        }
        countys.push(itemrs);
      }
    }
    let obj = {
      citys: citys,
      countys: countys,
    }

    return obj
  }

  /**
   保存地址 
   */
  saveAddress(farmId, province, city, area, address, callBack) {
    let parames = {
      url: '',
      data: {
        service: 'Farm.setAddressValue',
        farmId: farmId,
        province: province,
        city: city,
        area: area,
        address: address
      },
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    this.request(parames);
  }
}
export { Adress };