// pages/game/game.js

import { Game } from 'game-model.js';
var game = new Game;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasTag: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    editG
    let gameList = wx.getStorageSync("gameList");
    let editG = options.editG;
    let edit = options.edit;
    let gameIds = options.gameIds;
    let hasTag = false;
    console.log("editG");
    console.log(gameIds);
    if (gameList.length == 0) {
      this._getGameTags(edit, editG, gameIds);
    } else {
      hasTag = true;
      if (editG == 1) {//修改游戏标签       
        let gameArr = gameIds.split(",");
        gameList = game.doChangeGames(gameArr, gameList);  
        console.log("修改");     
      } else if (edit == 2) { /**   编辑标签  */
        let gameIds = wx.getStorageSync("gameIds");
        gameList = game.doChangeGames(gameIds, gameList);      
      }
      this.setData({
        gameList: gameList,
        hasTag: hasTag,
        editG: editG,
      });
    }

  },


  _getGameTags(edit, editG, gameIds) {
    game.getGameTags((res) => {
      console.log(res);
      if (res.code == 0) {
        let list = res.list;
        wx.setStorageSync("gameList", list);
        let hasTag = true;
        if (editG == 1) {//修改游戏标签       
          let gameArr = gameIds.split(",");
          list = game.doChangeGames(gameArr, list);
        } else if (edit == 2) { /**   编辑标签  */
          let gameIds = wx.getStorageSync("gameIds");
          list = game.doChangeGames(gameIds, list);
        }
        this.setData({
          gameList: list,
          hasTag: hasTag,
          editG: editG,
        });
      
      }
    });
  },
  /**
   编辑游戏标签
   */





  /**
   游戏选择
   */
  changeGameId: function (e) {
    let codeid = e.currentTarget.dataset.cateid;
    let gameLists = this.data.gameList;
    for (let j in gameLists) {
      let items = gameLists[j];
      if (items.cateId == codeid) {
        items.check = !items.check;
      }
    }
    console.log(gameLists);
    this.setData({
      gameList: gameLists,
    });
  },
  /**
   完成
   */
  fished: function (e) {
    let gameList = this.data.gameList;
    let [gameIds, gameNames] = [[], []];
    for (let k in gameList) {
      if (gameList[k].check) {
        let id = gameList[k].cateId;
        let name = gameList[k].cateName;
        gameIds.push(id);
        gameNames.push(name);
      }
    }
    if (gameIds.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择游戏类型',
      });
    } else {
      wx.setStorageSync("gameIds", gameIds);
      wx.setStorageSync("gameNames", gameNames);
      if (this.data.editG == 1) {//修改
        let farmId = wx.getStorageSync("farmId");
        game.alterGameTags(farmId, gameIds, gameNames, (res) => {
          if (res.code == 0) {
            let pages = getCurrentPages();
            let prevPage = pages[pages.length - 2];  //上一个页面    
            let firstPage = pages[pages.length - 3];
            let names = JSON.stringify(gameNames);
            names = game.changeForm(names);
            prevPage.setData({
              gameNames: names,
              gameIds: gameIds
            });
            console.log(gameNames);
            firstPage.setData({
              hasEdit: 1,
            });
            wx.navigateBack({
              delta: 1,
            });
          } else if (res.code == 1) {
            wx.showToast({
              title: '没有发生变化',
              icon: 'success',
              duration: 2000
            });
            wx.navigateBack({
              delta: 1,
            });
          }

        });
      } else {
        wx.navigateBack({
          delta: 1,
        });
      }
    }

  }

})