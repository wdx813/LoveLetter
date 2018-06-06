// pages/letter/letterList.js
const common = require("../../common/common.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        letterType: "致朋友",
        letterList: [],
        letters: [],
        current: 0,
        tapIndex: 0,
        preIndex: 0
    },

    /**
     * 获取书信的类型
     */
    getLetterType: function () {
        var self = this
        var year = new Date().getFullYear()
        var letterTypes = ['致朋友', '致家人', '致爱人', '致' + year + '年的我']
        wx.showActionSheet({
            itemList: letterTypes,
            success: function (res) {
                if(res.tapIndex == 3) {
                    wx.navigateTo({
                        url: '/pages/write/writeLetter?receiver=' + letterTypes[res.tapIndex],
                    })
                } else {
                    self.setData({
                        letterType: letterTypes[res.tapIndex],
                        letters: self.data.letterList[res.tapIndex],
                        tapIndex: res.tapIndex,
                        current: 0,
                    })
                }
            }
        })
    },

    /**
     * 跳转至书信的编辑页面
     */
    toWriteLetterPage: function () {
        wx.navigateTo({
            url: '/pages/write/writeLetter',
        })
    },

    /**
     * 获取书信列表
     */
    getLetterList: function () {
        wx:wx.showLoading({
            title: '加载中...',
            mask: true
        })
        common.getLetterList("/letter/findLetters").then(res => {
            if(res.code == "E0000") {
                wx:wx.hideLoading()
                var letterList = []
                letterList.push(res.data.friendLetters)
                letterList.push(res.data.familyLetters)
                letterList.push(res.data.loveLetters)
                this.setData({
                    letterList: letterList,
                    letters: letterList[0]
                })
            } else {
                wx.showToast({
                    title: '数据有误，请稍后操作',
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },

    /**
     * 读信
     */
    readLetter: function () {
        var current = this.data.current
        var letter = this.data.letters[current]
        if(letter.content.indexOf('...') != -1) {
            common.getLetterById('/letter/' + letter.id).then(res => {
                if(res.code == 'E0000') {
                    wx.navigateTo({
                        url: '/pages/read/readLetter?letter=' + JSON.stringify(res.data),
                    })
                } else {
                    wx.showToast({
                        title: '数据有误，请稍后操作',
                        icon: 'none',
                        duration: 2000
                    })
                }
            })
        } else {
            wx.navigateTo({
                url: '/pages/read/readLetter?letter=' + JSON.stringify(letter),
            })
        }
    },

    /**
     * 滑动获取当前页
     */
    onSlideChange: function(e) {
        // TODO swiper组件卡死的情况待处理
        // if(e.detail.source == 'touch') {
        //     if(e.detail.current == 0 && this.data.current > 0) {
        //         this.setData({ current: this.data.preIndex })
        //     } else {
        //         this.setData({ preIndex: this.data.current })
        //     }
        // }

        this.setData({ current: e.detail.current })
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getLetterList()
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