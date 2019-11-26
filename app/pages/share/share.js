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
        app.updateShare();
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
            title: '教育成就美好未来',
            path: '/pages/data/list/list'
        };
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaGFyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFDO0FBRzdCLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLFlBQVksRUFBRSxFQUFFO0tBQ2pCO0lBQ0QsTUFBTTtRQUNKLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFDLFFBQWE7WUFDdkIsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDYixHQUFHLENBQUMsVUFBVSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7YUFDdEM7aUJBQU07Z0JBQ0wsRUFBRSxDQUFDLGFBQWEsQ0FBQztvQkFDZixPQUFPLEVBQUUsVUFBQyxHQUFRO3dCQUNoQixJQUFJLGVBQWUsR0FBRyxHQUFHLEVBQ3ZCLGdCQUFnQixHQUFHLEdBQUcsRUFDdEIsV0FBVyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQzFDLFdBQVcsR0FBRyxHQUFHLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO3dCQUU5QyxFQUFFLENBQUMsWUFBWSxDQUFDOzRCQUNkLEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTOzRCQUN0QyxPQUFPLFlBQUMsTUFBTTtnQ0FDWixHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0NBQ3pFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQ0FDWCxHQUFHLENB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QUNqQixJQUFJLEVBQUUsdUJBQXVCO1NBQzlCLENBQUE7SUFDSCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJztcbmltcG9ydCB7IGdldEluZGV4LCBmb3JtYXRUaW1lIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbCc7XG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpO1xuaW1wb3J0IGRyYXdRcmNvZGUgZnJvbSAnLi4vLi4vdXRpbHMvd2VhcHAucXJjb2RlLmVzbS5qcyc7XG5cblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgdGVtcEZpbGVQYXRoOiAnJ1xuICB9LFxuICBvblNob3coKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgY29uc3QgY3R4ID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dCgncG9zdGVyJyk7XG4gICAgYXBwLmdldEtleSgodXNlckluZm86IGFueSkgPT4ge1xuICAgICAgaWYgKCF1c2VySW5mbykge1xuICAgICAgICBhcHAuZ2xvYmFsRGF0YS5zaG93TG9naW5QYW5lbCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3eC5nZXRTeXN0ZW1JbmZvKHtcbiAgICAgICAgICBzdWNjZXNzOiAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGxldCBhdmF0YXJ1cmxfd2lkdGggPSAxMDAsIC8v57uY5Yi255qE5aS05YOP5a695bqmXG4gICAgICAgICAgICAgIGF2YXRhcnVybF9oZWlndGggPSAxMDAsIC8v57uY5Yi255qE5aS05YOP6auY5bqmXG4gICAgICAgICAgICAgIGF2YXRhcnVybF94ID0gcmVzLndpbmRvd1dpZHRoIC0gKDEwMCArIDIwKSwgLy/nu5jliLbnmoTlpLTlg4/lnKjnlLvluIPkuIrnmoTkvY3nva5cbiAgICAgICAgICAgICAgYXZhdGFydXJsX3kgPSByZXMud2luZG93SGVpZ2h0IC0gKDEwMCArIDY4KTsgLy/nu5jliLbnmoTlpLTlg4/lnKjnlLvluIPkuIrnmoTkvY3nva5cbiAgICAgICAgICBcbiAgICAgICAgICAgIHd4LmdldEltYWdlSW5mbyh7XG4gICAgICAgICAgICAgIHNyYzogYXBwLmdsb2JhbERhdGEudXNlckluZm8udHlwZVNoYXJlLFxuICAgICAgICAgICAgICBzdWNjZXNzKHBvc3Rlcikge1xuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UocG9zdGVyLnBhdGgsIDAsIDAsIHJlcy53aW5kb3dXaWR0aCwgcmVzLndpbmRvd0hlaWdodCAtIDQ4KTtcbiAgICAgICAgICAgICAgICBjdHguc2F2ZSgpOyAvLyDlhYjkv53lrZjnirbmgIEg5bey5L6/5LqO55S75a6M5ZyG5YaN55SoXG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyAvL+W8gOWni+e7mOWItlxuICAgICAgICAgICAgICAgIC8v5YWI55S75Liq5ZyGICAg5YmN5Lik5Liq5Y+C5pWw56Gu5a6a5LqG5ZyG5b+DIO+8iHgsee+8iSDlnZDmoIcgIOesrOS4ieS4quWPguaVsOaYr+WchueahOWNiuW+hCAg5Zub5Y+C5pWw5piv57uY5Zu+5pa55ZCRICDpu5jorqTmmK9mYWxzZe+8jOWNs+mhuuaXtumSiFxuICAgICAgICAgICAgICAgIGN0eC5hcmMoYXZhdGFydXJsX3dpZHRoIC8gMiArIGF2YXRhcnVybF94LCBhdmF0YXJ1cmxfaGVpZ3RoIC8gMiArIGF2YXRhcnVybF95LCBhdmF0YXJ1cmxfd2lkdGggLyAyLCAwLCBNYXRoLlBJICogMiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGN0eC5jbGlwKCk7IC8v55S75LqG5ZyGIOWGjeWJquWIhyAg5Y6f5aeL55S75biD5Lit5Ymq5YiH5Lu75oSP5b2i54q25ZKM5bC65a+444CC5LiA5pem5Ymq5YiH5LqG5p+Q5Liq5Yy65Z+f77yM5YiZ5omA5pyJ5LmL5ZCO55qE57uY5Zu+6YO95Lya6KKr6ZmQ5Yi25Zyo6KKr5Ymq5YiH55qE5Yy65Z+f5YaFXG4gICAgICAgICAgICAgICAgY29uc3QgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzaGFyZVBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAyXTtcbiAgICAgICAgICAgICAgICB3eC5nZXRJbWFnZUluZm8oe1xuICAgICAgICAgICAgICAgICAgc3JjOiAnaHR0cHM6Ly9sZHh0LmJldGFqeS5jb20vaW50Zi9nZXRRUkNvZGU/cGFnZT0nICsgc2hhcmVQYWdlLnJvdXRlICsgJyZtZW1iZXJJZD0nICsgYXBwLmdsb2JhbERhdGEudXNlckluZm8ubWVtYmVySWQgKyBcbiAgICAgICAgICAgICAgICAgICAgJyZwcm9qZWN0SWQ9JyArIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLnR5cGVJZCxcbiAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOaKiuWbvueJh+WtmOS4i1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQucGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHJlc3VsdC5wYXRoLCBhdmF0YXJ1cmxfeCwgYXZhdGFydXJsX3ksIGF2YXRhcnVybF93aWR0aCwgYXZhdGFydXJsX2hlaWd0aCk7IC8vIOaOqOi/m+WOu+WbvueJh1xuICAgICAgICAgICAgICAgICAgICBjdHguZHJhdyh0cnVlLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgd3guY2FudmFzVG9UZW1wRmlsZVBhdGgoe1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogcmVzLndpbmRvd1dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiByZXMud2luZG93SGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzdFdpZHRoOiByZXMud2luZG93V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXN0SGVpZ2h0OiByZXMud2luZG93SGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzSWQ6ICdwb3N0ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXREYXRhISh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEZpbGVQYXRoOiByZXMudGVtcEZpbGVQYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGZhaWwoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vY3R4LmRyYXcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICB9XG4gICAgfSk7XG5cbiAgfSxcbiAgc2F2ZSgpIHtcbiAgICBhcHAudXBkYXRlU2hhcmUoKTtcbiAgICB3eC5zYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtKHtcbiAgICAgIGZpbGVQYXRoOiB0aGlzLmRhdGEudGVtcEZpbGVQYXRoLFxuICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+S/neWtmOaIkOWKnycsIC8vIOaPkOekuueahOWGheWuuSxcbiAgICAgICAgICBpY29uOiAnc3VjY2VzcycsIC8vIOWbvuaghyxcbiAgICAgICAgICBkdXJhdGlvbjogMjAwMCwgLy8g5bu26L+f5pe26Ze0LFxuICAgICAgICAgIG1hc2s6IHRydWUsIC8vIOaYvuekuumAj+aYjuiSmeWxgu+8jOmYsuatouinpuaRuOepv+mAjyxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZmFpbChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+S/neWtmOWksei0pScsIC8vIOaPkOekuueahOWGheWuuSxcbiAgICAgICAgICBpY29uOiAnbm9uZScsIC8vIOWbvuaghyxcbiAgICAgICAgICBkdXJhdGlvbjogMjAwMCwgLy8g5bu26L+f5pe26Ze0LFxuICAgICAgICAgIG1hc2s6IHRydWUsIC8vIOaYvuekuumAj+aYjuiSmeWxgu+8jOmYsuatouinpuaRuOepv+mAjyxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9LFxuICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICBhcHAudXBkYXRlU2hhcmUoKTtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICfmlZnogrLmiJDlsLHnvo7lpb3mnKrmnaUnLFxuICAgICAgcGF0aDogJy9wYWdlcy9kYXRhL2xpc3QvbGlzdCdcbiAgICB9XG4gIH1cbn0pXG4iXX0=