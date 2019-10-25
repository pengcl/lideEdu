//app.ts
export interface IMyApp {
  userInfoReadyCallback?(res: wx.UserInfo): void
  globalData: {
    userInfo?: wx.UserInfo,
    typeId?: number,
    prefix?: string,
    filePrefix?: string,
    dataTabIndex?: string,
    share?: any,
    array?:any[],
    objectArray?:any[]
  }
}

App<IMyApp>({
  onLaunch() {
    // 展示本地存储能力
    const that = this;
    var logs: number[] = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success(_res) {
        // console.log(_res.code)
        // 发送 _res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res.userInfo)
              }
            }
          })
        }
      }
    });
    wx.request({
      url: this.globalData.prefix + 'getProjectList', //获取项目列表
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res: any) {
        that.globalData.typeId = res.data.result.list[0].id;
        console.log(that.globalData.typeId);
      }
    })
  },
  globalData: {
    typeId: 0,
    dataTabIndex: '0',
    prefix: 'http://lide.ai-fox.net/intf/call/?action=',
    filePrefix:'http://lide.ai-fox.net/admin/fileupload/previewFile?id=',
    share: {
      page: '',
      scene: ''
    }
  }
})