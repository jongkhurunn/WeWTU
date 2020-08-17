// pages/bind/bind.js

const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: "",
    checked: 'false'
  },

  checkBox: function(e){
    this.setData({
      checked: 'true'
    })
  },

  proxy: function(e){
    wx.navigateTo({
      url: '/pages/bind/proxy',
    })
  },

  login: function(e){
    if(this.data.checked=='true'){
      wx.showLoading({
        title: '',
      })
      wx.request({
        url: app.globalData.host + '/login_check',
        method: "post",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          "username": e.detail.value.username,
          "password": e.detail.value.password,
          "openid": this.data.openid,
        },
        success: res => {
          console.log(res)
          if (res.data == 200) {
            app.globalData.bind = 200
            wx.reLaunch({
              url: '/pages/index/index'
            })
          } else if (res.statusCode == 500){
            wx.hideLoading()
            wx.showModal({
              title: '出错啦',
              content: '服务器忙不过来，请重试～',
              showCancel: false
            })
          } else {
            wx.hideLoading()
            wx.showModal({
              title: '登陆失败',
              content: '账号或密码错误',
              showCancel: false
            })
          }
        },
      })
    } else {
      console.log("未确定")
      wx.showToast({
        title: '请先阅读服务条款',
        icon: 'none',
        duration: 2000
      })
    }
  },

    /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function () {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    } else {
      console.log("没有获取openid")
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