import { IMyApp } from '../../../../app';
import { PREFIX_URL, formatTime} from '../../../utils/util';
const app = getApp<IMyApp>();
Page({
  data: {
    tabs: ["考前资料", "答案对照"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    exams: [],
    answers: []
  },
  onShow() {
    const that = this;
    console.log(app.globalData.typeId);
    wx.request({
      url: app.globalData.prefix + 'getExamInfoList', //考前资料列表
      data: { id: app.globalData.typeId },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res: any) {
        console.log(res);
        that.setData!({
          exams: res.data.result.list.map((item: any) => {
            item.createTime = formatTime(new Date(item.createTime))
            return item;
          })
        })
        console.log(that.data.exams);
      }
    });
    wx.request({
      url: app.globalData.prefix + 'getExamAnswersList', //答题对照列表
      data: { id: app.globalData.typeId },
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
    this.setData!({
      activeIndex: app.globalData.dataTabIndex
    });
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
  tabClick(e: any) {
    app.globalData.dataTabIndex = e.currentTarget.id;
    this.setData!({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    })
  }
})
