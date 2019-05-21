// pages/order/order.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        commodity: "",
        address: "",
        imgUrlData: getApp().data.imgUrl
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var address_id = options.address_id;
        getApp().data.commodityId = options.id;
        var that = this;
        //获取商品信息
        wx.request({
            url: `${getApp().data.requestUrl}/proDes/{ "user_id": ${getApp().data.user_id}, "pro_id": ${options.id} }`,
            success: function (res) {
                if (res.data.code == 200) {
                    that.setData({
                        commodity: res.data.res,
                    })
                }
            }
        })
        //获取地址信息
        wx.request({
            url: `${getApp().data.requestUrl}/address/${getApp().data.user_id}`,
            success: function (res) {
                if (res.data.code == 200) {
                    if (address_id == undefined) {
                        that.setData({
                            address: res.data.res[0],
                        })
                    } else {
                        var i = 0;
                        var array = res.data.res;
                        for (i in array) {
                            if (address_id == array[i].id) {
                                that.setData({
                                    address: array[i],
                                })
                            }
                        }
                    }
                }
            }
        })
    },
    placeOrder: function () {
        var id = this.data.commodity.id;
        wx.request({
            url: `${getApp().data.requestUrl}/proOrder`,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                pro: this.data.commodity.id,
                num: 1,
                user_id: getApp().data.user_id,
                address_id: this.data.address.id,
                total: this.data.commodity.price
            },
            success: function (res) {
                if (res.data.code == 200) {
                    wx.navigateTo({
                        url: '../pay/pay?order_id=' + res.data.res + '&id=' + id,
                    })
                } else if (res.data.code == 422) {
                    wx.showModal({
                        content: '余额不足',
                    })
                } else {
                    wx.showModal({
                        content: '支付失败',
                    })
                }
            }
        })
    }
})