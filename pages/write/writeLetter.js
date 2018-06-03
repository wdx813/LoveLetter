// pages/write/writeLetter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    receiver: '',
    wordNum: '0/200',
    isDisable: true
  },

  /**
   * 提交信至预览
   */
  submitLetter: function(e) {
      var receiver = e.detail.value.receiver
      var content = e.detail.value.content
      var sender = e.detail.value.sender
      wx.navigateTo({
          url: '/pages/preview/previewLetter?receiver='+receiver+'&content='+content+'&sender='+sender,
      })
  },

  /**
   * 获取信内容的长度
   */
  getContentLength: function(e) {
    var contentLength = e.detail.value.length;
    var isDisable = contentLength == 0
    this.setData({
        wordNum: contentLength + '/200',
        isDisable: isDisable
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        this.setData({
            receiver: options.receiver ? options.receiver : ''
        })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})