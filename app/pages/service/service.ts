import { IMyApp } from '../../app';
import { getIndex, formatTime } from '../../utils/util';
const app = getApp<IMyApp>()
Page({
  data: {
    codeUrl: '',
    server: {}
  },
  onShow() {
    const that = this;
    app.getKey((userInfo: any) => {
      if (!userInfo) {
        app.globalData.showLoginPanel = true;
      } else {
        wx.request({
          url: app.globalData.prefix + 'getService', //考前资料列表
          method: 'POST',
          data: { key: app.globalData.userInfo.key, id: app.globalData.userInfo.serviceId },
          success(res: any) {
            console.log(res);
            that.setData!({
              codeUrl: app.globalData.filePrefix + res.data.result.fileId,
              server: res.data.result
            })
            console.log(that.data);
          }
        });
      }
    })
  },
  previewImage() {
    console.log('previewImage');
    wx.previewImage({
      current: this.data.codeUrl, // 当前显示图片的http链接
      urls: [this.data.codeUrl] // 需要预览的图片http链接列表
    })
  },
  makeCall() {
    wx.makePhoneCall({ phoneNumber: this.data.server.mobile });
  },
  onShareAppMessage() {
    app.updateShare();
    return {
      title: '立即得到',
      path: '/pages/service/service'
    }
  }
})
