// pages/user/warrantInfo/warrantInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        listData:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        wx.request({
            url: `${getApp().data.requestUrl}/authorize/${getApp().data.user_id}`,
            success: function(res) {
                if (res.data.code == 200) {
                    that.setData({
                        listData: res.data.res,
                    })
                }
            }
        })
    }
})