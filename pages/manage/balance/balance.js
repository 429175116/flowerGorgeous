// pages/manage/balance/balance.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: "",
        price: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.request({
            url: `${getApp().data.requestUrl}/balance/${getApp().data.user_id}`,
            success: function (res) {
                if (res.data.code == 200) {
                    that.setData({
                        list: res.data.res,
                    })
                }
            }
        })
    },
    /**
    * 获取用户输入的提现金额
    */
    moneyInput: function (e) {
        this.setData({
            price: e.detail.value
        })
    },
    //提现
    putForward: function () {
        var that = this;
        var money = that.data.price;
        var balance = that.data.list.balance;
        var total = that.data.list.money
        var num = total + balance;
        var code = "";
        wx.login({
            success: function (res) {
                code = res.code;
                if (money == "") {
                    wx.showModal({
                        title: '请输入金额',
                        duration: 2000
                    })
                    return;
                } else if (money > num) {
                    wx.showModal({
                        title: '余额不足',
                        duration: 2000
                    })
                }
                else if (money <= num) {
                    var code = "";
                    wx.login({
                        success: function (res) {
                            code = res.code;
                            wx.showModal({
                                title: '提现',
                                content: "提现金额：" + money + "元",
                                success: function (res) {
                                    if (res.confirm) {
                                        wx.request({
                                            url: `${getApp().data.requestUrl}/tiXian/{"code":"${code}","user_id":${getApp().data.user_id},"money":"${money}"}`,
                                            success: function (res) {
                                                console.log(res);
                                                if (res.data.code == 200) {
                                                    console.log(1)
                                                    that.onLoad();
                                                }
                                            }
                                        })
                                    } else if (res.cancel) {

                                    }
                                }
                            })
                        }
                    });
                }
            }
        });
    },
    //充值
    recharge: function () {
        var that = this;
        var money = that.data.price;
        var balance = that.data.list.balance;
        var code = "";
        wx.login({
            success: function (res) {
                code = res.code;
                if (getApp().data.formalUser == 1) {
                    wx.showModal({
                        content: '您还不是该产品代理，请联系上级代理'
                    })
                    return;
                }
                if (money == "") {
                    wx.showModal({
                        title: '请输入金额',
                        duration: 2000
                    })
                    return;
                } else {
                    wx.showModal({
                        title: '充值',
                        content: "充值金额：" + money + "元",
                        success: function (datas) {
                            if (datas.confirm) {
                                wx.request({
                                    url: `${getApp().data.requestUrl}/wxchong`,
                                    header: {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                    method: "POST",
                                    data: {
                                        "user_id": getApp().data.user_id,
                                        "code": code,
                                        "total": money,
                                    },
                                    success: function (res) {
                                        var testData = res.data
                                        testData = testData.split("xml>").pop();
                                        var array = JSON.parse(testData);
                                        if (array) {
                                            wx.requestPayment({
                                                'timeStamp': array.timeStamp,
                                                'nonceStr': array.nonceStr,
                                                'package': array.package,
                                                'signType': array.signType,
                                                'paySign': array.paySign,
                                                'success': function (res) {
                                                    wx.navigateTo({
                                                        url: '../pay_finsh/pay_finsh',
                                                    })
                                                    console.log("支付成功");
                                                },
                                                'fail': function (res) {
                                                    wx.showModal({
                                                        title: '',
                                                        content: '失败',
                                                        showCancel: false
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
            }
        });
    },
    clearMoney: function () {
        this.setData({
            price: ""
        })
    }
})