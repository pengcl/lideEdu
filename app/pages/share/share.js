"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
Page({
    data: {
        tempFilePath: ''
    },
    onShow: function () {
        var that = this;
        var ctx = wx.createCanvasContext('poster');
        app.getKey(function (userInfo) {
            if (!userInfo) {
                app.globalData.showLoginPanel = true;
            }
            else {
                wx.getSystemInfo({
                    success: function (res) {
                        var avatarurl_width = 100, avatarurl_heigth = 100, avatarurl_x = res.windowWidth - (100 + 20), avatarurl_y = res.windowHeight - (100 + 68);
                        wx.getImageInfo({
                            src: app.globalData.userInfo.typeShare,
                            success: function (poster) {
                                ctx.drawImage(poster.path, 0, 0, res.windowWidth, res.windowHeight - 48);
                                ctx.save();
                                ctx.beginPath();
                                ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);
                                ctx.clip();
                                var pages = getCurrentPages();
                                var sharePage = pages[pages.length - 2];
                                wx.getImageInfo({
                                    src: 'https://ldxt.betajy.com/intf/getQRCode?page=' + sharePage.route + '&memberId=' + app.globalData.userInfo.memberId +
                                        '&projectId=' + app.globalData.userInfo.typeId,
                                    success: function (result) {
                                        console.log(result.path);
                                        ctx.drawImage(result.path, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth);
                                        ctx.draw(true, function () {
                                            wx.canvasToTempFilePath({
                                                x: 0,
                                                y: 0,
                                                width: res.windowWidth,
                                                height: res.windowHeight,
                                                destWidth: res.windowWidth,
                                                destHeight: res.windowHeight,
                                                canvasId: 'poster',
                                                success: function (res) {
                                                    that.setData({
                                                        tempFilePath: res.tempFilePath
                                                    });
                                                }
                                            });
                                        });
                                    },
                                    fail: function (err) {
                                        console.log(err);
                                    },
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    save: function () {
        wx.saveImageToPhotosAlbum({
            filePath: this.data.tempFilePath,
            success: function () {
                wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 2000,
                    mask: true,
                });
            },
            fail: function (err) {
                console.log(err);
                wx.showToast({
                    title: '保存失败',
                    icon: 'none',
                    duration: 2000,
                    mask: true,
                });
            },
        });
    },
    onShareAppMessage: function () {
        app.updateShare();
        return {
            title: '立即得到',
            path: '/pages/data/list/list'
        };
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaGFyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFDO0FBRzdCLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLFlBQVksRUFBRSxFQUFFO0tBQ2pCO0lBQ0QsTUFBTTtRQUNKLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFDLFFBQWE7WUFDdkIsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDYixHQUFHLENBQUMsVUFBVSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7YUFDdEM7aUJBQU07Z0JBQ0wsRUFBRSxDQUFDLGFBQWEsQ0FBQztvQkFDZixPQUFPLEVBQUUsVUFBQyxHQUFRO3dCQUNoQixJQUFJLGVBQWUsR0FBRyxHQUFHLEVBQ3ZCLGdCQUFnQixHQUFHLEdBQUcsRUFDdEIsV0FBVyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQzFDLFdBQVcsR0FBRyxHQUFHLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO3dCQUU5QyxFQUFFLENBQUMsWUFBWSxDQUFDOzRCQUNkLEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTOzRCQUN0QyxPQUFPLFlBQUMsTUFBTTtnQ0FDWixHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0NBQ3pFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQ0FDWCxHQUFHLENB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O0lBQ0gsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uL2FwcCc7XG5pbXBvcnQgeyBnZXRJbmRleCwgZm9ybWF0VGltZSB9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWwnO1xuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKTtcbmltcG9ydCBkcmF3UXJjb2RlIGZyb20gJy4uLy4uL3V0aWxzL3dlYXBwLnFyY29kZS5lc20uanMnO1xuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIHRlbXBGaWxlUGF0aDogJydcbiAgfSxcbiAgb25TaG93KCkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIGNvbnN0IGN0eCA9IHd4LmNyZWF0ZUNhbnZhc0NvbnRleHQoJ3Bvc3RlcicpO1xuICAgIGFwcC5nZXRLZXkoKHVzZXJJbmZvOiBhbnkpID0+IHtcbiAgICAgIGlmICghdXNlckluZm8pIHtcbiAgICAgICAgYXBwLmdsb2JhbERhdGEuc2hvd0xvZ2luUGFuZWwgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3guZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgICAgc3VjY2VzczogKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICBsZXQgYXZhdGFydXJsX3dpZHRoID0gMTAwLCAvL+e7mOWItueahOWktOWDj+WuveW6plxuICAgICAgICAgICAgICBhdmF0YXJ1cmxfaGVpZ3RoID0gMTAwLCAvL+e7mOWItueahOWktOWDj+mrmOW6plxuICAgICAgICAgICAgICBhdmF0YXJ1cmxfeCA9IHJlcy53aW5kb3dXaWR0aCAtICgxMDAgKyAyMCksIC8v57uY5Yi255qE5aS05YOP5Zyo55S75biD5LiK55qE5L2N572uXG4gICAgICAgICAgICAgIGF2YXRhcnVybF95ID0gcmVzLndpbmRvd0hlaWdodCAtICgxMDAgKyA2OCk7IC8v57uY5Yi255qE5aS05YOP5Zyo55S75biD5LiK55qE5L2N572uXG4gICAgICAgICAgXG4gICAgICAgICAgICB3eC5nZXRJbWFnZUluZm8oe1xuICAgICAgICAgICAgICBzcmM6IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLnR5cGVTaGFyZSxcbiAgICAgICAgICAgICAgc3VjY2Vzcyhwb3N0ZXIpIHtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHBvc3Rlci5wYXRoLCAwLCAwLCByZXMud2luZG93V2lkdGgsIHJlcy53aW5kb3dIZWlnaHQgLSA0OCk7XG4gICAgICAgICAgICAgICAgY3R4LnNhdmUoKTsgLy8g5YWI5L+d5a2Y54q25oCBIOW3suS+v+S6jueUu+WujOWchuWGjeeUqFxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTsgLy/lvIDlp4vnu5jliLZcbiAgICAgICAgICAgICAgICAvL+WFiOeUu+S4quWchiAgIOWJjeS4pOS4quWPguaVsOehruWumuS6huWchuW/gyDvvIh4LHnvvIkg5Z2Q5qCHICDnrKzkuInkuKrlj4LmlbDmmK/lnIbnmoTljYrlvoQgIOWbm+WPguaVsOaYr+e7mOWbvuaWueWQkSAg6buY6K6k5pivZmFsc2XvvIzljbPpobrml7bpkohcbiAgICAgICAgICAgICAgICBjdHguYXJjKGF2YXRhcnVybF93aWR0aCAvIDIgKyBhdmF0YXJ1cmxfeCwgYXZhdGFydXJsX2hlaWd0aCAvIDIgKyBhdmF0YXJ1cmxfeSwgYXZhdGFydXJsX3dpZHRoIC8gMiwgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBjdHguY2xpcCgpOyAvL+eUu+S6huWchiDlho3liarliIcgIOWOn+Wni+eUu+W4g+S4reWJquWIh+S7u+aEj+W9oueKtuWSjOWwuuWvuOOAguS4gOaXpuWJquWIh+S6huafkOS4quWMuuWfn++8jOWImeaJgOacieS5i+WQjueahOe7mOWbvumDveS8muiiq+mZkOWItuWcqOiiq+WJquWIh+eahOWMuuWfn+WGhVxuICAgICAgICAgICAgICAgIGNvbnN0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hhcmVQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMl07XG4gICAgICAgICAgICAgICAgd3guZ2V0SW1hZ2VJbmZvKHtcbiAgICAgICAgICAgICAgICAgIHNyYzogJ2h0dHBzOi8vbGR4dC5iZXRhankuY29tL2ludGYvZ2V0UVJDb2RlP3BhZ2U9JyArIHNoYXJlUGFnZS5yb3V0ZSArICcmbWVtYmVySWQ9JyArIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLm1lbWJlcklkICsgXG4gICAgICAgICAgICAgICAgICAgICcmcHJvamVjdElkPScgKyBhcHAuZ2xvYmFsRGF0YS51c2VySW5mby50eXBlSWQsXG4gICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAvLyDmiorlm77niYflrZjkuItcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0LnBhdGgpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShyZXN1bHQucGF0aCwgYXZhdGFydXJsX3gsIGF2YXRhcnVybF95LCBhdmF0YXJ1cmxfd2lkdGgsIGF2YXRhcnVybF9oZWlndGgpOyAvLyDmjqjov5vljrvlm77niYdcbiAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXcodHJ1ZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHd4LmNhbnZhc1RvVGVtcEZpbGVQYXRoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHJlcy53aW5kb3dXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogcmVzLndpbmRvd0hlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RXaWR0aDogcmVzLndpbmRvd1dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzdEhlaWdodDogcmVzLndpbmRvd0hlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhc0lkOiAncG9zdGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0RGF0YSEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBGaWxlUGF0aDogcmVzLnRlbXBGaWxlUGF0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBmYWlsKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvL2N0eC5kcmF3KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgfVxuICAgIH0pO1xuXG4gIH0sXG4gIHNhdmUoKSB7XG4gICAgd3guc2F2ZUltYWdlVG9QaG90b3NBbGJ1bSh7XG4gICAgICBmaWxlUGF0aDogdGhpcy5kYXRhLnRlbXBGaWxlUGF0aCxcbiAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfkv53lrZjmiJDlip8nLCAvLyDmj5DnpLrnmoTlhoXlrrksXG4gICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLCAvLyDlm77moIcsXG4gICAgICAgICAgZHVyYXRpb246IDIwMDAsIC8vIOW7tui/n+aXtumXtCxcbiAgICAgICAgICBtYXNrOiB0cnVlLCAvLyDmmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGZhaWwoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfkv53lrZjlpLHotKUnLCAvLyDmj5DnpLrnmoTlhoXlrrksXG4gICAgICAgICAgaWNvbjogJ25vbmUnLCAvLyDlm77moIcsXG4gICAgICAgICAgZHVyYXRpb246IDIwMDAsIC8vIOW7tui/n+aXtumXtCxcbiAgICAgICAgICBtYXNrOiB0cnVlLCAvLyDmmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSxcbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgYXBwLnVwZGF0ZVNoYXJlKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn56uL5Y2z5b6X5YiwJyxcbiAgICAgIHBhdGg6ICcvcGFnZXMvZGF0YS9saXN0L2xpc3QnXG4gICAgfVxuICB9XG59KVxuIl19