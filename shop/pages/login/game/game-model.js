

import { Base } from '../../../utils/base.js';
class Game extends Base {

  constructor() {
    super();
  }
  /**
   获取游戏标签
   */
  getGameTags(callBack) {
    let parames = {
      url: '',
      data: {
        service: 'Farm.getCateMore',
      },
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    this.request(parames);
  }


  /**
   修改游戏标签
   */
  alterGameTags(farmId, gameIds, gameNames, callBack) {
    let parames = {
      url: '',
      data: {
        service: 'Farm.setGamesValue',
        farmId: farmId,
        gameIds: gameIds,
        gameNames: gameNames,
      },
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    }
    this.request(parames);
  }

  /**
   编辑游戏
   */

  doChangeGames(gameArr, gameList){  
    let glen = gameArr.length;  
    console.log(gameArr);
    for (let j = 0; j < glen; j++) {
      for (let i in gameList) {
        let item = gameList[i];       
        if (item.cateId == gameArr[j]) {
          item.check = true;
        }
      }      
    }
    console.log(gameList);
    return gameList
  }

}

export { Game }