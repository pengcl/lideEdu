Page({
  data: {
  },
  onShow() {
    this.setData!({
    })
  },
  onShareAppMessage() {
    app.updateShare();
    return {
      title: '立得学堂',
      path: '/pages/data/list/list'
    }
  }
})
