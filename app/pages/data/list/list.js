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
        var type = e.currentTarget.dataset.type;
        var url = app.globalData.prefix + 'getExamAnswers';
        if (type === 'exam') {
            url = app.globalData.prefix + 'getExamInfo';
        }
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
                            wx.request({
                                url: url,
                                method: 'POST',
                                data: { key: app.globalData.userInfo.key, id: e.currentTarget.dataset.iid },
                                success: function () {
                                }
                            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw0Q0FBNkQ7QUFDN0QsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUM7QUFDN0IsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUN0QixXQUFXLEVBQUUsQ0FBQztRQUNkLFlBQVksRUFBRSxDQUFDO1FBQ2YsVUFBVSxFQUFFLENBQUM7UUFDYixLQUFLLEVBQUUsRUFBRTtRQUNULE9BQU8sRUFBRSxFQUFFO1FBQ1gsUUFBUSxFQUFFLEVBQUU7S0FDYjtJQUNELE1BQU07UUFBTixpQkF3Q0M7UUF2Q0MsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBQyxRQUFhO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2IsR0FBRyxDQUFDLFVBQVUsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO2FBQ3RDO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyxPQUFRLENBQUM7b0JBQ1osUUFBUSxFQUFFLFFBQVE7aUJBQ25CLENBQUMsQ0FBQztnQkFDSCxFQUFFLENBQUMsT0FBTyxDQUFDO29CQUNULEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxpQkFBaUI7b0JBQzlDLE1BQU0sRUFBRSxNQUFNO29CQUNkLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtvQkFDOUUsT0FBTyxZQUFDLEdBQVE7d0JBQ2QsSUFBSSxDQUFDLE9BQVEsQ0FBQzs0QkFDWixLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFD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QkFDZixPQUFPLEVBQUUsVUFBVSxHQUFHOzRCQUNwQixFQUFFLENBQUMsT0FBTyxDQUFDO2dDQUNULEdBQUcsRUFBRSxHQUFHO2dDQUNSLE1BQU0sRUFBRSxNQUFNO2dDQUNkLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtnQ0FDM0UsT0FBTztnQ0FDUCxDQUFDOzZCQUNGLENBQUMsQ0FBQzt3QkFDTCxDQUFDO3FCQUNGLENBQUMsQ0FBQTtnQkFDSixDQUFDO2dCQUNELElBQUksRUFBRSxVQUFVLEdBQUc7Z0JBQ25CLENBQUM7YUFDRixDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFDRCxRQUFRLFlBQUMsQ0FBTTtRQUNiLEdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFRLENBQUM7WUFDWixZQUFZLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxVQUFVO1lBQ3hDLFdBQVcsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUU7U0FDaEMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELGFBQWEsWUFBQyxDQUFNO0lBQ3BCLENBQUM7SUFDRCxpQkFBaUI7UUFDZixHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEIsT0FBTztZQUNMLEtBQUssRUFBRSxNQUFNO1lBQ2IsSUFBSSxFQUFFLHVCQUF1QjtTQUM5QixDQUFBO0lBQ0gsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uLy4uLy4uL2FwcCc7XG5pbXBvcnQgeyBQUkVGSVhfVVJMLCBmb3JtYXRUaW1lIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvdXRpbCc7XG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpO1xuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICB0YWJzOiBbXCLogIPliY3otYTmlplcIiwgXCLnrZTmoYjojrflj5ZcIl0sXG4gICAgYWN0aXZlSW5kZXg6IDAsXG4gICAgc2xpZGVyT2Zmc2V0OiAwLFxuICAgIHNsaWRlckxlZnQ6IDAsXG4gICAgZXhhbXM6IFtdLFxuICAgIGFuc3dlcnM6IFtdLFxuICAgIHVzZXJJbmZvOiB7fVxuICB9LFxuICBvblNob3coKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgYXBwLmdldEtleSgodXNlckluZm86IGFueSkgPT4ge1xuICAgICAgaWYgKCF1c2VySW5mbykge1xuICAgICAgICBhcHAuZ2xvYmFsRGF0YS5zaG93TG9naW5QYW5lbCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgICAgICB1c2VySW5mbzogdXNlckluZm9cbiAgICAgICAgfSk7XG4gICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEucHJlZml4ICsgJ2dldEV4YW1JbmZvTGlzdCcsIC8v6ICD5YmN6LWE5paZ5YiX6KGoXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgZGF0YTogeyBrZXk6IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLmtleSwgaWQ6IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLnR5cGVJZCB9LFxuICAgICAgICAgIHN1Y2Nlc3MocmVzOiBhbnkpIHtcbiAgICAgICAgICAgIHRoYXQuc2V0RGF0YSEoe1xuICAgICAgICAgICAgICBleGFtczogcmVzLmRhdGEucmVzdWx0Lmxpc3QubWFwKChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtLmNyZWF0ZVRpbWUgPSBmb3JtYXRUaW1lKG5ldyBEYXRlKGl0ZW0uY3JlYXRlVGltZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEucHJlZml4ICsgJ2dldEV4YW1BbnN3ZXJzTGlzdCcsIC8v562U6aKY5a+554Wn5YiX6KGoXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgZGF0YTogeyBrZXk6IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLmtleSwgaWQ6IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLnR5cGVJZCB9LFxuICAgICAgICAgIHN1Y2Nlc3MocmVzOiBhbnkpIHtcbiAgICAgICAgICAgIHRoYXQuc2V0RGF0YSEoe1xuICAgICAgICAgICAgICBhbnN3ZXJzOiByZXMuZGF0YS5yZXN1bHQubGlzdC5tYXAoKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0uY3JlYXRlVGltZSA9IGZvcm1hdFRpbWUobmV3IERhdGUoaXRlbS5jcmVhdGVUaW1lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgIGFjdGl2ZUluZGV4OiBhcHAuZ2xvYmFsRGF0YS5kYXRhVGFiSW5kZXhcbiAgICB9KTtcbiAgfSxcbiAgb3BlblBkZihlOiBhbnkpIHtcbiAgICBjb25zdCB0eXBlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudHlwZTtcbiAgICBsZXQgdXJsID0gYXBwLmdsb2JhbERhdGEucHJlZml4ICsgJ2dldEV4YW1BbnN3ZXJzJztcbiAgICBpZiAodHlwZSA9PT0gJ2V4YW0nKXtcbiAgICAgIHVybCA9IGFwcC5nbG9iYWxEYXRhLnByZWZpeCArICdnZXRFeGFtSW5mbyc7XG4gICAgfVxuICAgIGlmIChlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5zaGFyZWQgPT09IDApIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5rip6aao5o+Q56S6JyxcbiAgICAgICAgY29udGVudDogJ+ivpeaooeWdl+mcgOimgeWIhuS6q+aJjeiDveafpeeci++8gScsXG4gICAgICAgIGNvbmZpcm1UZXh0OiAn6ams5LiK5YiG5LqrJyxcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvc2hhcmUvc2hhcmUnIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+ehruWumicpXG4gICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5kaXNhYmxlZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB3eC5kb3dubG9hZEZpbGUoe1xuICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmZpbGVQcmVmaXggKyBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZCxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIHZhciBQYXRoID0gcmVzLnRlbXBGaWxlUGF0aCAgICAgICAgICAgICAgLy/ov5Tlm57nmoTmlofku7bkuLTml7blnLDlnYDvvIznlKjkuo7lkI7pnaLmiZPlvIDmnKzlnLDpooTop4jmiYDnlKhcbiAgICAgICAgICB3eC5vcGVuRG9jdW1lbnQoe1xuICAgICAgICAgICAgZmlsZVBhdGg6IFBhdGgsXG4gICAgICAgICAgICBmaWxlVHlwZTogJ3BkZicsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIHVybDogdXJsLCAvL+iOt+WPluivpuaDhVxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHsga2V5OiBhcHAuZ2xvYmFsRGF0YS51c2VySW5mby5rZXksIGlkOiBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5paWQgfSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIHRhYkNsaWNrKGU6IGFueSkge1xuICAgIGFwcC5nbG9iYWxEYXRhLmRhdGFUYWJJbmRleCA9IGUuY3VycmVudFRhcmdldC5pZDtcbiAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgIHNsaWRlck9mZnNldDogZS5jdXJyZW50VGFyZ2V0Lm9mZnNldExlZnQsXG4gICAgICBhY3RpdmVJbmRleDogZS5jdXJyZW50VGFyZ2V0LmlkXG4gICAgfSlcbiAgfSxcbiAgb25SZWFjaEJvdHRvbShlOiBhbnkpIHtcbiAgfSxcbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgYXBwLnVwZGF0ZVNoYXJlKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn56uL5b6X5a2m5aCCJyxcbiAgICAgIHBhdGg6ICcvcGFnZXMvZGF0YS9saXN0L2xpc3QnXG4gICAgfVxuICB9XG59KVxuIl19