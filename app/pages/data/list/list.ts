import { IMyApp } from '../../../../app';
const app = getApp<IMyApp>();
console.log(app.globalData);
Page({
  data: {
    tabs: ["考前资料", "答案对照"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onShow() {
    this.setData!({
      activeIndex: app.globalData.dataTabIndex
    });
  },
  tabClick(e) {
    app.globalData.dataTabIndex = e.currentTarget.id;
    this.setData!({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    })
  }
})
