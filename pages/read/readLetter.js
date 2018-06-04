// pages/read/readLetter.js
const util = require('../../utils/util.js')
var app = getApp()
//录音管理器
const options = {
    duration: 60000,
    sampleRate: 44100,
    numberOfChannels: 1,
    encodeBitRate: 192000,
    format: 'mp3',
    frameSize: 50
}
const recordManager = wx.getRecorderManager()
//音频播放管理器
const innerAudioContext = wx.createInnerAudioContext()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        receiver: '',
        content: '',
        selected: '',
        sender: '',
        date: util.formatDate(new Date()),
        windowHeight: app.globalData.windowHeight * 2 + 26 + 80,
        isRecording: false,
        tempFilePath: 'aa',
        tempFileStatus: false,
        duration: '0″',
        frameBuffer: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //   var letter = JSON.parse(options.letter)
        //   this.setData({
        //       content: letter.content,
        //       selected: letter.selected
        //   })
    },

    /**
     * 录音
     */
    startRecord: function () {
        var self = this
        wx: wx.getSetting({
            success: function (res) {
                if (!res.authSetting['scope.record']) {
                    wx: wx.authorize({
                        scope: 'scope.record',
                        success: function (res) { },
                        fail: function (res) { },
                        complete: function (res) { },
                    })
                } else {
                    recordManager.start(options)
                    recordManager.onStart(() => {
                        self.setData({ isRecording: true })
                    })
                }
            },
            fail: function (res) { },
            complete: function (res) { },
        })
    },

    /**
     * 结束录音
     */
    stopRecord: function () {
        var self = this

        recordManager.stop()

        recordManager.onStop(res => {
            console.log(res)
            self.setData({ 
                isRecording: false,
                tempFilePath: res.tempFilePath,
                duration: res.duration
            })
        })

        recordManager.onFrameRecorded((res) => {
            console.log('frameBuffer.byteLength', res.frameBuffer.byteLength)
            self.setData({ frameBuffer: res.frameBuffer})
        })

    },

    /**
     * 播放、停止音频
     */
    playOrStopVoice: function () {
        if(this.data.tempFileStatus) {
            innerAudioContext.stop()
            this.setData({tempFileStatus: false})
            console.log('结束播放')
        } else {
            innerAudioContext.autoplay = true
            innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
            innerAudioContext.onPlay(() => {
                console.log('开始播放')
            })
            innerAudioContext.onError((res) => {
                console.log(res.errMsg)
                console.log(res.errCode)
            })
            this.setData({ tempFileStatus: true })
        }
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