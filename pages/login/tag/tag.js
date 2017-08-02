// pages/tag/tag.js
import { Tag } from 'tag-model.js';
var tag = new Tag;
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    counts: '',
    count: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 获取标签 */
    let tigList = wx.getStorageSync("tigList");
    let editG = options.editG;
    let edit = options.edit;//编辑  
    let codeIds = options.codeIds;
    let glen = '';
    console.log(editG);
    if (tigList.length == 0) {
      this._getTag(edit, editG, codeIds);
    } else {
     let hasTag = true;
      if (editG == 1) {  /** 标签的修改*/
        let codeArr = codeIds.split(",");
        glen = codeArr.length;
        tigList= tag.doChangeTags(codeArr, tigList);      
      } else if (edit == 2) { /**  编辑标签  */
        let codeIds = wx.getStorageSync("codeIds");
         tigList = tag.doChangeTags(codeIds,tigList);
         glen = codeIds.length;       
      }
      this.setData({
        tigList: tigList,
        hasTag: hasTag,
        editG: editG,
        count: glen,
      });   
    }
  },

  /**
   处理获取标签数据
   */

  _getTag: function (edit, editG, codeIds) {
    tag.getTag((res) => {
      if (res.code == 0) {
        let list = res.list;
        wx.setStorageSync("tigList", list);
        let hasTag = true;
        let glen='';
        if (editG == 1) {  /** 标签的修改*/
          let codeArr = codeIds.split(",");
          glen = codeArr.length;
          list = tag.doChangeTags(codeArr, list);
        } else if (edit == 2) { /**  编辑标签  */
          let codeIds = wx.getStorageSync("codeIds");
          list = tag.doChangeTags(codeIds, list);
          glen = codeIds.length;
        }
        this.setData({
          tigList: list,
          hasTag: hasTag,
          editG: editG,
          count: glen,
        });       
      } else {

      }

    });

  },
  /**
   选择标签
   */
  changeTig: function (e) {
    console.log(e);
    let codeid = e.currentTarget.dataset.codeid;
    let tags = this.data.tigList;
    let count = this.data.count;
    for (let i in tags) {
      let items = tags[i].codeId;
      if (count < 5) {
        if (items == codeid) {
          if (tags[i].check) {
            count--;
          }
          tags[i].check = !tags[i].check;
          if (tags[i].check) {
            count++;
          }
        }
      } else {
        if (items == codeid) {
          if (tags[i].check) {
            count--;
            tags[i].check = !tags[i].check;
          }
        }
      }
    };
    this.setData({
      tigList: tags,
      count: count,
    });
  },
  /**
   完成
   */
  bindConf: function () {
    let tagList = this.data.tigList;
    let [codeIds, codeNames] = [[], []];
    for (let k in tagList) {
      if (tagList[k].check) {
        let id = parseInt(tagList[k].codeId);
        let name = tagList[k].codeName
        codeIds.push(id);
        codeNames.push(name);
      }
    }
    if (codeIds.length == 0) {
      tag.tip('请选择标签');
    } else {
      wx.setStorageSync("codeIds", codeIds);
      wx.setStorageSync("codeNames", codeNames);
      if (this.data.editG == 1) {//修改
        let farmId = wx.getStorageSync("farmId");
        tag.alterTags(farmId, codeIds, codeNames, (res) => {
          if (res.code == 0) {
            let pages = getCurrentPages();
            let prevPage = pages[pages.length - 2];  //上一个页面    
            let firstPage = pages[pages.length - 3];
            let names = JSON.stringify(codeNames);
            names = tag.changeForm(names);
            prevPage.setData({
              codeNames: names,
              codeIds: codeIds
            });
            console.log(codeNames);
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
  },



})