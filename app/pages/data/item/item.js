"use strict";
Page({
    data: {},
    onShow: function () {
        this.setData({});
    },
    onShareAppMessage: function () {
        app.updateShare();
        return {
            title: '立得学堂',
            path: '/pages/data/list/list'
        };
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIml0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUksQ0FBQztJQUNILElBQUksRUFBRSxFQUNMO0lBQ0QsTUFBTTtRQUNKLElBQUksQ0FBQyxPQUFRLENBQUMsRUFDYixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsaUJBQWlCO1FBQ2YsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xCLE9BQU87WUFDTCxLQUFLLEVBQUUsTUFBTTtZQUNiLElBQUksRUFBRSx1QkFBdUI7U0FDOUIsQ0FBQTtJQUNILENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJQYWdlKHtcbiAgZGF0YToge1xuICB9LFxuICBvblNob3coKSB7XG4gICAgdGhpcy5zZXREYXRhISh7XG4gICAgfSlcbiAgfSxcbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgYXBwLnVwZGF0ZVNoYXJlKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn56uL5b6X5a2m5aCCJyxcbiAgICAgIHBhdGg6ICcvcGFnZXMvZGF0YS9saXN0L2xpc3QnXG4gICAgfVxuICB9XG59KVxuIl19