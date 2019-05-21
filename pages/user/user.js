// pages/user/user.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        name: "",
        avatar: "",
        levelName: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            name: getApp().globalData.nickName,
            avatar: getApp().globalData.avatarUrl,
            levelName: getApp().globalData.levelName
        })
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
    goMyInfo: function () {
        wx.navigateTo({
            url: "/pages/user/myInfo/myInfo",
        })
    },
    goShar: function () {
        wx.navigateTo({
            url: "/pages/user/share/share"
        })
    },
    goBill: function () {
        wx.navigateTo({
            url: "/pages/user/bill/bill"
        })
    },
    goAddressList: function () {
        wx.navigateTo({
            url: "/pages/user/addressList/addressList"
        })
    },
    goMyOrder: function () {
        wx.navigateTo({
            url: "/pages/user/myOrder/myOrder"
        })
    },
    goWarrantInfo: function () {
        wx.navigateTo({
            url: "/pages/user/warrantInfo/warrantInfo"
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