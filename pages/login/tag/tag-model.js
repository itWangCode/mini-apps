
import { Base } from '../../../utils/base.js';
class Tag extends Base {
  constructor() {
    super();
  }
  /**
   获取标签
   */
  getTag(callBack) {
    let parames = {
      url: '',
      data: {
        service: 'App.codesByType',
        ctype: 1,
      },
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    this.request(parames);
  }
  /**
   修改标签
   */
  alterTags(farmId, codeIds, codeNames, callBack) {
    let parames = {
      url: '',
      data: {
        service: 'Farm.setCodesValue',
        farmId: farmId,
        codeIds: codeIds,
        codeNames: codeNames,
      },
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    this.request(parames);
  }
/**
 处理选过的标签 为true
 @codeIds id数组
 @tigList tag标签数组
 */

  doChangeTags(codeIds, tigList){
  let glen = codeIds.length;
  for (let j = 0; j < glen; j++) {
    for (let i in tigList) {
      let item = tigList[i];
      if (item.codeId == codeIds[j]) {
        item.check = true;
      }
    }
  }

  return tigList
}




}

export { Tag };