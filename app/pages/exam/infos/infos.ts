import { IMyApp } from '../../../../app';
import { PREFIX_URL, formatTime } from '../../../utils/util';
const app = getApp<IMyApp>();
Page({
  data: {
    infos: [],
  },
  onShow() {
    const that = this;
    app.getKey((userInfo: any) => {
      if (!userInfo) {
        app.globalData.showLoginPanel = true;
      } else {
        wx.request({
          url: app.globalData.prefix + 'getMockExamList', //考前资料列表
          data: { key: app.globalData.userInfo.key, id: app.globalData.userInfo.typeId },
          success(res: any) {
            that.setData!({
              infos: res.data.result.list.map((item: any) => {
                item.createTime = formatTime(new Date(item.createTime));
                console.log(item.linkUrl);
                item.linkUrl = item.linkUrl ? item.linkUrl.split('/')[4] ? item.linkUrl.split('/')[4].split('.')[0] : '' : '';
                item.linkUrl = 'pages/wjxqList/wjxqList?activityId=' + item.linkUrl
                console.log(item.linkUrl);
                return item;
              })
            });
            console.log(that.data);
          }
        });
      }
    })

  },
  onShareAppMessage() {
    app.updateShare();
    return {
      title: '立得学堂',
      path: '/pages/exam/infos/infos'
    }
  }
})
