import { IMyApp } from '../../app';
import { getIndex, formatTime } from '../../utils/util';
const app = getApp<IMyApp>();

Page({
  data: {
    inputShowed: false,
    inputVal: "",
  },
  onShow() {
    app.getKey((userInfo: any) => {
      if (!userInfo) {
        app.globalData.showLoginPanel = true;
      } else { }
    })
  },
  showInput() {
    this.setData!({
      inputShowed: true
    });
  },
  hideInput() {
    this.setData!({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput() {
    this.setData!({
      inputVal: ""
    });
  },
  inputTyping(e: any) {
    this.setData!({
      inputVal: e.detail.value
    });
  },
  onShareAppMessage() {
    app.updateShare();
    return {
      title: '立得学堂',
      path: '/pages/search/search'
    }
  }
})
