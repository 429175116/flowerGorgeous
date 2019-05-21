// pages/pay/pay.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pay: "",
        commodity: "",
        money: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        //获取商品订单号
        //获取商品编号
        //获取订单信息
        wx.request({
            url: `${getApp().data.requestUrl}/goodsInfo/${options.order_id}`,
            success: function(res) {
                if (res.data.code == 200) {
                    that.setData({
                        pay: res.data.res,
                    })
                }
            }
        })
        //获取商品信息
        wx.request({
            url: `${getApp().data.requestUrl}/proDes/{ "user_id": ${getApp().data.user_id}, "pro_id": ${options.id} }`,
            success: function(res) {
                if (res.data.code == 200) {
                    that.setData({
                        commodity: res.data.res,
                    })
                }
            }
        })
        //获取当前用户金额
        wx.request({
            url: `${getApp().data.requestUrl}/balance/${getApp().data.user_id}`,
            success: function(res) {
                if (res.data.code == 200) {
                    that.setData({
                        money: res.data.res,
                    })
                }
            }
        })
    },
    //微信支付
    goToPay: function() {
        var that = this;
        var total = that.data.pay.total;
        var code = "";
        wx.login({
            success: function(res) {
                code = res.code;
                wx.showModal({
                    title: '付款',
                    content: "支付金额：" + total + "元",
                    success: function(datas) {
                        if (datas.confirm) {
                            wx.request({
                                url: `${getApp().data.requestUrl}/wxpay`,
                                header: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                method: "POST",
                                data: {
                                    "code": code,
                                    "total": total,
                                    "content": that.data.commodity.title,
                                    "number": that.data.pay.number,
                                },
                                success: function(res) {
                                    var testData = res.data
                                    console.log(testData);
                                    testData = testData.split("xml>").pop();
                                    var array = JSON.parse(testData);
                                    if (array) {
                                        wx.requestPayment({
                                            'timeStamp': array.timeStamp,
                                            'nonceStr': array.nonceStr,
                                            'package': array.package,
                                            'signType': array.signType,
                                            'paySign': array.paySign,
                                            'success': function(res) {
                                                wx.navigateTo({
                                                    url: '../pay_finsh/pay_finsh',
                                                })
                                            },
                                            'fail': function(res) {
                                                wx.showModal({
                                                    title: '支付失败',
                                                })
                                            }
                                        })
                                    }
                                }
                            })
                        } else if (res.cancel) {

                        }
                    }
                })
            }
        });
    },
    //余额支付
    goToPayFinsh: function() {
        var total = this.data.pay.total;
        var balance = this.data.money.balance;
        var money = this.data.money.money;
        var mun = parseFloat(balance) + parseFloat(money);
        // if (money < 500) {
        //     wx.showModal({
        //         title: '提示',
        //         content: '余额不足500，不能进行购买，请及时充值余额',
        //         success: function(res) {
        //             if (res.confirm) {
        //             } else {
        //             }
        //         }
        //     })
        // }
        if (total > mun) {
            wx.showModal({
                title: '提示',
                content: '余额不足,请充值',
                success: function(res) {
                    if (res.confirm) {
                    } else {
                    }
                }
            })
        } else {
            var order_id = this.data.pay.id;
            wx.showModal({
                title: '付款',
                content: "支付金额：" + total + "元",
                success: function(res) {
                    if (res.confirm) {
                        wx.request({
                            url: `${getApp().data.requestUrl}/pay/${order_id}`,
                            success: function(res) {
                                if (res.data.code == 200) {
                                    wx.navigateTo({
                                        url: '../pay_finsh/pay_finsh',
                                    })
                                }
                            }
                        })
                    } else if (res.cancel) {

                    }
                }
            })
        }
    }
})