Page({
  data: {
    tabs: ["直播", "录播"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onLoad() {
    this.setData!({
    })
  },
  tabClick(e) {
    this.setData!({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    })
  }
})
