Page({
  data: {
  },
  onLoad() {
    this.setData!({
    })
  },
  makeCall() {
    wx.makePhoneCall({ phoneNumber: '15013262507' });
  }
})
