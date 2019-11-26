import { IMyApp } from '../../app';
import { getIndex, formatTime } from '../../utils/util';
const app = getApp<IMyApp>();
import drawQrcode from '../../utils/weapp.qrcode.esm.js';

Page({
  data: {
    tempFilePath: ''
  },
  onShow() {
    const that = this;
    const ctx = wx.createCanvasContext('poster');
    app.getKey((userInfo: any) => {
      if (!userInfo) {
        app.globalData.showLoginPanel = true;
      } else {
        wx.getSystemInfo({
          success: (res: any) => {
            let avatarurl_width = 100, //绘制的头像宽度
              avatarurl_heigth = 100, //绘制的头像高度
              avatarurl_x = res.windowWidth - (100 + 20), //绘制的头像在画布上的位置
              avatarurl_y = res.windowHeight - (100 + 68); //绘制的头像在画布上的位置
          
            wx.getImageInfo({
              src: app.globalData.userInfo.typeShare,
              success(poster) {
                ctx.drawImage(poster.path, 0, 0, res.windowWidth, res.windowHeight - 48);
                ctx.save(); // 先保存状态 已便于画完圆再用
                ctx.beginPath(); //开始绘制
                //先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
                ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);
                ctx.clip(); //画了圆 再剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
                const pages = getCurrentPages();
                const sharePage = pages[pages.length - 2];
                wx.getImageInfo({
                  src: 'https://ldxt.betajy.com/intf/getQRCode?page=' + sharePage.route + '&memberId=' + app.globalData.userInfo.memberId + 
                    '&projectId=' + app.globalData.userInfo.typeId,
                  success(result) {
                    // 把图片存下
                    console.log(result.path);
                    
                    ctx.drawImage(result.path, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth); // 推进去图片
                    ctx.draw(true, () => {
                      wx.canvasToTempFilePath({
                        x: 0,
                        y: 0,
                        width: res.windowWidth,
                        height: res.windowHeight,
                        destWidth: res.windowWidth,
                        destHeight: res.windowHeight,
                        canvasId: 'poster',
                        success(res) {
                          that.setData!({
                            tempFilePath: res.tempFilePath;
                          })
                        }
                      })
                    });
                  },
                  fail(err) {
                    console.log(err);
                  },
                });
              });
            //ctx.draw();
          }
        });

      }
    });

  },
  save() {
    app.updateShare();
    wx.saveImageToPhotosAlbum({
      filePath: this.data.tempFilePath,
      success() {
        wx.showToast({
          title: '保存成功', // 提示的内容,
          icon: 'success', // 图标,
          duration: 2000, // 延迟时间,
          mask: true, // 显示透明蒙层，防止触摸穿透,
        });
      },
      fail(err) {
        console.log(err);
        wx.showToast({
          title: '保存失败', // 提示的内容,
          icon: 'none', // 图标,
          duration: 2000, // 延迟时间,
          mask: true, // 显示透明蒙层，防止触摸穿透,
        });
      },
    });
  },
  onShareAppMessage() {
    app.updateShare();
    return {
      title: '教育成就美好未来',
      path: '/pages/data/list/list'
    }
  }
})
