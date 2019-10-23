"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
console.log(app.globalData);
Page({
    data: {
        tabs: ["考前资料", "答案对照"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0
    },
    onShow: function () {
        this.setData({
            activeIndex: app.globalData.dataTabIndex
        });
    },
    tabClick: function (e) {
        app.globalData.dataTabIndex = e.currentTarget.id;
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQztBQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM1QixJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3RCLFdBQVcsRUFBRSxDQUFDO1FBQ2QsWUFBWSxFQUFFLENBQUM7UUFDZixVQUFVLEVBQUUsQ0FBQztLQUNkO0lBQ0QsTUFBTTtRQUNKLElBQUksQ0FBQyxPQUFRLENBQUM7WUFDWixXQUFXLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZO1NBQ3pDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxRQUFRLFlBQUMsQ0FBQztRQUNSLEdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFRLENBQUM7WUFDWixZQUFZLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxVQUFVO1lBQ3hDLFdBQVcsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUU7U0FDaEMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uLy4uLy4uL2FwcCc7XG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpO1xuY29uc29sZS5sb2coYXBwLmdsb2JhbERhdGEpO1xuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICB0YWJzOiBbXCLogIPliY3otYTmlplcIiwgXCLnrZTmoYjlr7nnhadcIl0sXG4gICAgYWN0aXZlSW5kZXg6IDAsXG4gICAgc2xpZGVyT2Zmc2V0OiAwLFxuICAgIHNsaWRlckxlZnQ6IDBcbiAgfSxcbiAgb25TaG93KCkge1xuICAgIHRoaXMuc2V0RGF0YSEoe1xuICAgICAgYWN0aXZlSW5kZXg6IGFwcC5nbG9iYWxEYXRhLmRhdGFUYWJJbmRleFxuICAgIH0pO1xuICB9LFxuICB0YWJDbGljayhlKSB7XG4gICAgYXBwLmdsb2JhbERhdGEuZGF0YVRhYkluZGV4ID0gZS5jdXJyZW50VGFyZ2V0LmlkO1xuICAgIHRoaXMuc2V0RGF0YSEoe1xuICAgICAgc2xpZGVyT2Zmc2V0OiBlLmN1cnJlbnRUYXJnZXQub2Zmc2V0TGVmdCxcbiAgICAgIGFjdGl2ZUluZGV4OiBlLmN1cnJlbnRUYXJnZXQuaWRcbiAgICB9KVxuICB9XG59KVxuIl19