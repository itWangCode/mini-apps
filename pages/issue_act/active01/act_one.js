// pages/issue_act/active01/act_one.js

import { AddActive } from 'act-model.js';
var addActive = new AddActive;
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 2015; i <= date.getFullYear() + 1; i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = '0' + i;
  }
  months.push(i)
}

for (let k = 1; k <= 31; k++) {
  if (k < 10) {
    k = '0' + k;
  }
  days.push(k)
}



Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasChange1: false,//二选一
    hasChange2: false,//二选一
    hasW: 0,
    years: years,
    year: date.getFullYear(),
    months: months,
    month: date.getMonth() + 1,
    days: days,
    day: date.getDate(),
    value: [2, 0, 0],
    data: [],
    hasShow: false,//时间选择器
    hasFirst: true,
    hasTwo: false,
    hasThree: false,
    index: 0,//默认周
    hasClick: false,//点击效果
    week1: [{
      text: '周一',
      src: '/images/active/icon_select1.png',
      src1: '/images/active/icon_select.png',
      check: false,
      id: 0,
    }, {
      text: '周二',
      src: '/images/active/icon_select1.png',
      src1: '/images/active/icon_select.png',
      check: false,
      id: 1
    }, {
      text: '周三',
      src: '/images/active/icon_select1.png',
      src1: '/images/active/icon_select.png',
      check: false,
      id: 2
    },
    {
      text: '周四',
      src: '/images/active/icon_select1.png',
      src1: '/images/active/icon_select.png',
      check: false,
      id: 3,
    }, {
      text: '周五',
      src: '/images/active/icon_select1.png',
      src1: '/images/active/icon_select.png',
      check: false,
      id: 4,
    }, {
      text: '周六',
      src: '/images/active/icon_select1.png',
      src1: '/images/active/icon_select.png',
      check: false,
      id: 5
    }, {
      text: '周日',
      src: '/images/active/icon_select1.png',
      src1: '/images/active/icon_select.png',
      check: false,
      id: 6,
    }]

  },
  onLoad: function (options) {
    let editActive = options.editActive;
    //添加表单验证
    if (editActive == 1) {//修改活动
      let activInfo = wx.getStorageSync("activInfo");
      let businessTime = activInfo.businessTime;
      let useMoney = activInfo.useMoney;//价钱
      let week1 = this.data.week1;//周一到周三     
      let weekRes = {};
      weekRes = addActive.checkWeek(activInfo, week1);
      let index = 0;
      if (weekRes.eHasChange1) {
        index = 1;
      }
      this.setData({
        week1: weekRes.week1,
        data: weekRes.editD,
        hasChange2: weekRes.eHasChange2,//编辑
        hasChange1: weekRes.eHasChange1,//编辑
        useMoney1: useMoney,
        times: businessTime,
        hasEdit: 1,//编辑
        index: index,
        storePrice: options.storePrice
      });
    } else {
      this.setData({
        times: options.times,
        storePrice: options.storePrice
      });
    }
  },
  /**
  点击效果
  */
  setTimeEffects(url) {
    this.setData({
      hasClick: true,
    });
    setTimeout(function () {
      wx.redirectTo({
        url: url,
      });
    }, 100);
  },
  onShow: function () {
    this.setData({
      hasClick: false,
    });
  },
  /**
   Tab 切换卡
   */
  tabBind: function (e) {
    let index = e.currentTarget.dataset.id;
    if (index == 1) {
      if (this.data.hasChange2) {//不能添加
        wx.showToast({
          title: '若要选择日期,请取消周!',
        });
      } else {
        this.setData({
          index: index,
        });
      }
    }
    if (index == 0) {
      if (this.data.hasChange1) {//不能添加
        wx.showToast({
          title: '若要选择周,请取消日期!',
        });
      } else {
        this.setData({
          index: index,
        });
      }
    }

  },

  /**
   选择周 第一步
   */
  changeT: function (e) {
    let id = e.currentTarget.dataset.id;
    let hasW1 = 0;
    let week1 = this.data.week1;
    for (let i in week1) {
      if (week1[i].id == id) {
        week1[i].check = !week1[i].check;
      }
    }
    this.setData({
      week1: week1,
    });
    console.log(week1);
    for (let j in week1) {
      if (week1[j].check) {
        hasW1 = 1;
      }
    }
    console.log(hasW1 + 'hasW1');

    if (hasW1 == 1) {
      //日期不能选
      this.setData({
        hasChange2: true,
      });
    } else {
      this.setData({
        hasChange2: false,
      });
    }
  },

  /**
   添加日期
   */
  addData: function () {

    this.setData({
      hasShow: true,
      hasChange2: false,
      hasChange1: true,
    });

  },

  /**
   选择日期
   */
  bindChange: function (e) {
    const val = e.detail.value;
    console.log();
    let dayTotal = addActive.mGetDate(this.data.years[val[0]], this.data.months[val[1]]);
    let newday = [];
    for (let i = 1; i <= dayTotal; i++) {
      if (i < 10) {
        i = '0' + i;
      }
      newday.push(i);
    }
    this.setData({
      days: newday
    });
    let datad = {
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
    };
    this.setData({
      datas: datad,//临时数据
    });
  },

  /**
   确定  取消操作
   */
  queding: function (e) {
    let eid = e.currentTarget.dataset.id;
    if (eid == 1) {//确定
      let addData = this.data.data;
      let length = addData.length;
      let id = length;
      if (length > 0) {
        for (let i in addData) {
          if (addData[i].id == length) {
            id = length + 1;
          }
        }
      }
      let edd = {
        id: id,
      }
      let data = this.data.datas;
      if (data == null || data == '') {
        data = {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
        }
      }
      Object.assign(data, edd);
      addData.push(data);
      this.setData({
        data: addData,
      });
    }
    this.setData({
      hasShow: false,
    });
  },

  /**
   删除日期
   */
  delteData: function (ev) {
    let did = parseInt(ev.currentTarget.dataset.did);
    let data = this.data.data;
    for (let j in data) {
      if (data[j].id == did) {
        data.splice(j, 1);
      }
    }
    this.setData({
      data: data,
    });
    if (data.length == 0) {
      this.setData({
        hasChange1: false,
      });
    } else {
      this.setData({
        hasChange1: true,
      });
    }
  },


  /**
   下一步
   */
  bindSetp: function () {

    //数据
    let [week1, id, useData1, useDate, pushData] = [this.data.week1, 0, this.data.data, '', []];
    let [monday, tuesday, wednesday, thursday, friday, saturday, sunday] = [0, 0, 0, 0, 0, 0, 0];
    let wk1 = false;
    for (let i in week1) {
      if (week1[i].check) {
        if (week1[i].id == 0) {
          monday = 1;
        } else if (week1[i].id == 1) {
          tuesday = 1;
        } else if (week1[i].id == 2) {
          wednesday = 1;
        } else if (week1[i].id == 3) {
          thursday = 1;
        } else if (week1[i].id == 4) {
          friday = 1;
        } else if (week1[i].id == 5) {
          saturday = 1;
        } else if (week1[i].id == 6) {
          sunday = 1;
        }
        wk1 = true;
      }
    }

    if (wk1 || useData1.length != 0) {
      //日期
      if (useData1.length != 0) {
        for (let i in useData1) {
          let item = useData1[i].year + '-' + useData1[i].month + '-' + useData1[i].day;
          pushData.push(item);
        }
        useDate = pushData.join(',');
      }
      console.log("useDate");
      console.log(useDate);
      let step1 = {
        monday: monday,
        tuesday: tuesday,
        wednesday: wednesday,
        thursday: thursday,
        friday: friday,
        saturday: saturday,
        sunday: sunday,
        useDate: useDate,
      };
      this.setData({
        hasFirst: false,
        hasTwo: true,
        step1: step1,
      });

    } else {
      addActive.tip('请选择周期或者日期');
      return false
    }
  },


  /**
   第二步 
   */
  bindSetpT: function (e) {
    console.log(e);
    let useMoney = parseFloat(e.detail.value.useMoney);
    let storePrice = this.data.storePrice;
    let step2 = {
      useMoney: useMoney,
      oldMoney: storePrice,
    }
    this.setData({
      hasTwo: false,
      hasThree: true,
      step2: step2,
    });

    let hasOld = false;
    if (useMoney < storePrice) {
      hasOld = true;
    }
    //拼接显示的最后一步的数据
    let step1 = this.data.step1;
    let showW = addActive.showWeekes(step1);
    console.log(step1);
    this.setData({
      showThreeData: {
        data: showW,
        data1: step1.useDate,
        useMoney: useMoney,
      },
      hasOld: hasOld,

    });

  },


  /**
   完成 
   */

  bindFish: function (e) {
    let eidtid = e.currentTarget.dataset.id;
    let times = this.data.times;
    let activInfo = wx.getStorageSync("activInfo");
    let activityId = 0
    if (eidtid == 1) {//编辑
      activityId = activInfo.activityId;
    }

    let parm = {
      activityId: activityId,
      service: 'Activities.publishMessage',
      businessTime: times,
      farmId: wx.getStorageSync("farmId")
    };

    let data1 = this.data.step1;
    let data2 = this.data.step2;
    Object.assign(parm, data1, data2);
    console.log(parm);
    addActive.addActive(parm, (res) => {
      console.log(res);
      if (res.code == 0) {
        if (eidtid == 1) {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          });
          this.setData({
            hasClick: true,
          });

          //通知是否修改
          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 2];  //上一个页面       
          prevPage.setData({
            eidtid:1,            
          }); 
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            });

          }, 100);
        } else {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          });
          let url = '../active02/act_one';
          this.setTimeEffects(url);
        }
      } else if (res.code != 0) {
        wx.showModal({
          title: '',
          content: res.message,
          showCancel: false,
          confirmText: '知道了',
          confirmColor: '#7188FF',
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              });
            }
          }
        });
      }

    });


  }


})