//index.js
//获取应用实例
import { IMyApp } from '../../app';
import { getIndex, formatTime } from '../../utils/util';
const app = getApp<IMyApp>()

Page({
  data: {
    userInfo: {},
    typeId: 0,
    index: 0,
    array: [],
    objectArray: [],
    news: [],
    examTime: '',
    timer: {
      d: '00',
      h: '00',
      m: '00',
      s: '00'
    },
    exams: [],
    answers: [],
    infos: []
  },
  openPdf(e: any) {
    if (e.currentTarget.dataset.shared === 0) {
      wx.showModal({
        title: '温馨提示',
        content: '该模块需要分享才能查看！',
        confirmText: '马上分享',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({ url: '/pages/share/share' });
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.downloadFile({
        url: app.globalData.filePrefix + e.currentTarget.dataset.id,
        success: function (res) {
          var Path = res.tempFilePath              //返回的文件临时地址，用于后面打开本地预览所用
          wx.openDocument({
            filePath: Path,
            fileType: 'pdf',
            success: function (res) {
            }
          })
        },
        fail: function (res) {
        }
      });
    }
  },
  toPage(e: any) {
    app.globalData.dataTabIndex = e.currentTarget.dataset.index;
    wx.switchTab({ url: '../data/list/list' })
  },
  bindPickerChange: function (e: any) {
    app.globalData.userInfo.typeId = this.data.objectArray[e.detail.value].id;
    this.setData!({
      index: e.detail.value,
      typeId: app.globalData.userInfo.typeId
    });
    this.getExams();
    this.getAnswers();
    this.getInfos();
    this.getVedios();
  },
  getVedios() {
    const that = this;
    wx.request({
      url: app.globalData.prefix + 'getVideoList', //考前资料列表
      method: 'POST',
      data: { key: app.globalData.userInfo.key, id: app.globalData.userInfo.typeId, subjectId: '' },
      success(res: any) {
        that.setData!({
          news: res.data.result.list.slice(0, 3).map((item: any) => {
            item.title = item.title;
            item.catalog = item.subjectName;
            item.views = item.readNum;
            item.date = formatTime(new Date(item.createTime));
            item.mt = '0px';
            item.show = true
            return item;
          })
        });
      }
    });
  },
  getExams() {
    const that = this;
    wx.request({
      method: 'POST',
      url: app.globalData.prefix + 'getExamInfoList', //考前资料列表
      data: { key: app.globalData.userInfo.key, id: app.globalData.userInfo.typeId },
      success(res: any) {
        that.setData!({
          exams: res.data.result.list.slice(0, 3).map((item: any) => {
            item.createTime = formatTime(new Date(item.createTime))
            return item;
          })
        })
      }
    });
  },
  getInfos() {
    const that = this;
    wx.request({
      url: app.globalData.prefix + 'getExamTimeList', //考前资料列表
      method: 'POST',
      data: { key: app.globalData.userInfo.key, id: app.globalData.userInfo.typeId },
      success(res: any) {
        that.setData!({
          infos: res.data.result.list.map((info: any, index: number) => {
            const times = formatTime(new Date(info.examTime)).split('.');
            info.examTime = times[1] + '.' + times[2];
            if (index === 0) {
              const examTime = times[0] + '/' + times[1] + '/' + times[2] + ' ' + info.subjectList[0].startTime + ':00';
              that.timeDown(examTime);
              that.setData!({
                examTime: times[1] + '月' + times[2] + '日'
              })
            }
            return info;
          })
        });
      }
    });
  },
  getAnswers() {
    const that = this;
    wx.request({
      url: app.globalData.prefix + 'getExamAnswersList', //答题对照列表
      method: 'POST',
      data: { key: app.globalData.userInfo.key, id: app.globalData.userInfo.typeId },
      success(res: any) {
        that.setData!({
          answers: res.data.result.list.slice(0, 3).map((item: any) => {
            item.createTime = formatTime(new Date(item.createTime))
            return item;
          })
        })
      }
    });
  },
  onShow() {
    const that = this;
    app.getKey((userInfo: any) => {
      if (!userInfo) {
        app.globalData.showLoginPanel = true;
      } else {
        this.setData!({
          userInfo: userInfo,
          typeId: app.globalData.userInfo.typeId
        })
        wx.request({
          url: app.globalData.prefix + 'getProjectList', //获取项目列表
          data: {},
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res: any) {
            const array: any[] = [];
            const objectArray: any[] = [];
            res.data.result.list.forEach((item: any, index: number) => {
              array.push(item.projectName);
              objectArray.push({
                id: item.id,
                name: item.projectName
              });
            });

            that.setData!({
              typeId: app.globalData.userInfo.typeId,
              index: getIndex(objectArray, 'id', app.globalData.userInfo.typeId),
              array: array,
              objectArray: objectArray
            });
            that.getExams();
            that.getAnswers();
            that.getInfos();
            that.getVedios();
          }
        });
      }
    });
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
    app.updateShare();
    return {
      title: '立即得到',
      path: '/pages/index/index'
    }
  },
  getPhoneNumber(e: any) {
    const that = this;
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const options = currentPage.options;
    console.log(e.detail.errMsg);
    if (e.detail.errMsg === 'getPhoneNumber:ok'){
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
          if (options.scene && decodeURIComponent(options.scene).split('&')[1]){}
          app.globalData.showLoginPanel = false;
          app.globalData.userInfo.key = '';
          that.onShow();
        }
      })
    }
  }
})
