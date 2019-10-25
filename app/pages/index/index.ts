//index.js
//获取应用实例
import { IMyApp } from '../../app';
import { getIndex, formatTime } from '../../utils/util';
const app = getApp<IMyApp>()

Page({
  data: {
    motto: '点击 “编译” 以构建',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    typeId: 0,
    index: 0,
    array: ['一建', '二建', '一消', '一造', '二造', '监理', '安全', 'BIM', '学历教育', '无人机', '企业内训', '安全员', '初级经济师', '系统集成工程师'], animation: '',
    objectArray: [
      {
        id: 0,
        name: '一建'
      },
      {
        id: 1,
        name: '二建'
      },
      {
        id: 2,
        name: '一消'
      },
      {
        id: 3,
        name: '一造'
      },
      {
        id: 4,
        name: '二造'
      },
      {
        id: 5,
        name: '监理'
      },
      {
        id: 6,
        name: '安全'
      },
      {
        id: 7,
        name: 'BIM'
      },
      {
        id: 8,
        name: '学历教育'
      },
      {
        id: 9,
        name: '无人机'
      },
      {
        id: 10,
        name: '企业内训'
      },
      {
        id: 11,
        name: '安全员'
      },
      {
        id: 12,
        name: '初级经济师'
      },
      {
        id: 13,
        name: '系统集成工程师'
      }
    ],
    news: [
      {
        title: '中教文化2019监理《质量控制》考前强化训练',
        catalog: '三控',
        views: '4308',
        date: '2019-05-16',
        mt: '0px',
        show: true
      },
      {
        title: '中教文化2019监理《质量控制》考前强化训练',
        catalog: '三控',
        views: '4308',
        date: '2019-05-16',
        mt: '0px',
        show: true
      },
      {
        title: '中教文化2019监理《质量控制》考前强化训练',
        catalog: '三控',
        views: '4308',
        date: '2019-05-16',
        mt: '0px',
        show: true
      }
    ],
    timer: {
      d: '00',
      h: '00',
      m: '00',
      s: '00'
    },
    exams: [],
    answers: []
  },
  //事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  openPdf(e: any) {
    wx.downloadFile({
      url: app.globalData.filePrefix + e.currentTarget.dataset.id,
      success: function (res) {
        var Path = res.tempFilePath              //返回的文件临时地址，用于后面打开本地预览所用
        wx.openDocument({
          filePath: Path,
          fileType: 'pdf',
          success: function (res) {
            console.log(res);
          }
        })
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  toPage(e: any) {
    app.globalData.dataTabIndex = e.currentTarget.dataset.index;
    wx.switchTab({ url: '../data/list/list' })
  },
  bindPickerChange: function (e: any) {
    app.globalData.typeId = this.data.objectArray[e.detail.value].id;
    this.setData!({
      index: e.detail.value,
      typeId: app.globalData.typeId
    });
    this.getExams();
    this.getAnswers();
  },
  getExams() {
    const that = this;
    wx.request({
      url: app.globalData.prefix + 'getExamInfoList', //考前资料列表
      data: { id: that.data.typeId },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res: any) {
        that.setData!({
          exams: res.data.result.list.map((item: any) => {
            item.createTime = formatTime(new Date(item.createTime))
            return item;
          })
        })
      }
    });
  },
  getAnswers() {
    const that = this;
    wx.request({
      url: app.globalData.prefix + 'getExamAnswersList', //答题对照列表
      data: { id: that.data.typeId },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res: any) {
        that.setData!({
          answers: res.data.result.list.map((item: any) => {
            item.createTime = formatTime(new Date(item.createTime))
            return item;
          })
        })
      }
    });
  },
  onLoad() {
    const that = this;
    wx.request({
      url: app.globalData.prefix + 'getProjectList', //获取项目列表
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res: any) {
        const array: any[] = [];
        const objectArray: any[] = [];
        res.data.result.list.forEach((item: any) => {
          array.push(item.projectName);
          objectArray.push({
            id: item.id,
            name: item.projectName
          });
        });
        app.globalData.typeId = objectArray[0].id;
        that.setData!({
          typeId: objectArray[0].id,
          array: array,
          objectArray: objectArray
        });
        that.getExams();
        that.getAnswers();
      }
    })
    if (app.globalData.userInfo) {
      this.setData!({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = (res) => {
        this.setData!({
          userInfo: res,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData!({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.timeDown('2019/10/30 00:00:00');
    setTimeout(() => {
      this.start();
    }, 3000);
  },

  start() {
    const item = JSON.parse(JSON.stringify(this.data.news[0]));
    let data = JSON.parse(JSON.stringify(this.data.news));
    data[0].mt = '-32px';
    this.setData!({ news: data });
    setTimeout(() => { data[0].show = false; this.setData!({ news: data }); }, 500);

    setTimeout(() => {
      data = JSON.parse(JSON.stringify(data.slice(1)));
      data.push(item);
      this.setData!({ news: data });
    }, 2000)
    setTimeout(() => {
      this.start();
    }, 3000)
  },

  getUserInfo(e: any) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData!({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  timeDown(endDateStr: any) {
    //结束时间
    const endDate = new Date(endDateStr);
    //当前时间
    const nowDate = new Date();
    //相差的总秒数
    const totalSeconds = parseInt((endDate - nowDate) / 1000);
    //天数
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    //取模（余数）
    let modulo = totalSeconds % (60 * 60 * 24);
    //小时数
    const hours = Math.floor(modulo / (60 * 60));
    modulo = modulo % (60 * 60);
    //分钟
    const minutes = Math.floor(modulo / 60);
    //秒
    var seconds = modulo % 60;
    //输出到页面
    this.setData!({
      timer: {
        d: days < 10 ? '0' + days : days,
        h: hours < 10 ? '0' + hours : hours,
        m: minutes < 10 ? '0' + minutes : minutes,
        s: seconds < 10 ? '0' + seconds : seconds
      }
    });
    //延迟一秒执行自己
    setTimeout(() => {
      this.timeDown(endDateStr);
    }, 1000)
  },
  onShareAppMessage() {
    return {
      title: '立即得到',
      path: '/pages/index/index'
    }
  }
})
