// pages/funcs/cjcx/cjcx.js


const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [['全部', '2016-2017', '2017-2018', '2018-2019', '2019-2020'], ['全部', '1', '2']],
    multiIndex: [4, 1],
    cjlist: [],
  },

  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', this.data.multiArray[0][e.detail.value[0]], this.data.multiArray[1][e.detail.value[1]])
    this.setData({
      multiIndex: e.detail.value
    })
    this.getAllScore()
  },

  // 从数据库获取课程
  getAllScore: function () {
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: app.globalData.host + '/get_all_score',
      data: {
        openid: app.globalData.openid,
        xnm: this.data.multiArray[0][this.data.multiIndex[0]],
        xqm: this.data.multiArray[1][this.data.multiIndex[1]]
      },
      success: res => {
        console.log(res.data)
        this.setData({
          cjlist: res.data
        })
        wx.hideLoading()
      }
    })
  },

  get_score_detail:function(e){
    console.log(e.currentTarget.id)
    wx.request({
      url: app.globalData.host + '/get_score_detail',
      data:{
        openid: app.globalData.openid,
        kch: e.currentTarget.id
      },
      success: res => {
        console.log(res.data)
        this.setData({
          cjlist: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'scorestatu',
      success: res => {
        this.getAllScore()
        console.log("获取成功")
      },
      fail: info => {
        wx.showLoading({
          title: '拉取成绩中～',
        })
        wx.request({
          url: app.globalData.host + '/updata_all_score',
          data: {
            openid: app.globalData.openid
          },
          success: res => {
            console.log(res.data)
            if (res.statusCode == 500){
              wx.showModal({
                title: '出错啦',
                content: '服务器忙不过来～请清除缓存后重试',
                showCancel: false
              })
            } else {
              wx.showToast({
                title: '获取成功！',
                icon: 'none',
                duration: 2000
              })
              wx.setStorage({
                key: 'scorestatu',
                data: 'ready'
              })
            }
          },
          complete: info => {
            wx.hideLoading()
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