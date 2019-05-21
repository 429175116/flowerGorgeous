// pages/manage/manage.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: "",
        avatar: "",
        levelName: "",
        hidden: "none"
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        // 获取待审核订单数据
        wx.request({
            url: `${getApp().data.requestUrl}/auditingOrderd/${getApp().data.user_id}`,
            success: function (res) {
                if (res.data.code == 200 || res.data.code == 404) {
                    let orderList = res.data.res;
                    if (orderList) {
                        orderList = orderList.length;
                    } else {
                        orderList = 0;
                    }
                    that.setData({
                        orderListLength: orderList,
                    })
                }
            }
        })
        // 获取待确认代理数据
        wx.request({
            url: `${getApp().data.requestUrl}/confirmAgentd/${getApp().data.user_id}`,
            success: function (res) {
                if (res.data.code == 200 || res.data.code == 404) {
                    let confirmAgentd = res.data.res;
                    if (confirmAgentd) {
                        confirmAgentd = confirmAgentd.length;
                    } else {
                        confirmAgentd = 0;
                    }
                    that.setData({
                        confirmAgentdLength: confirmAgentd,
                    })
                }
            }
        })
        this.setData({
            name: getApp().globalData.nickName,
            avatar: getApp().globalData.avatarUrl,
            levelName: getApp().globalData.levelName
        })
    },
    //分享页面
    onShareAppMessage: function () {
        let pages = getCurrentPages() //获取加载的页面
        let currentPage = pages[pages.length - 1] //获取当前页面的对象
        let url = currentPage.route //当前页面url
        return {
            title: this.postData.title,
            desc: this.postData.content,
            path: url
        }
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
    },
    goPerformance: function () {
        wx.navigateTo({
            url: "/pages/manage/performance/performance"
        })
    },
    goBalance: function () {
        wx.navigateTo({
            url: "/pages/manage/balance/balance"
        })
    },
    goAllOrder: function () {
        wx.navigateTo({
            url: "/pages/manage/allOrder/allOrder"
        })
    },
    goStayOrder: function () {
        wx.navigateTo({
            url: "/pages/manage/stayOrder/stayOrder"
        })
    },
    goMyProxy: function () {
        wx.navigateTo({
            url: "/pages/manage/myProxy/myProxy"
        })
    },
    goConfirmProxy: function () {
        wx.navigateTo({
            url: "/pages/manage/confirmProxy/confirmProxy"
        })
    }
    // call: function () {
    //     wx.makePhoneCall({
    //         phoneNumber: '029-84498995',
    //         success: function () {
    //             console.log("拨打电话成功！")
    //         },
    //         fail: function () {
    //             console.log("拨打电话失败！")
    //         }
    //     })
    // }
})