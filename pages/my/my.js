// pages/my/my.js



const app = getApp()



Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "未绑定"
  },

  bind: function(e){
    var that = this
    if (that.data.username == "未绑定" || that.data.username == ""){
      wx.navigateTo({
        url: '../bind/bind'
      })
    } else {
      wx.showModal({
        title: '解绑账号',
        content: '确认要解除学号与小程序的绑定吗？',
        success: res => {
          if (res.confirm){
            wx.request({
              url: app.globalData.host + '/clear_cache',
              data: {
                username: this.data.username
              },
              success: res => {
                if (res.data == '200') {
                  wx.clearStorage()
                  app.globalData.bind = "204"
                  wx.reLaunch({
                    url: '/pages/index/index'
                  })
                } else {
                  wx.showToast({
                    title: '出错啦，请重试或联系客服',
                    icon: 'none',
                    duration: 2000
                  })
                }
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      
    }
  },

  clearCache(e){
      wx.showModal({
        title: '清除缓存',
        content: '清除缓存不会解绑账号',
        success(res) {
          if (res.confirm) {
            wx.clearStorage()
            wx.reLaunch({
              url: '/pages/index/index'
            })
          }
        }
      })
  },
  
  aboutme(e){
    wx.navigateTo({
      url: '/pages/my/about',
    })
  },

  handleContact(e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'username',
      success: res => {
        console.log("获取缓存成功"+res.data)
        this.setData({
          username: res.data
        })
      },
      fail: info =>{
        console.log("获取缓存失败")
        wx.request({
          url: app.globalData.host + '/get_userInfo',
          data: {
            openid: app.globalData.openid
          },
          success: res => {
            if(res.data!="404"){
              console.log("获取绑定成功"+res.data)
              this.setData({
                username: res.data['username']
              })
              wx.setStorage({
                key: 'username',
                data: res.data['username'],
              })
            }
          }
        })
      }
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