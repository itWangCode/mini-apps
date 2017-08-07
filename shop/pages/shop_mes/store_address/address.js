
import { Adress } from 'address-model.js';
var adress = new Adress;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    provinces: [],//省
    citys: [], //市
    countys: [],//区
    areaId: 0,
    areaName: ['', '', ''],
    areaValue: [0, 0, 0],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pca = wx.getStorageSync('PCA');//省市区
    let address = wx.getStorageSync("Address");
    let edtAdd = options.addEd;
    let provinces = adress.getProvinces(pca);//省
    let cAr = adress.getChangeCitys(pca[0].citys);
    this.setData({
      address: address,
      edtAdd: edtAdd,
      provinces: provinces,
      citys: cAr.citys,
      countys: cAr.countys
    });
  },

  /**
   清空地址
   */
  onbindReset: function () {
    this.setData({
      edtAdd: '',
    });
  },



  /**
   选择城市
   */
  changeArea: function (e) {
    var pid = e.detail.value;//数组
    //获取省
    let pca = wx.getStorageSync('PCA');//省市区   
    let pric = pca[pid[0]];
    let [cpid, cpname, pcitys] = [pric.id, pric.name, pric.citys];
    let [cid, cname, countys] = [pcitys[pid[1]].id, pcitys[pid[1]].name, []];
    for (let i in pcitys) {
      let itemA = pcitys[pid[1]].area;
      for (let j in itemA) {
        let itemr = itemA[j];
        let itemrs = {
          id: itemr.id,
          name: itemr.name
        }
        countys.push(itemrs);
      }
    }
    let [aid, aname] = [countys[pid[2]].id, countys[pid[2]].name];
    let address = cpname + cname + aname;
    this.setData({
      citys: pcitys,
      countys: countys,
      address1: address,
      province: cpid,
      city: cid,
      area: aid
    });

  },
  /**
   确定 取消操作
   */
  queding: function (e) {
    let id = e.currentTarget.dataset.id;
    console.log(e);
    this.setData({
      hasAddress: false,
    });
    if (id == 1) {//确定
      let address1 = this.data.address1;
      this.setData({
        address: address1
      });
    }
  },

  /**
   修改地址
   */
  changeAdd: function (e) {
    console.log(e);
    this.setData({
      hasAddress: true,
    });
  },


  /**
   保存
   */
  bindSave: function (e) {
    let address = e.detail.value.address;
    let farmId = wx.getStorageSync("farmId");
    let province = this.data.province;
    let city = this.data.city;
    let area = this.data.area;
    adress.saveAddress(farmId, province, city, area, address, (res) => {
      console.log(res);
      if (res.code == 0) {
        wx.setStorageSync("Address", this.data.address);
        console.log('地址保存');
        console.log(this.data.address); 
        wx.navigateBack({
          delta: 1
        });
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];  //上一个页面
        let firstPage = pages[pages.length - 3];  //上两页页面
        prevPage.setData({
          address: this.data.address,
          addEd: address,
        });
        firstPage.setData({
          hasEdit: 1,//修改过;
        });
      }
    });


  }

})