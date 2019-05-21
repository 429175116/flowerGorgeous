// pages/user/myInfo/myInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        listData: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        wx.request({
            url: `${getApp().data.requestUrl}/infoperson/${getApp().data.user_id}`,
            success: function(res) {
                if (res.data.code == 200) {
                    that.setData({
                        listData: res.data.res,
                    })
                }
            }
        })
    },
    onTabsItemTap: function (e) {
        var that = this;
        var userName = e.detail.value.username;
        var idcode = e.detail.value.idcode;
        var weicode = e.detail.value.weicode;
        var phone = e.detail.value.phone;
        if (userName == "" || idcode == "" || weicode == "" || phone == "") {
            wx.showModal({
                content: '请完善信息',
                showCancel: false
            })
            return
        }
        wx.request({
            url: `${getApp().data.requestUrl}/editinfo/`,
            method: "POST",
            data: {
                username: userName,
                idcode: idcode,
                weicode: weicode,
                phone: phone,
                user_id: getApp().data.user_id
            },
            success: function (res) {
                // 将用户ID存入本地
                if (res.data.code == 200) {
                    wx.showModal({
                        title: '',
                        content: '修改成功',
                        showCancel: false
                    })
                    setTimeout(function () {
                        wx.redirectTo({
                            url: "/pages/user/user"
                        })
                    }, 2000)
                } else {
                    wx.showModal({
                        title: '',
                        content: '修改失败',
                        showCancel: false
                    })
                }
            }
        })
    }
})