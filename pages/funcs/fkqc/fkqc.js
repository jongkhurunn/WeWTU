// pages/funcs/fkqc/fkqc.js

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    balance: '',
    cardno: '' 
  },

  chongzhi: function(e){
    if(e.detail.value.money=="")
      console.log("金额为空")
    else{
      wx.showLoading({
        title: '充值中....',
        mask: true
      })
      wx.request({
        url: app.globalData.host + '/chongzhi',
        method: "get",
        data: {
          openid: app.globalData.openid,
          cardno: this.data.cardno,
          value: e.detail.value.money
        },
        success: res => {
          console.log(res.data)
          wx.hideLoading()
          wx.showModal({
            title: '',
            content: res.data,
            showCancel: false
          }),
            wx.request({
              url: app.globalData.host + '/get_balance',
              method: "get",
              data: {
                openid: app.globalData.openid
              },
              success: res => {
                console.log("获得余额" + res.data['balance']);
                if (res.statusCode == 500) {
                  wx.showModal({
                    title: '出错啦',
                    content: '服务器忙不过来，请返回重试哦～',
                  })
                } else {
                  this.setData({
                    balance: res.data['balance'],
                    cardno: res.data['cardno']
                  })
                }
              },
            })
        },
        complete: info => {
          this.setData({
            money: ""
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options){
    // console.log(app.globalData.openid)
    wx.showLoading({
      title: '查询中....',
    })
    wx.request({
      url: app.globalData.host +"/get_balance",
      method: "get",
      data: {
        openid: app.globalData.openid
      },
      success: res => {
        console.log("获得余额"+res.data['balance']); 
        if (res.statusCode == 500){
          wx.showModal({
            title: '出错啦',
            content: '服务器忙不过来，请重试～',
            showCancel: false
          })
        } else {
          this.setData({
            balance: res.data['balance'],
            cardno: res.data['cardno']
          })
        }
      },
      fail: err => {
        console.log(err)
      },
      complete: info => {
        wx.hideLoading()
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