import WxValidate from 'utils/WxValidate';
App({
  globalData: {   
    userInfo: null,
    addData1:'',
    editPic:'',
    info:'',//用户信息
    checkinfo:'',
  },
  WxValidate: (rules, messages) => new WxValidate(rules, messages),
})