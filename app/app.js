"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./utils/util");
App({
    onLaunch: function () {
    },
    watch: function (key, method) {
        var obj = this.globalData;
        var ori = obj[key];
        if (ori) {
            method(ori);
        }
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            set: function (value) {
                this['___' + key] = value;
                method(value);
            },
            get: function () {
                if (typeof this['__' + key] == 'undefined') {
                    if (ori) {
                        this['__' + key] = ori;
                        return ori;
                    }
                    else {
                        return undefined;
                    }
                }
                else {
                    return this['__' + key];
                }
            }
        });
    },
    getKey: function (cb) {
        var that = this;
        var key = this.globalData.userInfo.key;
        if (key) {
            cb(this.globalData.userInfo);
        }
        else {
            wx.login({
                success: function (_res) {
                    wx.request({
                        url: 'https://ldxt.betajy.com/intf/unionAuth?code=' + _res.code,
                        success: function (res) {
                            var userInfo = res.data.result;
                            if (res.data.result.key) {
                                wx.request({
                                    url: that.globalData.prefix + 'getProjectList',
                                    success: function (res) {
                                        var index = util_1.getIndex(res.data.result.list, 'isDefault', 1);
                                        var subject = res.data.result.list[index];
                                        console.log(subject);
                                        userInfo.typeId = subject.id;
                                        userInfo.typeShare = that.globalData.filePrefix + subject.shareFileId;
                                        that.globalData.userInfo = userInfo;
                                        cb(that.globalData.userInfo);
                                    }
                                });
                            }
                            else {
                                that.globalData.userInfo = userInfo;
                                cb(null);
                            }
                        }
                    });
                }
            });
        }
    },
    getTypeId: function (cb) {
        if (this.globalData.typeId) {
            cb(this.globalData.typeId);
        }
        else {
            var that_1 = this;
            wx.request({
                url: that_1.globalData.prefix + 'getProjectList',
                data: {},
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    that_1.globalData.typeId = res.data.result.list[0].id;
                    cb(res.data.result.list[0].id);
                }
            });
        }
    },
    updateShare: function () {
        var that = this;
        wx.request({
            url: this.globalData.prefix + 'updateShare',
            method: 'POST',
            data: { key: this.globalData.userInfo.key },
            success: function () {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EscUNBQXVDO0FBZ0N2QyxHQUFHLENBQVM7SUFDVixRQUFRO0lBQ1IsQ0FBQztJQUNELEtBQUssRUFBRSxVQUFVLEdBQVcsRUFBRSxNQUFXO1FBQ3ZDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFFMUIsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRW5CLElBQUksR0FBRyxFQUFFO1lBQ1AsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2I7UUFDRCxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7WUFDOUIsWUFBWSxFQUFFLElBQUk7WUFDbEIsVUFBVSxFQUFFLElBQUk7WUFDaEIsR0FBRyxFQUFFLFVBQVUsS0FBSztnQkFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQixDQUFDO1lBQ0QsR0FBRyxFQUFFO2dCQUNILElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLFdBQVcsRUFBRTtvQkFDMUMsSUFBSSxHQUFHLEVBQUU7d0JBRVAsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7d0JBQ3ZCLE9BQU8sR0FBRyxDQUFDO3FCQUNaO3lCQUFNO3dCQUNMLE9BQU8sU0FBUyxDQUFDO3FCQUNsQjtpQkFDRjtxQkFBTTtvQkFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7aUJBQ3pCO1lBQ0gsQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxNQUFNLEVBQUUsVUFBVSxFQUFPO1FBQ3ZCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixJ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O1lBQ2QsSUFBSSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRTtZQUMzQyxPQUFPO2dCQUNMLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFDdkMsQ0FBQztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxVQUFVLEVBQUU7UUFDVixNQUFNLEVBQUUsQ0FBQztRQUNULFlBQVksRUFBRSxHQUFHO1FBQ2pCLE1BQU0sRUFBRSw0Q0FBNEM7UUFDcEQsVUFBVSxFQUFFLDBEQUEwRDtRQUN0RSxjQUFjLEVBQUUsS0FBSztRQUNyQixLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsRUFBRTtZQUNSLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRCxRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsQ0FBQztZQUNWLEdBQUcsRUFBRSxFQUFFO1lBQ1AsTUFBTSxFQUFFLEVBQUU7WUFDVixVQUFVLEVBQUUsRUFBRTtZQUNkLFdBQVcsRUFBRSxFQUFFO1lBQ2YsU0FBUyxFQUFFLElBQUk7WUFDZixNQUFNLEVBQUUsSUFBSTtZQUNaLFFBQVEsRUFBRSxJQUFJO1lBQ2QsU0FBUyxFQUFFLEVBQUU7U0FDZDtRQUNELElBQUksRUFBRSxFQUFFO0tBQ1Q7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvL2FwcC50c1xuaW1wb3J0IHsgZ2V0SW5kZXggfSBmcm9tICcuL3V0aWxzL3V0aWwnXG5leHBvcnQgaW50ZXJmYWNlIElNeUFwcCB7XG4gIGdsb2JhbERhdGE6IHtcbiAgICBzZXNzaW9uS2V5Pzogc3RyaW5nLFxuICAgIG9wZW5JZD86IHN0cmluZyxcbiAgICBzaG93TG9naW5QYW5lbDogYm9vbGVhbixcbiAgICB1c2VySW5mbzoge1xuICAgICAgaXNTaGFyZTogbnVtYmVyIHwgbnVsbCxcbiAgICAgIGtleTogc3RyaW5nLFxuICAgICAgb3BlbklkOiBzdHJpbmcsXG4gICAgICBzZXNzaW9uS2V5OiBzdHJpbmcsXG4gICAgICBwaG9uZU51bWJlcjogc3RyaW5nLFxuICAgICAgc2VydmljZUlkOiBudW1iZXIgfCBudWxsLFxuICAgICAgbWVtYmVySWQ6IG51bWJlciB8IG51bGwsXG4gICAgICB0eXBlSWQ6IG51bWJlciB8IG51bGwsXG4gICAgICB0eXBlU2hhcmU6IHN0cmluZ1xuICAgIH0sXG4gICAgdHlwZUlkPzogbnVtYmVyLFxuICAgIHByZWZpeD86IHN0cmluZyxcbiAgICBmaWxlUHJlZml4Pzogc3RyaW5nLFxuICAgIGRhdGFUYWJJbmRleD86IHN0cmluZyxcbiAgICBzaGFyZT86IGFueSxcbiAgICBhcnJheT86IGFueVtdLFxuICAgIG9iamVjdEFycmF5PzogYW55W10sXG4gICAgZGF0YT86IHt9XG4gIH1cbiAgZ2V0VHlwZUlkPzogYW55LFxuICBnZXRLZXk/OiBhbnksXG4gIHdhdGNoPzogYW55LFxuICB1cGRhdGVTaGFyZT86IGFueVxufVxuXG5BcHA8SU15QXBwPih7XG4gIG9uTGF1bmNoKCkge1xuICB9LFxuICB3YXRjaDogZnVuY3Rpb24gKGtleTogc3RyaW5nLCBtZXRob2Q6IGFueSkge1xuICAgIGxldCBvYmogPSB0aGlzLmdsb2JhbERhdGE7XG4gICAgLy/liqDkuKrliY3nvIDnlJ/miJDpmpDol4/lj5jph4/vvIzpmLLmraLmrbvlvqrnjq/lj5HnlJ9cbiAgICBsZXQgb3JpID0gb2JqW2tleV07ICAgLy9vYmpba2V5Xei/meS4quS4jeiDveaUvuWcqE9iamVjdC5kZWZpbmVQcm9wZXJ0eemHjFxuXG4gICAgaWYgKG9yaSkgeyAgICAvL+WkhOeQhuW3sue7j+WjsOaYjueahOWPmOmHj++8jOe7keWumuWkhOeQhlxuICAgICAgbWV0aG9kKG9yaSk7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXNbJ19fXycgKyBrZXldID0gdmFsdWU7XG4gICAgICAgIG1ldGhvZCh2YWx1ZSk7ICAgIC8v5pWw5o2u5pyJ5Y+Y5YyW55qE5pe25YCZ5Zue6LCD5Ye95pWw77yM5a6e546w5ZCM5q2l5Yqf6IO9XG4gICAgICB9LFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpc1snX18nICsga2V5XSA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmIChvcmkpIHtcbiAgICAgICAgICAgIC8v6L+Z6YeM6K+75Y+W5pWw5o2u55qE5pe25YCZ6ZqQ6JeP5Y+Y6YeP5ZKMIGdsb2JhbERhdGHorr7nva7kuI3kuIDmoLfvvIzmiYDku6XopoHlgZrlkIzmraXlpITnkIZcbiAgICAgICAgICAgIHRoaXNbJ19fJyArIGtleV0gPSBvcmk7XG4gICAgICAgICAgICByZXR1cm4gb3JpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1snX18nICsga2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIGdldEtleTogZnVuY3Rpb24gKGNiOiBhbnkpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICBjb25zdCBrZXkgPSB0aGlzLmdsb2JhbERhdGEudXNlckluZm8ua2V5O1xuICAgIGlmIChrZXkpIHtcbiAgICAgIGNiKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOeZu+W9lVxuICAgICAgd3gubG9naW4oe1xuICAgICAgICBzdWNjZXNzKF9yZXMpIHtcbiAgICAgICAgICB3eC5yZXF1ZXN0KHsvLyDlj5HpgIEgX3Jlcy5jb2RlIOWIsOWQjuWPsOaNouWPliBvcGVuSWQsIHNlc3Npb25LZXksIHVuaW9uSWRcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vbGR4dC5iZXRhankuY29tL2ludGYvdW5pb25BdXRoP2NvZGU9JyArIF9yZXMuY29kZSwgLy9cbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzOiBhbnkpIHtcbiAgICAgICAgICAgICAgY29uc3QgdXNlckluZm8gPSByZXMuZGF0YS5yZXN1bHQ7XG4gICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5yZXN1bHQua2V5KSB7XG4gICAgICAgICAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICB1cmw6IHRoYXQuZ2xvYmFsRGF0YS5wcmVmaXggKyAnZ2V0UHJvamVjdExpc3QnLCAvL+iOt+WPlumhueebruWIl+ihqFxuICAgICAgICAgICAgICAgICAgc3VjY2VzcyhyZXM6IGFueSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IGdldEluZGV4KHJlcy5kYXRhLnJlc3VsdC5saXN0LCAnaXNEZWZhdWx0JywgMSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1YmplY3QgPSByZXMuZGF0YS5yZXN1bHQubGlzdFtpbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHN1YmplY3QpO1xuICAgICAgICAgICAgICAgICAgICB1c2VySW5mby50eXBlSWQgPSBzdWJqZWN0LmlkO1xuICAgICAgICAgICAgICAgICAgICB1c2VySW5mby50eXBlU2hhcmUgPSB0aGF0Lmdsb2JhbERhdGEuZmlsZVByZWZpeCArIHN1YmplY3Quc2hhcmVGaWxlSWRcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gdXNlckluZm87XG4gICAgICAgICAgICAgICAgICAgIGNiKHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbylcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckluZm8gPSB1c2VySW5mbztcbiAgICAgICAgICAgICAgICBjYihudWxsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgZ2V0VHlwZUlkOiBmdW5jdGlvbiAoY2I6IGFueSkge1xuICAgIGlmICh0aGlzLmdsb2JhbERhdGEudHlwZUlkKSB7XG4gICAgICBjYih0aGlzLmdsb2JhbERhdGEudHlwZUlkKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IHRoYXQuZ2xvYmFsRGF0YS5wcmVmaXggKyAnZ2V0UHJvamVjdExpc3QnLCAvL+iOt+WPlumhueebruWIl+ihqFxuICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyAvLyDpu5jorqTlgLxcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzcyhyZXM6IGFueSkge1xuICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS50eXBlSWQgPSByZXMuZGF0YS5yZXN1bHQubGlzdFswXS5pZDtcbiAgICAgICAgICBjYihyZXMuZGF0YS5yZXN1bHQubGlzdFswXS5pZClcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICB1cGRhdGVTaGFyZSgpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICB3eC5yZXF1ZXN0KHtcbiAgICAgIHVybDogdGhpcy5nbG9iYWxEYXRhLnByZWZpeCArICd1cGRhdGVTaGFyZScsIC8v6ICD5YmN6LWE5paZ5YiX6KGoXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGRhdGE6IHsga2V5OiB0aGlzLmdsb2JhbERhdGEudXNlckluZm8ua2V5IH0sXG4gICAgICBzdWNjZXNzKCkge1xuICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckluZm8uaXNTaGFyZSA9IDE7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIGdsb2JhbERhdGE6IHtcbiAgICB0eXBlSWQ6IDAsXG4gICAgZGF0YVRhYkluZGV4OiAnMCcsXG4gICAgcHJlZml4OiAnaHR0cHM6Ly9sZHh0LmJldGFqeS5jb20vaW50Zi9jYWxsLz9hY3Rpb249JyxcbiAgICBmaWxlUHJlZml4OiAnaHR0cHM6Ly9sZHh0LmJldGFqeS5jb20vYWRtaW4vZmlsZXVwbG9hZC9wcmV2aWV3RmlsZT9pZD0nLFxuICAgIHNob3dMb2dpblBhbmVsOiBmYWxzZSxcbiAgICBzaGFyZToge1xuICAgICAgcGFnZTogJycsXG4gICAgICBzY2VuZTogJydcbiAgICB9LFxuICAgIHVzZXJJbmZvOiB7XG4gICAgICBpc1NoYXJlOiAwLFxuICAgICAga2V5OiAnJyxcbiAgICAgIG9wZW5JZDogJycsXG4gICAgICBzZXNzaW9uS2V5OiAnJyxcbiAgICAgIHBob25lTnVtYmVyOiAnJyxcbiAgICAgIHNlcnZpY2VJZDogbnVsbCxcbiAgICAgIHR5cGVJZDogbnVsbCxcbiAgICAgIG1lbWJlcklkOiBudWxsLFxuICAgICAgdHlwZVNoYXJlOiAnJ1xuICAgIH0sXG4gICAgZGF0YToge31cbiAgfVxufSkiXX0=