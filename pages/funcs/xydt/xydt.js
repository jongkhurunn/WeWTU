// pages/funcs/xydt/xydt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      "https://picb.oss-cn-beijing.aliyuncs.com/img/ygcampus.jpg",
      "https://picb.oss-cn-beijing.aliyuncs.com/img/nhcampus.jpg",
      "https://picb.oss-cn-beijing.aliyuncs.com/img/dhcampus.jpg"
    ]
  },
  previewYG: function(e) {
    wx.previewImage({
      current: "https://picb.oss-cn-beijing.aliyuncs.com/img/ygcampus.jpg",
      urls: this.data.list,
    })
  },
  previewNH: function (e) {
    wx.previewImage({
      current: "https://picb.oss-cn-beijing.aliyuncs.com/img/nhcampus.jpg",
      urls: this.data.list,
    })
  },
  previewDH: function (e) {
    wx.previewImage({
      current: "https://picb.oss-cn-beijing.aliyuncs.com/img/dhcampus.jpg",
      urls: this.data.list,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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