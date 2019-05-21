// pages/addAddress/addAddress.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    addressSetUp: function(e) {
        const that = this;
        var userName = e.detail.value.userName;
        var phone = e.detail.value.phone;
        var address = e.detail.value.address;
        wx.request({
            url: `${getApp().data.requestUrl}/address`,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                user_id: getApp().data.user_id,
                name: userName,
                phone: phone,
                address: address,
            },
            success: function (res) {
                if (res.data.code == 200) {
                    wx.redirectTo({
                        url: '../addressList/addressList',
                    })
                }
            }
        })
    },
    //清空内容
    inputReset:function() {
        this.setData({
            listData:{
                userName:"",
                phone:"",
                address:""
            },
        })
    }
})