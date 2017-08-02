
/**
 @param count:可以上传照片的数量
 @param callback:回调函数
 */
function chooseImage(count, callback) {
  wx.chooseImage({
    count: count, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      console.log(res.tempFiles);
      callback(res.tempFilePaths);
    }
  });
}


module.exports = {
  chooseImage: chooseImage 
}