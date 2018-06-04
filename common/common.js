const baseUrl = "http://192.168.12.79:8080/LoveLetterServer"

/**
 * 登录验证
 */
function checkLogin(url, code) {
    return sendRequest(url, code).then(res => res.data)
}

/**
 * 获取书信列表
 */
function getLetterList(url) {
    return sendRequest(url).then(res => res.data)
}

/**
 * 根据ID获取书信数据
 */
function getLetterById(url) {
    return sendRequest(url).then(res => res.data)
}

/**
 * 封装请求函数
 */
function sendRequest(url, data) {
    return new Promise((resole, reject) => {
        wx.request({
            url: baseUrl + url,
            method: 'post',
            data: data,
            header: {
                'content-type': 'application/json'
            },
            success: resole,
            fail: reject
        })
    })
}

module.exports = {
    checkLogin: checkLogin,
    getLetterList: getLetterList,
    getLetterById: getLetterById
}