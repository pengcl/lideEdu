import { IMyApp } from '../../../../app';
import { formatTime } from '../../../utils/util';
const app = getApp<IMyApp>();
Page({
  data: {
    subjects: [],
    subject: '',
    items: [],
    showMore: false
  },
  onShow() {
    const that = this;
    app.getKey((userInfo: any) => {
      if (!userInfo) {
        app.globalData.showLoginPanel = true
      } else {
        wx.request({
          url: app.globalData.prefix + 'getSubjectList', //考前资料列表
          method: 'POST',
          data: { key: app.globalData.userInfo.key, id: app.globalData.userInfo.typeId },
          success(res: any) {
            that.setData!({
              subjects: res.data.result.list,
            });
            that.getItems('');
          }
        });
      }
    })
  },

  getItems(subjectId: any) {
    const that = this;
    wx.request({
      url: app.globalData.prefix + 'getVideoList', //考前资料列表
      method: 'POST',
      data: { key: app.globalData.userInfo.key, id: app.globalData.userInfo.typeId, subjectId: subjectId },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res: any) {
        that.setData!({
          items: res.data.result.list
        });
      }
    });
  },
  selected(e: any) {
    this.setData!({
      subject: e.currentTarget.dataset.item
    });
    this.getItems(e.currentTarget.dataset.item.id);
  },
  onReachBottom() {
    console.log('bottom');
  },
  more() {
    this.setData!({
      showMore: !this.data.showMore
    });
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
      path: '/pages/course/list/list'
    }
  }
})
