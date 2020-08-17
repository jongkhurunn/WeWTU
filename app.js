//app.js
App({
  onLaunch: function () {

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    // 下载新版本
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好啦，是否重启小程序？',
        success(res) {
          if (res.confirm) {
            // 清除缓存并重启应用
            wx.clearStorage()
            updateManager.applyUpdate()
          }
        }
      })
    })
    // 新版本下载失败
    updateManager.onUpdateFailed(function (res) {
      wx.showModal({
        title: '已经有新版本喽~',
        content: '请您删除当前小程序，重新搜索打开哦~',
      })
    })
    // 获取公告
    // wx.request({
    //   url: this.globalData.host + '/announce',
    //   method: "get",
    //   success: res =>{
    //     console.log(res.data)
    //     if (res.data.code == 1){
    //       wx.showModal({
    //         title: '公告',
    //         content: res.data.msg,
    //       })
    //     }
    //   }
    // })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: this.globalData.host +'/get_openid',
            method: "get",
            data: {
              code: res.code,
            },
            success: res => {
              console.log("获取openid成功")
              this.globalData.openid = res.data
              wx.request({
                url: this.globalData.host + '/hasBind',
                method: "get",
                data: {
                  openid: res.data
                },
                success: res => {
                  console.log("获取绑定状态" + res.data)
                  this.globalData.bind = res.data
                }
              })
            },
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log("已获取授权")
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
  },

  globalData: {
    userInfo: null,
    openid: null,
    host: 'http://127.0.0.1:5000',
    bind: 404,
  }
})