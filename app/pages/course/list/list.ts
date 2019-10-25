import { IMyApp } from '../../../../app';
import { formatTime } from '../../../utils/util';
const app = getApp<IMyApp>();
Page({
  data: {
    tabs: ["直播", "录播"],
    activeIndex: 1,
    subjects: [],
    subject: '',
    sliderOffset: 0,
    sliderLeft: 0,
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
        console.log(res);
        that.setData!({
          subjects: res.data.result.list,
          subject: res.data.result.list[0]
        });
        console.log(that.data.subject);
      }
    });
    this.setData!({
    })
  },
  tabClick(e: any) {
    this.setData!({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    })
  },
  selected(e: any) {
    console.log(e.currentTarget.dataset.item);
    this.setData!({
      subject: e.currentTarget.dataset.item
    });
  },
  more() {
    console.log('more');
    this.setData!({
      showMore: !this.data.showMore
    });
    console.log(this.data.showMore);
  }
})
