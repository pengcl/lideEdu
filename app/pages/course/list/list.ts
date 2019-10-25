import { IMyApp } from '../../../../app';
import { formatTime } from '../../../utils/util';
const app = getApp<IMyApp>();
Page({
  data: {
    subjects: [],
    subject: '',
    items:[],
    showMore: false
  },
  onShow() {
    const that = this;
    wx.request({
      url: app.globalData.prefix + 'getSubjectList', //考前资料列表
      data: { id: app.globalData.typeId },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res: any) {
        that.setData!({
          subjects: res.data.result.list,
          subject: res.data.result.list[0]
        });
        that.getItems(res.data.result.list[0].id);
      }
    });
  },

  getItems(subjectId:any) {
    const that = this;
    wx.request({
      url: app.globalData.prefix + 'getVideoList', //考前资料列表
      data: { id: app.globalData.typeId, subjectId: subjectId },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res: any) {
        console.log(res);
        that.setData!({
          items: res.data.result.list
        });
        console.log(that.data.items);
      }
    });
  },
  selected(e: any) {
    console.log(e.currentTarget.dataset.item);
    this.setData!({
      subject: e.currentTarget.dataset.item
    });
    this.getItems(e.currentTarget.dataset.item.id);
  },
  onReachBottom() {
    console.log('bottom');
  },
  more() {
    console.log('more');
    this.setData!({
      showMore: !this.data.showMore
    });
    console.log(this.data.showMore);
  }
})
