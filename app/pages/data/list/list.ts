import { IMyApp } from '../../../../app';
import { PREFIX_URL, formatTime } from '../../../utils/util';
const app = getApp<IMyApp>();
Page({
  data: {
    tabs: ["考前资料", "答案获取"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    exams: [],
    answers: [],
    userInfo: {}
  },
  onShow() {
    const that = this;
    app.getKey((userInfo: any) => {
      if (!userInfo) {
        app.globalData.showLoginPanel = true;
      } else {
        this.setData!({
          userInfo: userInfo
        });
        wx.request({
          url: app.globalData.prefix + 'getExamInfoList', //考前资料列表
          method: 'POST',
          data: { key: app.globalData.userInfo.key, id: app.globalData.userInfo.typeId },
          success(res: any) {
            that.setData!({
              exams: res.data.result.list.map((item: any) => {
                item.createTime = formatTime(new Date(item.createTime))
                return item;
              })
            })
          }
        });
        wx.request({
          url: app.globalData.prefix + 'getExamAnswersList', //答题对照列表
          method: 'POST',
          data: { key: app.globalData.userInfo.key, id: app.globalData.userInfo.typeId },
          success(res: any) {
            that.setData!({
              answers: res.data.result.list.map((item: any) => {
                item.createTime = formatTime(new Date(item.createTime))
                return item;
              })
            })
          }
        });
      }
    });
    this.setData!({
      activeIndex: app.globalData.dataTabIndex
    });
  },
  openPdf(e: any) {
    const type = e.currentTarget.dataset.type;
    let url = app.globalData.prefix + 'getExamAnswers';
    if (type === 'exam'){
      url = app.globalData.prefix + 'getExamInfo';
    }
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
      if (e.currentTarget.dataset.disabled) {
        return false;
      }
      wx.downloadFile({
        url: app.globalData.filePrefix + e.currentTarget.dataset.id,
        success: function (res) {
          var Path = res.tempFilePath              //返回的文件临时地址，用于后面打开本地预览所用
          wx.openDocument({
            filePath: Path,
            fileType: 'pdf',
            success: function (res) {
              wx.request({
                url: url, //获取详情
                method: 'POST',
                data: { key: app.globalData.userInfo.key, id: e.currentTarget.dataset.iid },
                success() {
                }
              });
            }
          })
        },
        fail: function (res) {
        }
      });
    }
  },
  tabClick(e: any) {
    app.globalData.dataTabIndex = e.currentTarget.id;
    this.setData!({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    })
  },
  onReachBottom(e: any) {
  },
  onShareAppMessage() {
    app.updateShare();
    return {
      title: '立得学堂',
      path: '/pages/data/list/list'
    }
  }
})
