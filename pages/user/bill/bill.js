// pages/user/bill/bill.js
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
            url: `${getApp().data.requestUrl}/detail/${getApp().data.user_id}`,
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