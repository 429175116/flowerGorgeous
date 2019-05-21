// pages/user/addressList/addressList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        listData: "",
        id:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        that.setData({
            id: getApp().data.commodityId
        })
        wx.request({
            url: `${getApp().data.requestUrl}/address/${getApp().data.user_id}`,
            success: function (res) {
                if (res.data.code == 200 || res.data.code == 404) {
                    that.setData({
                        listData: res.data.res,
                    })
                }
            }
        })
    },
    // 删除收货地址事件
    delAddress:function(e) {
        var that = this;
        let addressId = e.currentTarget.dataset.id
        wx.request({
            url: `${getApp().data.requestUrl}/address/${addressId}`,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "DELETE",
            success: function (res) {
                if (res.data.code == 200) {
                    that.onLoad();
                }
            }
        })
    }
})