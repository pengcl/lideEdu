"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
Page({
    data: {
        inputShowed: false,
        inputVal: "",
    },
    onShow: function () {
        app.getKey(function (userInfo) {
            if (!userInfo) {
                app.globalData.showLoginPanel = true;
            }
            else { }
        });
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value
        });
    },
    onShareAppMessage: function () {
        app.updateShare();
        return {
            title: '立得学堂',
            path: '/pages/search/search'
        };
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFDO0FBRTdCLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLFFBQVEsRUFBRSxFQUFFO0tBQ2I7SUFDRCxNQUFNO1FBQ0osR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFDLFFBQWE7WUFDdkIsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDYixHQUFHLENBQUMsVUFBVSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7YUFDdEM7aUJBQU0sR0FBRztRQUNaLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELFNBQVM7UUFDUCxJQUFJLENBQUMsT0FBUSxDQUFDO1lBQ1osV0FBVyxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELFNBQVM7UUFDUCxJQUFJLENBQUMsT0FBUSxDQUFDO1lBQ1osUUFBUSxFQUFFLEVBQUU7WUFDWixXQUFXLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsVUFBVTtRQUNSLElBQUksQ0FBQyxPQUFRLENBQUM7WUFDWixRQUFRLEVBQUUsRUFBRTtTQUNiLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxXQUFXLFlBQUMsQ0FBTTtRQUNoQixJQUFJLENBQUMsT0FBUSxDQUFDO1lBQ1osUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztTQUN6QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsaUJBQWlCO1FBQ2YsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xCLE9BQU87WUFDTCxLQUFLLEVBQUUsTUFBTTtZQUNiLElBQUksRUFBRSxzQkFBc0I7U0FDN0IsQ0FBQTtJQUNILENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTXlBcHAgfSBmcm9tICcuLi8uLi9hcHAnO1xuaW1wb3J0IHsgZ2V0SW5kZXgsIGZvcm1hdFRpbWUgfSBmcm9tICcuLi8uLi91dGlscy91dGlsJztcbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KCk7XG5cblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgaW5wdXRTaG93ZWQ6IGZhbHNlLFxuICAgIGlucHV0VmFsOiBcIlwiLFxuICB9LFxuICBvblNob3coKSB7XG4gICAgYXBwLmdldEtleSgodXNlckluZm86IGFueSkgPT4ge1xuICAgICAgaWYgKCF1c2VySW5mbykge1xuICAgICAgICBhcHAuZ2xvYmFsRGF0YS5zaG93TG9naW5QYW5lbCA9IHRydWU7XG4gICAgICB9IGVsc2UgeyB9XG4gICAgfSlcbiAgfSxcbiAgc2hvd0lucHV0KCkge1xuICAgIHRoaXMuc2V0RGF0YSEoe1xuICAgICAgaW5wdXRTaG93ZWQ6IHRydWVcbiAgICB9KTtcbiAgfSxcbiAgaGlkZUlucHV0KCkge1xuICAgIHRoaXMuc2V0RGF0YSEoe1xuICAgICAgaW5wdXRWYWw6IFwiXCIsXG4gICAgICBpbnB1dFNob3dlZDogZmFsc2VcbiAgICB9KTtcbiAgfSxcbiAgY2xlYXJJbnB1dCgpIHtcbiAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgIGlucHV0VmFsOiBcIlwiXG4gICAgfSk7XG4gIH0sXG4gIGlucHV0VHlwaW5nKGU6IGFueSkge1xuICAgIHRoaXMuc2V0RGF0YSEoe1xuICAgICAgaW5wdXRWYWw6IGUuZGV0YWlsLnZhbHVlXG4gICAgfSk7XG4gIH0sXG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgIGFwcC51cGRhdGVTaGFyZSgpO1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ+eri+W+l+WtpuWggicsXG4gICAgICBwYXRoOiAnL3BhZ2VzL3NlYXJjaC9zZWFyY2gnXG4gICAgfVxuICB9XG59KVxuIl19