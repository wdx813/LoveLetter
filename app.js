//app.js
const common = require('/common/common.js')

App({
    onLaunch: function () {
        
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                console.log(res.code)
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                common.checkLogin('/checkLogin', res.code).then(res => {
                    console.log(res);
                    this.globalData.openid = res.data.openid
                    this.globalData.userInfo = res.data.userInfo
                })
            }
        })

        // 获取设备的宽高
        var self = this
        wx.getSystemInfo({
            success: function(res) {
                self.globalData.windowHeight = res.windowHeight
                self.globalData.windowWidth = res.windowWidth
            },
        })
    },
    globalData: {
        userInfo: null,
        openid: null,
        windowWidth: 0,
        windowHeight: 0
    }
})