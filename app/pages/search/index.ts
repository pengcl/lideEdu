Page({
  data: {
    inputShowed: false,
    inputVal: ""
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
    console.log(e.detail.value);
  }
})
