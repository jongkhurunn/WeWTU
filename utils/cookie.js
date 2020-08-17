const key = "cookie"

//存入cookie
function setCookieToStorage(cookie) {
  try {
    wx.setStorageSync(key, cookie)
    console.log("存入成功")
  } catch (e) {
    console.log(e)
  }
}
//storage取出cookie
function getCookieFromStorage() {
  var value = wx.getStorageSync(key)
  return value
}
//导出
module.exports = {
  setCookieToStorage: setCookieToStorage,
  getCookieFromStorage: getCookieFromStorage
}