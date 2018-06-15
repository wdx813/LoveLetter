// pages/recommend/recommend.js
const common = require('../../common/common.js')
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sender: '吴歌',
        letterType: 3,
        headimg: '/images/erke1.jpg'
    },

    /**
     * 获取推荐书信
     */
    getRecommendLetter: function () {
        var userId = app.globalData.userInfo ? app.globalData.userInfo.id : 0
        common.getRecommendLetter('/letter/recommend', userId).then(res => {
            console.log(res)
        })
    },

    /**
     * 查看书信
     */
    getUserInfo: function (e) {
        if (e.detail.userInfo) {
            if (!app.globalData.userInfo) {
                var user = {
                    openId: app.globalData.openid,
                    nickname: e.detail.userInfo.nickName,
                    gender: e.detail.userInfo.gender,
                    avatar: e.detail.userInfo.avatarUrl
                }
                // 保存用户数据
                common.saveUser('/user/save', user).then(res => {
                    console.log(res)
                    app.globalData.userInfo = res.data.userInfo
                })
            } else {

            }
        } else {
            wx.showModal({
                title: '授权失败',
                content: '您已经拒绝爱之信使用您的用户信息，爱之信的功能将无法使用，如果您想继续使用，请允许爱之信使用您的用户信息',
                showCancel: false
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getRecommendLetter()
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