const test_baseUrl = "http://localhost:8080/LoveLetterServer"
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
 * 保存用户数据
 */
function saveUser(url, data) {
    return sendRequest(url, data).then(res => res.data)
}
/**
 * 获取推荐的书信
 */
function getRecommendLetter(url, data) {
    return sendRequest(url, data).then(res => res.data)
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

/**
 * 上传文件
 */
function uploadFile(url, data, filePath) {
    return new Promise((resole, reject) => {
        wx.uploadFile({
            url: baseUrl + url,
            filePath: filePath,
            name: 'file',
            formData: data,
            success: resole,
            fail: reject
        })
    })
}

module.exports = {
    checkLogin: checkLogin,
    getLetterList: getLetterList,
    getLetterById: getLetterById,
    saveUser: saveUser,
    getRecommendLetter: getRecommendLetter,
    uploadFile: uploadFile
}