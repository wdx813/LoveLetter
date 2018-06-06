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
        recordStatus: 0, // 0：未录音 1：正在录音 2：录音结束
        tempFilePath: '1',
        tempFileStatus: false,
        duration: '0″',
        frameBuffer: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var letter = JSON.parse(options.letter)
        this.setData({
            content: letter.content,
            selected: letter.selected
        })
        // 注册录音的回调事件
        this.recordManagerCallBack()
        // 注册音频播放的回调事件
        this.innerAudioContextCallBack()
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
                        success: function (res) {
                            console.log('点击了确认')
                        },
                        fail: function (res) {
                            console.log('点击了取消')
                        },
                        complete: function (res) { },
                    })
                } else {
                    recordManager.start(options)
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
        recordManager.stop()
    },

    /**
     * 录音的回调事件
     */
    recordManagerCallBack: function() {
        var self = this
        recordManager.onStart(() => {
            self.setData({ recordStatus: 1 })
        })

        recordManager.onStop(res => {
            console.log(res)
            self.setData({
                recordStatus: 2,
                tempFilePath: res.tempFilePath,
                duration: parseInt(res.duration/1000) + '″'
            })
        })

        recordManager.onFrameRecorded((res) => {
            console.log('frameBuffer.byteLength', res.frameBuffer.byteLength)
            self.setData({ frameBuffer: res.frameBuffer })
        })
    },

    /**
     * 播放、停止音频
     */
    playOrStopVoice: function () {
        if (this.data.tempFileStatus) {
            innerAudioContext.stop()
        } else {
            innerAudioContext.obeyMuteSwitch = false
            innerAudioContext.src = this.data.tempFilePath
            innerAudioContext.play()
        }
    },

    /**
     * 音频播放的回调事件
     */
    innerAudioContextCallBack: function() {
        var self = this
        innerAudioContext.onPlay(() => {
            console.log('开始播放')
            self.setData({ tempFileStatus: true })
        })
        innerAudioContext.onStop(() => {
            console.log('手动结束')
            self.setData({ tempFileStatus: false })
        })
        innerAudioContext.onError((res) => {
            console.log(res.errMsg)
            console.log(res.errCode)
        })
        innerAudioContext.onEnded(() => {
            console.log('自然结束')
            self.setData({ tempFileStatus: false })
        })
    }, 

    /**
     * 重录
     */
    reset: function () {
        this.setData({
            recordStatus: 0,
            tempFilePath: ''
        })
    }, 

    /**
     * 提交
     */
    submit: function () {

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