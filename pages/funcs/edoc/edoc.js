// pages/funcs/edoc/edoc.js

const app = getApp()
const WeValidator = require('../../../utils/we-validator.js')
import { base64src } from'../../../utils/base64src.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      { text: '选择文件' },
      { text: '文件预览' },
      { text: '填写邮箱' },
      { text: '申请结果' }
    ],
    active: 0,
    edocList: [],
    authorization:'',
    pdfSerialId: '',
    vcPrintTypeId: '',
    smallImageList: '',
    email:'',
    resultMsg: {}
  },

  initValidator() {
    this.validatorInstance = new WeValidator({
      rules: {
        email: { required: true, email: true },
      },
      messages: {
        email: { required: '请输入邮箱', email: '邮箱格式不正确' },
      },
    })
  },

  getEmail: function (event) {
    console.log("失去焦点获取的值", event.detail.value);//获取值
    // 设置值
    this.setData({
      email: event.detail.value
    })
  },

  confirmEmail: function (e) {
    if (!this.validatorInstance.checkData({"email":this.data.email})) {
      return console.log('submiting')
    } else {
      wx.setStorage({
        key: "email",
        data: this.data.email
      })
      wx.request({
        url: app.globalData.host + '/sendPDF',
        method: "post",
        data:{
          "openid": app.globalData.openid,
          "X-Authorization": this.data.authorization,
          "email": this.data.email,
          "pdfSerialId": this.data.pdfSerialId,
          "vcPrintTypeId": this.data.vcPrintTypeId,
          "edocList": this.data.edocList
        },
        success: res => {
          console.log(res.data)
          this.setData({
            active: this.data.active + 1,
            resultMsg: res.data
          })
        }
      })
    }
  },


  confirm: function(e) {
    this.setData({
      active: this.data.active + 1
    })
  },


  cancel: function(e) {
    this.setData({
      active: this.data.active - 1
    })
  },

  zoom: function(e) {
    wx.previewImage({
      current: this.data.smallImageList,
      urls: [this.data.smallImageList]
    })
  },

  showPDF: function (e) {
    wx.request({
      url: app.globalData.host + '/showPDF',
      method: 'post',
      data: {
        "openid": app.globalData.openid,
        "X-Authorization": this.data.authorization,
        "vcPrintTypeId": e.currentTarget.id
      },
      success: res => {
        console.log(res.data)
        if(res.data['errcode'] == '0'){
          base64src(res.data['result']['smallImageList'], res => {
            console.log(res) // 返回图片地址，直接赋值到image标签即可
            this.setData({
              smallImageList: res
            })
          })
          this.setData({
            pdfSerialId: res.data['result']['pdfSerialId'],
            // smallImageList: res.data['result']['smallImageList'],
            vcPrintTypeId: e.currentTarget.id,
            active: 1
          })
        } else {
          wx.showModal({
            title: '出错啦',
            content: '请联系开发者或重试',
            showCancel: false
          })
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.getStorage({
      key: 'email',
      success: res => {
        this.setData({
          email: res.data
        })
      }
    })
    wx.request({
      url: app.globalData.host + '/get_eDocList',
      data:{
        "openid": app.globalData.openid
      },
      success: res => {
        console.log(res)
        if (res.statuCode == 500) {
          wx.showModal({
            title: '出错啦',
            content: '服务器忙不过来，请清除缓存后重试',
            showCancel: false
          })
        } else {
          this.setData({
            edocList: res.data['data'],
            authorization: res.data['X-Authorization']
          })
        }
      },
      fail: info => {
        wx.showModal({
          title: '出错啦',
          content: '服务器忙不过来，请清除缓存后重试',
          showCancel: false
        })
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
    this.initValidator()
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