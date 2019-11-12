import { IMyApp } from '../../../app';
import { formatTime } from '../../../utils/util';
const app = getApp<IMyApp>();
Component({
  attached: function () {
    let that = this;
    app.watch('showLoginPanel', (v:any) => {
      that.setData!({
        show: v;
      });
    });
  },
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  options: {
    addGlobalClass: true
  },
  data: {
    // 这里是一些组件内部数据
    show: app.globalData.showLoginPanel,
    someData: {}
  },
  ready() {
  },
  methods: {
    // 这里是一个自定义方法
    getPhoneNumber(e: any) {
      const that = this;
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const options = currentPage.options;
      console.log(options);
      wx.request({
        url: app.globalData.prefix + 'initMember', //获取项目列表
        method: 'POST',
        data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          sessionKey: app.globalData.userInfo.sessionKey,
          openid: app.globalData.userInfo.openId,
          referee: options.scene ? decodeURIComponent(options.scene).split('&')[0] : ''
        },
        success(res: any) {
          app.globalData.userInfo.typeId = options.scene ? decodeURIComponent(options.scene).split('&')[1] : '';
          app.globalData.showLoginPanel = false;
          if (getCurrentPages().length != 0) {
            //刷新当前页面的数据
            getCurrentPages()[getCurrentPages().length - 1].onShow()
          }
        }
      })
    }
  }
})