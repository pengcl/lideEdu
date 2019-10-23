"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var weapp_qrcode_esm_js_1 = require("../../utils/weapp.qrcode.esm.js");
Page({
    data: {},
    onLoad: function () {
        this.setData({});
        this.draw();
    },
    draw: function () {
        weapp_qrcode_esm_js_1.default({
            width: 100,
            height: 100,
            canvasId: 'myQrcode',
            text: 'https://github.com/yingye',
            image: {
                imageResource: '../../images/icon.png',
                dx: 70,
                dy: 70,
                dWidth: 60,
                dHeight: 60
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaGFyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVFQUF5RDtBQUN6RCxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUUsRUFDTDtJQUNELE1BQU07UUFDSixJQUFJLENBQUMsT0FBUSxDQUFDLEVBQ2IsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUNELElBQUk7UUFDRiw2QkFBVSxDQUFDO1lBQ1QsS0FBSyxFQUFFLEdBQUc7WUFDVixNQUFNLEVBQUUsR0FBRztZQUNYLFFBQVEsRUFBRSxVQUFVO1lBRXBCLElBQUksRUFBRSwyQkFBMkI7WUFFakMsS0FBSyxFQUFFO2dCQUNMLGFBQWEsRUFBRSx1QkFBdUI7Z0JBQ3RDLEVBQUUsRUFBRSxFQUFFO2dCQUNOLEVBQUUsRUFBRSxFQUFFO2dCQUNOLE1BQU0sRUFBRSxFQUFFO2dCQUNWLE9BQU8sRUFBRSxFQUFFO2FBQ1o7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRyYXdRcmNvZGUgZnJvbSAnLi4vLi4vdXRpbHMvd2VhcHAucXJjb2RlLmVzbS5qcyc7XG5QYWdlKHtcbiAgZGF0YToge1xuICB9LFxuICBvbkxvYWQoKSB7XG4gICAgdGhpcy5zZXREYXRhISh7XG4gICAgfSk7XG4gICAgdGhpcy5kcmF3KCk7XG4gIH0sXG4gIGRyYXcoKXtcbiAgICBkcmF3UXJjb2RlKHtcbiAgICAgIHdpZHRoOiAxMDAsXG4gICAgICBoZWlnaHQ6IDEwMCxcbiAgICAgIGNhbnZhc0lkOiAnbXlRcmNvZGUnLFxuICAgICAgLy8gY3R4OiB3eC5jcmVhdGVDYW52YXNDb250ZXh0KCdteVFyY29kZScpLFxuICAgICAgdGV4dDogJ2h0dHBzOi8vZ2l0aHViLmNvbS95aW5neWUnLFxuICAgICAgLy8gdjEuMC4wK+eJiOacrOaUr+aMgeWcqOS6jOe7tOeggeS4iue7mOWItuWbvueJh1xuICAgICAgaW1hZ2U6IHtcbiAgICAgICAgaW1hZ2VSZXNvdXJjZTogJy4uLy4uL2ltYWdlcy9pY29uLnBuZycsXG4gICAgICAgIGR4OiA3MCxcbiAgICAgICAgZHk6IDcwLFxuICAgICAgICBkV2lkdGg6IDYwLFxuICAgICAgICBkSGVpZ2h0OiA2MFxuICAgICAgfVxuICAgIH0pXG4gIH1cbn0pXG4iXX0=