import { IMyApp } from '../../../../app';
const app = getApp<IMyApp>();
Page({
  data: {
    fileUrl: '',
    poster:'',
    videoContext: '',
    item: {},
    options:''
  },
  onLoad(options) {
    this.setData!({ options: options});
    const that = this;
    app.getKey((userInfo: any) => {
      if (!userInfo) {
        app.globalData.showLoginPanel = true
      } else {
        wx.request({
          url: app.globalData.prefix + 'getVideo', //考前资料列表
          method: 'POST',
          data: { key: app.globalData.userInfo.key, id: options!.id },
          success(res: any) {
            console.log(res.data.result);
            that.setData!({ item: res.data.result });
            that.setData!({ poster: app.globalData.filePrefix + res.data.result.coverFileId });
            that.setData!({ fileUrl: app.globalData.filePrefix + res.data.result.videoFileId });
            that.videoContext = wx.createVideoContext('myVideo');
          }
        });
      }
    })
  },
  requestPay() {
    const that = this;
    wx.request({
      url: app.globalData.prefix + 'wxMpPay', //考前资料列表
      method: 'POST',
      data: { key: app.globalData.userInfo.key, id: this.data.item.id },
      success(res: any) {
        wx.requestPayment({
          timeStamp: res.data.result.timeStamp,
          nonceStr: res.data.result.nonceStr,
          package: 'prepay_id=' + res.data.result.prepayId,
          signType: 'MD5',
          paySign: res.data.result.sign1,
          success: (res) => {
            if (res.errMsg === 'requestPayment:ok'){
              that.onLoad(that.data.options);
            }
          }
        })
      }
    });
  },
  onShareAppMessage() {
    app.updateShare();
    return {
      title: '立得学堂',
      path: '/pages/data/item/item?id=' + this.data.options.id;
    }
  }
})
