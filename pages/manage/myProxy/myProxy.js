// pages/manage/myProxy/myProxy.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.request({
            url: `${getApp().data.requestUrl}/myAgent/${getApp().data.user_id}`,
            success: function (res) {
                if (res.data.code == 200) {
                    that.setData({
                        list: res.data.res,
                    })
                }
            }
        })  
    }
})