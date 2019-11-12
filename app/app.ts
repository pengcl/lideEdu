//app.ts
import { getIndex } from './utils/util'
export interface IMyApp {
  globalData: {
    sessionKey?: string,
    openId?: string,
    showLoginPanel: boolean,
    userInfo: {
      isShare: number | null,
      key: string,
      openId: string,
      sessionKey: string,
      phoneNumber: string,
      serviceId: number | null,
      memberId: number | null,
      typeId: number | null,
      typeShare: string
    },
    typeId?: number,
    prefix?: string,
    filePrefix?: string,
    dataTabIndex?: string,
    share?: any,
    array?: any[],
    objectArray?: any[],
    data?: {}
  }
  getTypeId?: any,
  getKey?: any,
  watch?: any,
  updateShare?: any
}

App<IMyApp>({
  onLaunch() {
  },
  watch: function (key: string, method: any) {
    let obj = this.globalData;
    //加个前缀生成隐藏变量，防止死循环发生
    let ori = obj[key];   //obj[key]这个不能放在Object.defineProperty里

    if (ori) {    //处理已经声明的变量，绑定处理
      method(ori);
    }
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set: function (value) {
        this['___' + key] = value;
        method(value);    //数据有变化的时候回调函数，实现同步功能
      },
      get: function () {
        if (typeof this['__' + key] == 'undefined') {
          if (ori) {
            //这里读取数据的时候隐藏变量和 globalData设置不一样，所以要做同步处理
            this['__' + key] = ori;
            return ori;
          } else {
            return undefined;
          }
        } else {
          return this['__' + key];
        }
      }
    })
  },
  getKey: function (cb: any) {
    const that = this;
    const key = this.globalData.userInfo.key;
    if (key) {
      cb(this.globalData.userInfo);
    } else {
      // 登录
      wx.login({
        success(_res) {
          wx.request({// 发送 _res.code 到后台换取 openId, sessionKey, unionId
            url: 'https://ldxt.betajy.com/intf/unionAuth?code=' + _res.code, //
            success(res: any) {
              const userInfo = res.data.result;
              if (res.data.result.key) {
                wx.request({
                  url: that.globalData.prefix + 'getProjectList', //获取项目列表
                  success(res: any) {
                    const index = getIndex(res.data.result.list, 'isDefault', 1);
                    const subject = res.data.result.list[index];
                    console.log(subject);
                    userInfo.typeId = subject.id;
                    userInfo.typeShare = that.globalData.filePrefix + subject.shareFileId
                    that.globalData.userInfo = userInfo;
                    cb(that.globalData.userInfo)
                  }
                });
              } else {
                that.globalData.userInfo = userInfo;
                cb(null);
              }
            }
          });
        }
      })
    }
  },
  getTypeId: function (cb: any) {
    if (this.globalData.typeId) {
      cb(this.globalData.typeId)
    } else {
      const that = this;
      wx.request({
        url: that.globalData.prefix + 'getProjectList', //获取项目列表
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res: any) {
          that.globalData.typeId = res.data.result.list[0].id;
          cb(res.data.result.list[0].id)
        }
      });
    }
  },
  updateShare() {
    const that = this;
    wx.request({
      url: this.globalData.prefix + 'updateShare', //考前资料列表
      method: 'POST',
      data: { key: this.globalData.userInfo.key },
      success() {
        that.globalData.userInfo.isShare = 1;
      }
    });
  },
  globalData: {
    typeId: 0,
    dataTabIndex: '0',
    prefix: 'https://ldxt.betajy.com/intf/call/?action=',
    filePrefix: 'https://ldxt.betajy.com/admin/fileupload/previewFile?id=',
    showLoginPanel: false,
    share: {
      page: '',
      scene: ''
    },
    userInfo: {
      isShare: 0,
      key: '',
      openId: '',
      sessionKey: '',
      phoneNumber: '',
      serviceId: null,
      typeId: null,
      memberId: null,
      typeShare: ''
    },
    data: {}
  }
})