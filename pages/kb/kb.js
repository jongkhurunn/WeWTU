// pages/kb/kb.js

const app = getApp()
const GetPeriod = require("../../utils/getperiod.js");
const util = require('../../utils/util.js')


Page({
  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    width: 0,
    colorArrays: ["#c26458", "#965e77", "#6b8093", "#bf8f4d", "#4c8769", "#7899a0", "#7d995e"],
    kblist: [],
    weekNum: util.getWeekNum('2020/08/31'),  // 周号(开学的第1周)
    nowWeeks: [],  // 本周数组(7天的日期+星期)
    nowDayOfWeek: 0,  // 星期号（星期一：1）
  }, 

  lastWeek: function (e) {
    if (this.data.nowDayOfWeek == 0) {
      this.setData({
        weekNum: util.getWeekNum('2020/08/31'),
        nowWeeks: this.time.getNowWeeks(),
        nowDayOfWeek: this.time.nowDayOfWeek
      })
      wx.setNavigationBarTitle({
        title: '第 ' + this.data.weekNum + ' 周',
      })
    } else {
      var lastWeekNum = this.data.weekNum - 1
      this.setData({
        weekNum: lastWeekNum,
        nowWeeks: this.time.getLastWeeks(),
        nowDayOfWeek: 0
      })
      wx.setNavigationBarTitle({
        title: '第 ' + lastWeekNum + ' 周',
      })
    }
  },

  nextWeek: function (e) {
    if(this.data.nowDayOfWeek == 0){
      this.setData({
        weekNum: util.getWeekNum('2020/08/31'),
        nowWeeks: this.time.getNowWeeks(),
        nowDayOfWeek: this.time.nowDayOfWeek
      })
      wx.setNavigationBarTitle({
        title: '第 ' + this.data.weekNum + ' 周',
      })
    } else {
      var nextWeekNum = this.data.weekNum + 1
      this.setData({
        weekNum: nextWeekNum,
        nowWeeks: this.time.getNextWeeks(),
        nowDayOfWeek: 0
      })
      wx.setNavigationBarTitle({
        title: '第 ' + nextWeekNum + ' 周',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options){
    // 获取当前周信息
    this.time = new GetPeriod()
    this.setData({
      nowWeeks: this.time.getNowWeeks(),  // 设置本周日期
      nowDayOfWeek: this.time.nowDayOfWeek,  // 星期x
    })
    wx.setNavigationBarTitle({
      title: '第 ' + this.data.weekNum + ' 周',
    })
    if (app.globalData.bind == 200) {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      // 获取课表本地缓存
      wx.getStorage({
        key: 'kblist',
        success: res => {
          console.log("获取缓存成功")
          this.setData({kblist: res.data})
          wx.hideLoading()
        },
        fail: info => {
          console.log("获取缓存失败")
          wx.request({
            url: app.globalData.host + '/update_crouse',
            headers: {
              'Content-Type': 'application/json'
            },
            data: {
              openid: app.globalData.openid
            },
            success: res => {
              console.log("课表更新成功") 
              if (res.statuCode == 500){
                wx.showModal({
                  title: '出错啦',
                  content: '服务器忙不过来，请清除缓存后重试',
                  showCancel:false
                })
              } else {
                this.setData({ kblist: res.data })
                wx.setStorageSync('kblist', res.data)
              }
            },
            complete: info => {
              wx.hideLoading()
            }
          }) 
        }
      })
    } else if(app.globalData.bind == 204) {
      wx.navigateTo({url: '../bind/bind'})
    } else {
      console.info("未获得绑定状态")
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