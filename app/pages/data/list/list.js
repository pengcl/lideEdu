"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../../utils/util");
var app = getApp();
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
    onShow: function () {
        var _this = this;
        var that = this;
        app.getKey(function (userInfo) {
            if (!userInfo) {
                app.globalData.showLoginPanel = true;
            }
            else {
                _this.setData({
                    userInfo: userInfo
                });
                wx.request({
                    url: app.globalData.prefix + 'getExamInfoList',
                    method: 'POST',
                    data: { key: app.globalData.userInfo.key, id: app.globalData.userInfo.typeId },
                    success: function (res) {
                        that.setData({
                            exams: res.data.result.list.map(function (item) {
                                item.createTime = util_1.formatTime(new Date(item.createTime));
                                return item;
                            })
                        });
                    }
                });
                wx.request({
                    url: app.globalData.prefix + 'getExamAnswersList',
                    method: 'POST',
                    data: { key: app.globalData.userInfo.key, id: app.globalData.userInfo.typeId },
                    success: function (res) {
                        that.setData({
                            answers: res.data.result.list.map(function (item) {
                                item.createTime = util_1.formatTime(new Date(item.createTime));
                                return item;
                            })
                        });
                    }
                });
            }
        });
        this.setData({
            activeIndex: app.globalData.dataTabIndex
        });
    },
    openPdf: function (e) {
        if (e.currentTarget.dataset.shared === 0) {
            wx.showModal({
                title: '温馨提示',
                content: '该模块需要分享才能查看！',
                confirmText: '马上分享',
                success: function (res) {
                    if (res.confirm) {
                        wx.navigateTo({ url: '/pages/share/share' });
                        console.log('用户点击确定');
                    }
                    else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
        }
        else {
            if (e.currentTarget.dataset.disabled) {
                return false;
            }
            wx.downloadFile({
                url: app.globalData.filePrefix + e.currentTarget.dataset.id,
                success: function (res) {
                    var Path = res.tempFilePath;
                    wx.openDocument({
                        filePath: Path,
                        fileType: 'pdf',
                        success: function (res) {
                        }
                    });
                },
                fail: function (res) {
                }
            });
        }
    },
    tabClick: function (e) {
        app.globalData.dataTabIndex = e.currentTarget.id;
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },
    onReachBottom: function (e) {
    },
    onShareAppMessage: function () {
        app.updateShare();
        return {
            title: '立得学堂',
            path: '/pages/data/list/list'
        };
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw0Q0FBNkQ7QUFDN0QsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUM7QUFDN0IsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUN0QixXQUFXLEVBQUUsQ0FBQztRQUNkLFlBQVksRUFBRSxDQUFDO1FBQ2YsVUFBVSxFQUFFLENBQUM7UUFDYixLQUFLLEVBQUUsRUFBRTtRQUNULE9BQU8sRUFBRSxFQUFFO1FBQ1gsUUFBUSxFQUFFLEVBQUU7S0FDYjtJQUNELE1BQU07UUFBTixpQkF3Q0M7UUF2Q0MsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBQyxRQUFhO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2IsR0FBRyxDQUFDLFVBQVUsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO2FBQ3RDO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyxPQUFRLENBQUM7b0JBQ1osUUFBUSxFQUFFLFFBQVE7aUJBQ25CLENBQUMsQ0FBQztnQkFDSCxFQUFFLENBQUMsT0FBTyxDQUFDO29CQUNULEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxpQkFBaUI7b0JBQzlDLE1BQU0sRUFBRSxNQUFNO29CQUNkLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtvQkFDOUUsT0FBTyxZQUFDLEdBQVE7d0JBQ2QsSUFBSSxDQUFDLE9BQVEsQ0FBQzs0QkFDWixLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFD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O1FBQ2pELElBQUksQ0FBQyxPQUFRLENBQUM7WUFDWixZQUFZLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxVQUFVO1lBQ3hDLFdBQVcsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUU7U0FDaEMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELGFBQWEsWUFBQyxDQUFNO0lBQ3BCLENBQUM7SUFDRCxpQkFBaUI7UUFDZixHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEIsT0FBTztZQUNMLEtBQUssRUFBRSxNQUFNO1lBQ2IsSUFBSSxFQUFFLHVCQUF1QjtTQUM5QixDQUFBO0lBQ0gsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uLy4uLy4uL2FwcCc7XG5pbXBvcnQgeyBQUkVGSVhfVVJMLCBmb3JtYXRUaW1lIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvdXRpbCc7XG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpO1xuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICB0YWJzOiBbXCLogIPliY3otYTmlplcIiwgXCLnrZTmoYjojrflj5ZcIl0sXG4gICAgYWN0aXZlSW5kZXg6IDAsXG4gICAgc2xpZGVyT2Zmc2V0OiAwLFxuICAgIHNsaWRlckxlZnQ6IDAsXG4gICAgZXhhbXM6IFtdLFxuICAgIGFuc3dlcnM6IFtdLFxuICAgIHVzZXJJbmZvOiB7fVxuICB9LFxuICBvblNob3coKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgYXBwLmdldEtleSgodXNlckluZm86IGFueSkgPT4ge1xuICAgICAgaWYgKCF1c2VySW5mbykge1xuICAgICAgICBhcHAuZ2xvYmFsRGF0YS5zaG93TG9naW5QYW5lbCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgICAgICB1c2VySW5mbzogdXNlckluZm9cbiAgICAgICAgfSk7XG4gICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEucHJlZml4ICsgJ2dldEV4YW1JbmZvTGlzdCcsIC8v6ICD5YmN6LWE5paZ5YiX6KGoXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgZGF0YTogeyBrZXk6IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLmtleSwgaWQ6IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLnR5cGVJZCB9LFxuICAgICAgICAgIHN1Y2Nlc3MocmVzOiBhbnkpIHtcbiAgICAgICAgICAgIHRoYXQuc2V0RGF0YSEoe1xuICAgICAgICAgICAgICBleGFtczogcmVzLmRhdGEucmVzdWx0Lmxpc3QubWFwKChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtLmNyZWF0ZVRpbWUgPSBmb3JtYXRUaW1lKG5ldyBEYXRlKGl0ZW0uY3JlYXRlVGltZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEucHJlZml4ICsgJ2dldEV4YW1BbnN3ZXJzTGlzdCcsIC8v562U6aKY5a+554Wn5YiX6KGoXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgZGF0YTogeyBrZXk6IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLmtleSwgaWQ6IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLnR5cGVJZCB9LFxuICAgICAgICAgIHN1Y2Nlc3MocmVzOiBhbnkpIHtcbiAgICAgICAgICAgIHRoYXQuc2V0RGF0YSEoe1xuICAgICAgICAgICAgICBhbnN3ZXJzOiByZXMuZGF0YS5yZXN1bHQubGlzdC5tYXAoKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0uY3JlYXRlVGltZSA9IGZvcm1hdFRpbWUobmV3IERhdGUoaXRlbS5jcmVhdGVUaW1lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgIGFjdGl2ZUluZGV4OiBhcHAuZ2xvYmFsRGF0YS5kYXRhVGFiSW5kZXhcbiAgICB9KTtcbiAgfSxcbiAgb3BlblBkZihlOiBhbnkpIHtcbiAgICBpZiAoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuc2hhcmVkID09PSAwKSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+a4qemmqOaPkOekuicsXG4gICAgICAgIGNvbnRlbnQ6ICfor6XmqKHlnZfpnIDopoHliIbkuqvmiY3og73mn6XnnIvvvIEnLFxuICAgICAgICBjb25maXJtVGV4dDogJ+mprOS4iuWIhuS6qycsXG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL3NoYXJlL3NoYXJlJyB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vnoa7lrponKVxuICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuZGlzYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgd3guZG93bmxvYWRGaWxlKHtcbiAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5maWxlUHJlZml4ICsgZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWQsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICB2YXIgUGF0aCA9IHJlcy50ZW1wRmlsZVBhdGggICAgICAgICAgICAgIC8v6L+U5Zue55qE5paH5Lu25Li05pe25Zyw5Z2A77yM55So5LqO5ZCO6Z2i5omT5byA5pys5Zyw6aKE6KeI5omA55SoXG4gICAgICAgICAgd3gub3BlbkRvY3VtZW50KHtcbiAgICAgICAgICAgIGZpbGVQYXRoOiBQYXRoLFxuICAgICAgICAgICAgZmlsZVR5cGU6ICdwZGYnLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICB0YWJDbGljayhlOiBhbnkpIHtcbiAgICBhcHAuZ2xvYmFsRGF0YS5kYXRhVGFiSW5kZXggPSBlLmN1cnJlbnRUYXJnZXQuaWQ7XG4gICAgdGhpcy5zZXREYXRhISh7XG4gICAgICBzbGlkZXJPZmZzZXQ6IGUuY3VycmVudFRhcmdldC5vZmZzZXRMZWZ0LFxuICAgICAgYWN0aXZlSW5kZXg6IGUuY3VycmVudFRhcmdldC5pZFxuICAgIH0pXG4gIH0sXG4gIG9uUmVhY2hCb3R0b20oZTogYW55KSB7XG4gIH0sXG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgIGFwcC51cGRhdGVTaGFyZSgpO1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ+eri+W+l+WtpuWggicsXG4gICAgICBwYXRoOiAnL3BhZ2VzL2RhdGEvbGlzdC9saXN0J1xuICAgIH1cbiAgfVxufSlcbiJdfQ==