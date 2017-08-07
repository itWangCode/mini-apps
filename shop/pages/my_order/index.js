// pages/login/login.js
import { Order } from 'order-model.js';
var order = new Order;
var pageIndex = 1;//组队中的信息
var pageSize = 3;//一次性读取
var hasMore = true;

var pageIndexH = 1;//历史中的信息
var pageSizeH = 3;//一次性读取
var hasMoreH = true;


Page({
  data: {
    currentId: 0,//默认第一个
    hasHis: false,//默认显示组队
    actlistAll: [],
    hisAllList: [],
    listAll: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad');

    wx.showLoading({
      title: '读取数据中...',
    });
    let [farmId, pinStatus] = [wx.getStorageSync("farmId"), 1];
    order.getPinsByFarmIdList(farmId, pinStatus, pageIndex, pageSize, this._dolistAll);
  },

  /**
  组队
   */
  _dolistAll: function (res) {
    let that = this;
    if (res.code == 0) {
      wx.hideLoading();
      let actlistAll = res.list.list;
      let total = parseInt(res.list.total);

      if (actlistAll.length > 0) {
        if ((pageIndex * pageSize) < total) {
          hasMore = true;
        } else {
          hasMore = false;
        }
        var oldActlistAll = this.data.listAll;
        actlistAll = oldActlistAll.concat(actlistAll);
        this.setData({
          hasMore: hasMore,
        });
      } else {
        actlistAll = this.data.listAll;
      }
      that.setData({
        listAll: actlistAll,
        hasGroup: true,
        hasHis: false
      });
    } else if (res.code == 1) {
      wx.hideLoading();
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    pageIndex = 1;
    pageIndexH = 1;
    console.log(this.data.listAll);
    console.log('onShow');
  },


  onHide: function () {
    console.log('onHide');
  },

  onUnload: function () {
    pageIndex = 1;
    pageIndexH = 1;
    console.log(this.data.listAll);
    console.log('onUnload');
  },

  /**
   Tab 选项卡
   */
  onbindChaCen: function (e) {
    let id = e.currentTarget.dataset.id;
    let pinStatus = '';
    this.setData({
      currentId: id,
    });
    let farmId = wx.getStorageSync("farmId");
    //组队
    if (id == 0) {
      pinStatus = 1;
      pageIndex = 1;
      this.setData({
        listAll: [],
      });
      order.getPinsByFarmIdList(farmId, pinStatus, pageIndex, pageSize, this._dolistAll);
    } else {//历史清单
      pinStatus = 2;
      pageIndexH = 1;
      this.setData({
        hisAllList: [],
      });
      order.getPinsByFarmIdList(farmId, pinStatus, pageIndexH, pageSizeH, this._doHisAll);
    }
  },
  /**
   历史清单
   */

  _doHisAll: function (res) {
    let that = this;
    if (res.code == 0) {
      wx.hideLoading();
      let actlistAll = res.list.list;
      let total = parseInt(res.list.total);
      if (actlistAll.length > 0) {
        console.log("actlistAll");
        console.log(actlistAll);
        actlistAll = order.doList(actlistAll);
        if ((pageIndexH * pageSizeH) < total) {
          hasMoreH = true;
        } else {
          hasMoreH = false;
        }
        var oldHisAllList = this.data.hisAllList;
        actlistAll = oldHisAllList.concat(actlistAll);
        this.setData({
          hasMoreH: hasMoreH,
        });
      } else {
        actlistAll = this.data.hisAllList;
      }
      that.setData({
        hisAllList: actlistAll,
        hasHis: true,
        hasGroup: false,
      });
    } else {
      wx.hideLoading();
    }
  },

  /**
    下拉刷新 
    */
  onReachBottom: function (e) {
    console.log('下一页');
    let farmId = wx.getStorageSync("farmId");
    console.log(this.data.currentId);
    let tig = this.data.currentId;

    if (tig == 1) {//历史订单
      if (hasMoreH) {
        wx.showLoading({
          title: '读取数据中',
        });
        pageIndexH++;//下一页
        let pinStatus = 2;
        order.getPinsByFarmIdList(farmId, pinStatus, pageIndexH, pageSizeH, this._doHisAll);
      }
    } else {//组队
      if (hasMore) {
        wx.showLoading({
          title: '读取数据中',
        });
        pageIndex++;//下一页
        let pinStatus = 1;
        order.getPinsByFarmIdList(farmId, pinStatus, pageIndex, pageSize, this._dolistAll);
      }
    }
  },

  /**
   上拉重新加载
   */
  // onPullDownRefresh: function () {
  //   console.log('第一页');

  //   let farmId = wx.getStorageSync("farmId");
  //   console.log(this.data.currentId);
  //   let tig = this.data.currentId;

  //   if (tig == 1) {//历史订单
  //     if (hasMoreH) {
  //       wx.showLoading({
  //         title: '读取数据中',
  //       });
  //       pageIndex = 1;//第一页
  //       let pinStatus = 2;
  //       order.getPinsByFarmIdList(farmId, pinStatus, pageIndexH, pageSizeH, this._doHisAll);
  //     }
  //   } else {//组队
  //     if (hasMore) {
  //       wx.showLoading({
  //         title: '读取数据中',
  //       });
  //       pageInde = 1;//第一页
  //       let pinStatus = 1;
  //       order.getPinsByFarmIdList(farmId, pinStatus, pageIndex, pageSize, this._dolistAll);
  //     }
  //   }
  // }




})