"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
Page({
    data: {
        codeUrl: '',
        server: {}
    },
    onShow: function () {
        var that = this;
        app.getKey(function (userInfo) {
            if (!userInfo) {
                app.globalData.showLoginPanel = true;
            }
            else {
                wx.request({
                    url: app.globalData.prefix + 'getService',
                    method: 'POST',
                    data: { key: app.globalData.userInfo.key, id: app.globalData.userInfo.serviceId },
                    success: function (res) {
                        console.log(res);
                        that.setData({
                            codeUrl: app.globalData.filePrefix + res.data.result.fileId,
                            server: res.data.result
                        });
                        console.log(that.data);
                    }
                });
            }
        });
    },
    previewImage: function () {
        console.log('previewImage');
        wx.previewImage({
            current: this.data.codeUrl,
            urls: [this.data.codeUrl]
        });
    },
    makeCall: function () {
        wx.makePhoneCall({ phoneNumber: this.data.server.mobile });
    },
    onShareAppMessage: function () {
        app.updateShare();
        return {
            title: '立即得到',
            path: '/pages/service/service'
        };
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQUM1QixJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixPQUFPLEVBQUUsRUFBRTtRQUNYLE1BQU0sRUFBRSxFQUFFO0tBQ1g7SUFDRCxNQUFNO1FBQ0osSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBQyxRQUFhO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2IsR0FBRyxDQUFDLFVBQVUsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO2FBQ3RDO2lCQUFNO2dCQUNMLEVBQUUsQ0FBQyxPQUFPLENBQUM7b0JBQ1QsR0FBRyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLFlBQVk7b0JBQ3pDLE1BQU0sRUFBRSxNQUFNO29CQUNkLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtvQkFDakYsT0FBTyxZQUFDLEdBQVE7d0JBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDakIsSUFBSSxDQUFDLE9BQVEsQ0FBQzs0QkFDWixPQUFPLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTs0QkFDM0QsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTTt5QkFDeEIsQ0FBQyxDQUFBO3dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN6QixDQUFDO2lCQUNGLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsWUFBWTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDNUIsRUFBRSxDQUFDLFlBQVksQ0FBQztZQUNkLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87WUFDMUIsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDMUIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELFFBQVE7UUFDTixFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUNELGlCQUFpQjtRQUNmLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNsQixPQUFPO1lBQ0wsS0FBSyxFQUFFLE1BQU07WUFDYixJQUFJLEVBQUUsd0JBQXdCO1NBQy9CLENBQUE7SUFDSCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJztcbmltcG9ydCB7IGdldEluZGV4LCBmb3JtYXRUaW1lIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbCc7XG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIGNvZGVVcmw6ICcnLFxuICAgIHNlcnZlcjoge31cbiAgfSxcbiAgb25TaG93KCkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIGFwcC5nZXRLZXkoKHVzZXJJbmZvOiBhbnkpID0+IHtcbiAgICAgIGlmICghdXNlckluZm8pIHtcbiAgICAgICAgYXBwLmdsb2JhbERhdGEuc2hvd0xvZ2luUGFuZWwgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5wcmVmaXggKyAnZ2V0U2VydmljZScsIC8v6ICD5YmN6LWE5paZ5YiX6KGoXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgZGF0YTogeyBrZXk6IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLmtleSwgaWQ6IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLnNlcnZpY2VJZCB9LFxuICAgICAgICAgIHN1Y2Nlc3MocmVzOiBhbnkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgICB0aGF0LnNldERhdGEhKHtcbiAgICAgICAgICAgICAgY29kZVVybDogYXBwLmdsb2JhbERhdGEuZmlsZVByZWZpeCArIHJlcy5kYXRhLnJlc3VsdC5maWxlSWQsXG4gICAgICAgICAgICAgIHNlcnZlcjogcmVzLmRhdGEucmVzdWx0XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc29sZS5sb2codGhhdC5kYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIHByZXZpZXdJbWFnZSgpIHtcbiAgICBjb25zb2xlLmxvZygncHJldmlld0ltYWdlJyk7XG4gICAgd3gucHJldmlld0ltYWdlKHtcbiAgICAgIGN1cnJlbnQ6IHRoaXMuZGF0YS5jb2RlVXJsLCAvLyDlvZPliY3mmL7npLrlm77niYfnmoRodHRw6ZO+5o6lXG4gICAgICB1cmxzOiBbdGhpcy5kYXRhLmNvZGVVcmxdIC8vIOmcgOimgemihOiniOeahOWbvueJh2h0dHDpk77mjqXliJfooahcbiAgICB9KVxuICB9LFxuICBtYWtlQ2FsbCgpIHtcbiAgICB3eC5tYWtlUGhvbmVDYWxsKHsgcGhvbmVOdW1iZXI6IHRoaXMuZGF0YS5zZXJ2ZXIubW9iaWxlIH0pO1xuICB9LFxuICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICBhcHAudXBkYXRlU2hhcmUoKTtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICfnq4vljbPlvpfliLAnLFxuICAgICAgcGF0aDogJy9wYWdlcy9zZXJ2aWNlL3NlcnZpY2UnXG4gICAgfVxuICB9XG59KVxuIl19