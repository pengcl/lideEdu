//index.js
//获取应用实例
import { IMyApp } from '../../app'

const app = getApp<IMyApp>()

Page({
  data: {
    motto: '点击 “编译” 以构建',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    index: 0,
    array: ['一建', '二建', '一消', '一造', '二造', '监理', '安全', 'BIM', '学历教育', '无人机', '企业内训', '安全员', '初级经济师', '系统集成工程师'],
    objectArray: [
      {
        id: 0,
        name: '一建'
      },
      {
        id: 1,
        name: '二建'
      },
      {
        id: 2,
        name: '一消'
      },
      {
        id: 3,
        name: '一造'
      },
      {
        id: 4,
        name: '二造'
      },
      {
        id: 5,
        name: '监理'
      },
      {
        id: 6,
        name: '安全'
      },
      {
        id: 7,
        name: 'BIM'
      },
      {
        id: 8,
        name: '学历教育'
      },
      {
        id: 9,
        name: '无人机'
      },
      {
        id: 10,
        name: '企业内训'
      },
      {
        id: 11,
        name: '安全员'
      },
      {
        id: 12,
        name: '初级经济师'
      },
      {
        id: 13,
        name: '系统集成工程师'
      }
    ],
  },
  //事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toPage(e) {
    app.globalData.dataTabIndex = e.currentTarget.dataset.index;
    wx.switchTab({ url: '../data/list/list' })
  },
  bindPickerChange: function (e) {
    app.globalData.index = e.detail.value;
    this.setData!({
      index: app.globalData.index
    })
  },
  onLoad() {
    this.setData!({
      index: app.globalData.index
    })
    if (app.globalData.userInfo) {
      this.setData!({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = (res) => {
        console.log(res);
        this.setData!({
          userInfo: res,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData!({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo(e: any) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData!({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
  onShareAppMessage(res) {
    return {
      title: '立即得到',
      path: '/pages/index/index'
    }
  }
})
