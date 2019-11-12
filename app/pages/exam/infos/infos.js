"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../../utils/util");
var app = getApp();
Page({
    data: {
        infos: [],
    },
    onShow: function () {
        var that = this;
        app.getKey(function (userInfo) {
            if (!userInfo) {
                app.globalData.showLoginPanel = true;
            }
            else {
                wx.request({
                    url: app.globalData.prefix + 'getMockExamList',
                    data: { key: app.globalData.userInfo.key, id: app.globalData.userInfo.typeId },
                    success: function (res) {
                        that.setData({
                            infos: res.data.result.list.map(function (item) {
                                item.createTime = util_1.formatTime(new Date(item.createTime));
                                console.log(item.linkUrl);
                                item.linkUrl = item.linkUrl ? item.linkUrl.split('/')[4] ? item.linkUrl.split('/')[4].split('.')[0] : '' : '';
                                item.linkUrl = 'pages/wjxqList/wjxqList?activityId=' + item.linkUrl;
                                console.log(item.linkUrl);
                                return item;
                            })
                        });
                        console.log(that.data);
                    }
                });
            }
        });
    },
    onShareAppMessage: function () {
        app.updateShare();
        return {
            title: '立得学堂',
            path: '/pages/exam/infos/infos'
        };
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmZvcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDRDQUE2RDtBQUM3RCxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQztBQUM3QixJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0QsTUFBTTtRQUNKLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixHQUFHLENBQUMsTUFBTSxDQUFDLFVBQUMsUUFBYTtZQUN2QixJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNiLEdBQUcsQ0FBQyxVQUFVLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQzthQUN0QztpQkFBTTtnQkFDTCxFQUFFLENBQUMsT0FBTyxDQUFDO29CQUNULEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxpQkFBaUI7b0JBQzlDLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtvQkFDOUUsT0FBTyxZQUFDLEdBQVE7d0JBQ2QsSUFBSSxDQUFDLE9BQVEsQ0FBQzs0QkFDWixLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQVM7Z0NBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcsaUJBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQ0FDeEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0NBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0NBQzlHLElBQUksQ0FBQyxPQUFPLEdBQUcscUNBQXFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtnQ0FDbkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0NBQzFCLE9BQU8sSUFBSSxDQUFDOzRCQUNkLENBQUMsQ0FBQzt5QkFDSCxDQUFDLENBQUM7d0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3pCLENBQUM7aUJBQ0YsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUVKLENBQUM7SUFDRCxpQkFBaUI7UUFDZixHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEIsT0FBTztZQUNMLEtBQUssRUFBRSxNQUFNO1lBQ2IsSUFBSSxFQUFFLHlCQUF5QjtTQUNoQyxDQUFBO0lBQ0gsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uLy4uLy4uL2FwcCc7XG5pbXBvcnQgeyBQUkVGSVhfVVJMLCBmb3JtYXRUaW1lIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvdXRpbCc7XG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpO1xuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICBpbmZvczogW10sXG4gIH0sXG4gIG9uU2hvdygpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICBhcHAuZ2V0S2V5KCh1c2VySW5mbzogYW55KSA9PiB7XG4gICAgICBpZiAoIXVzZXJJbmZvKSB7XG4gICAgICAgIGFwcC5nbG9iYWxEYXRhLnNob3dMb2dpblBhbmVsID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEucHJlZml4ICsgJ2dldE1vY2tFeGFtTGlzdCcsIC8v6ICD5YmN6LWE5paZ5YiX6KGoXG4gICAgICAgICAgZGF0YTogeyBrZXk6IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLmtleSwgaWQ6IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLnR5cGVJZCB9LFxuICAgICAgICAgIHN1Y2Nlc3MocmVzOiBhbnkpIHtcbiAgICAgICAgICAgIHRoYXQuc2V0RGF0YSEoe1xuICAgICAgICAgICAgICBpbmZvczogcmVzLmRhdGEucmVzdWx0Lmxpc3QubWFwKChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtLmNyZWF0ZVRpbWUgPSBmb3JtYXRUaW1lKG5ldyBEYXRlKGl0ZW0uY3JlYXRlVGltZSkpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW0ubGlua1VybCk7XG4gICAgICAgICAgICAgICAgaXRlbS5saW5rVXJsID0gaXRlbS5saW5rVXJsID8gaXRlbS5saW5rVXJsLnNwbGl0KCcvJylbNF0gPyBpdGVtLmxpbmtVcmwuc3BsaXQoJy8nKVs0XS5zcGxpdCgnLicpWzBdIDogJycgOiAnJztcbiAgICAgICAgICAgICAgICBpdGVtLmxpbmtVcmwgPSAncGFnZXMvd2p4cUxpc3Qvd2p4cUxpc3Q/YWN0aXZpdHlJZD0nICsgaXRlbS5saW5rVXJsXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaXRlbS5saW5rVXJsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhhdC5kYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pXG5cbiAgfSxcbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgYXBwLnVwZGF0ZVNoYXJlKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn56uL5b6X5a2m5aCCJyxcbiAgICAgIHBhdGg6ICcvcGFnZXMvZXhhbS9pbmZvcy9pbmZvcydcbiAgICB9XG4gIH1cbn0pXG4iXX0=