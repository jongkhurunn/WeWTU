// pages/index/index.js

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    announce: "",
    imgs: [
      "https://www.wtu.edu.cn/images/001.jpg",
      "https://www.wtu.edu.cn/images/20200701_jd99.png",
      "https://www.wtu.edu.cn/images/20200707_fzxyyx.gif",
      "https://www.wtu.edu.cn/images/20200701_ysxy.jpg",
    ],
  },

  jump: function(e){
    //功能页跳转
    wx.showLoading({
      title: '',
      mask: true
    })
    if(app.globalData.bind==200){
      wx.navigateTo({
        url: '../funcs/' + e.currentTarget.id + '/' + e.currentTarget.id,
      })
      wx.hideLoading()
    }else if(app.globalData.bind==204){
      wx.navigateTo({
        url: '../bind/bind'
      })
      wx.hideLoading()
    }else{
      console.info("未获得绑定状态")
      wx.hideLoading()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.host + '/announce',
      method: "get",
      success: res => {
        // console.log(res.data)
        if (res.data.code == 1) {
          this.setData({
            announce: res.data.msg
          })
        }
      }
    })
    //查看是否绑定了学生卡(已移至app.js)
    // if(app.globalData.openid){
    //   wx.request({
    //     url: app.globalData.host+'/hasBind',
    //     method: "get",
    //     data: {
    //       openid: app.globalData.openid
    //     },
    //     success: res => {
    //       console.log("获取绑定状态"+res.data)
    //       app.globalData.bind = res.data
    //     }
    //   })
    // } else {
    //   // 未获得openid进行callback回调
    //   console.log("获取绑定状态失败")
    //   app.userInfoReadyCallback = res => {
    //     app.globalData.openid = res.data
    //     wx.request({
    //       url: app.globalData.host+'/hasBind',
    //       method: "get",
    //       data: {
    //         openid: app.globalData.openid
    //       },
    //       success: res => {
    //         console.log("callback获取绑定状态成功"+res.data)
    //         app.globalData.bind = res.data;
    //       }
    //     })
    //   }
    // }
    
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