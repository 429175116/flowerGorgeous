// pages/nav/nav.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    goIndex: function () {
        wx.redirectTo({
            url: "/pages/index"
        })
    },
    goManage: function () {
        wx.redirectTo({
            url: "/pages/manage/manage"
        })
    },
    goUser: function () {
        wx.redirectTo({
            url: "/pages/user/user"
        })
    }
})