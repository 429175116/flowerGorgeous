// pages/myOrder/myOrder.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderList: "",
        hiddenmodalput: true,//可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
        hiddenmodalputs: true,
        id: '',
        status: "",
        imgUrl:getApp().data.imgUrl
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        //获取信息
        wx.request({
            url: `${getApp().data.requestUrl}/auditingOrderd/${getApp().data.user_id}`,
            success: function (res) {
                if (res.data.code == 200 || res.data.code == 404) {
                    that.setData({
                        orderList: res.data.res,
                    })
                    //判断订单状态
                    var i = 0;
                    var array = that.data.orderList;
                    for (i in array) {
                        if (array[i].is_delete == 2) {
                            that.setData({
                                status: "审核中"
                            })
                        } else if (array[i].is_delete == 1) {
                            that.setData({
                                status: "通过"
                            })
                        } else if (array[i].is_delete == 0) {
                            that.setData({
                                status: "未通过"
                            })
                        }
                    }
                }
            }
        })  
    },
    //点击按钮弹出弹框  
    toExamine: function (e) {
        var id = e.target.dataset.id;
        this.setData({
            hiddenmodalput: !this.data.hiddenmodalput,
            id: id
        })
    },
    //关闭弹框 
    cancel: function () {
        this.setData({
            hiddenmodalput: true
        })
    },
    //关闭弹框并通过此订单
    confirm: function () {
        var that = this;
        var id = that.data.id;
        var listData = that.data.orderList;
        var pay = "";
        var i=0;
        for (i in listData) {
            if (listData[i].id == id) {
                pay = listData[i].pay;
                break;
            }
        }
        if (pay == 0) {
            wx.showModal({
                content: '订单未支付不能通过此订单',
            })
            return;
        }
        wx.request({
            url: `${getApp().data.requestUrl}/auditingOrder/{"user_id":${getApp().data.user_id},"order_id":${id}}`,
            success: function (res) {
                if (res.data.code == 200) {
                    that.setData({
                        hiddenmodalput: true
                    })
                    that.onLoad();
                }
            }
        })
    },//点击按钮弹出弹框  
    toExamines: function (e) {
        var id = e.target.dataset.id;
        this.setData({
            hiddenmodalputs: !this.data.hiddenmodalputs,
            id: id
        })
    },
    //关闭弹框并不通过此订单 
    cancels: function () {
        this.setData({
            hiddenmodalputs: true
        })
    },
    //关闭弹框并不通过此订单
    confirms: function () {
        var that = this;
        var id = that.data.id;
        wx.request({
            url: `${getApp().data.requestUrl}/outOrder/${id}`,
            success: function (res) {
                if (res.data.code == 200) {
                    that.onLoad();
                    that.setData({
                        hiddenmodalputs: true
                    })
                }
            }
        })
    }
})