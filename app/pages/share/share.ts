import drawQrcode from '../../utils/weapp.qrcode.esm.js';
Page({
  data: {
  },
  onLoad() {
    this.setData!({
    });
    this.draw();
  },
  draw(){
    drawQrcode({
      width: 100,
      height: 100,
      canvasId: 'myQrcode',
      // ctx: wx.createCanvasContext('myQrcode'),
      text: 'https://github.com/yingye',
      // v1.0.0+版本支持在二维码上绘制图片
      image: {
        imageResource: '../../images/icon.png',
        dx: 70,
        dy: 70,
        dWidth: 60,
        dHeight: 60
      }
    })
  }
})
