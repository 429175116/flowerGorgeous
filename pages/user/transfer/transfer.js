// pages/user/transfer/transfer.js
var res = {
    "mreturnoney": 110,
    "balance": 110
}
Page({
    /**
     * 页面的初始数据
     */
    data: {
        listData: res
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        wx.request({
            url: `${getApp().data.requestUrl}/daiding/${2}`,
            success: function(res) {
                if (res.code == 200) {
                    that.setData({
                        listData: res.res,
                    })
                }
            }
        })
    },
    inputReset: function() {
        this.setData({
            transferAmount: "",
        })
    },
    transferUpdata: function(e) {
        const that = this;
        var transferAmount = e.detail.value.transferAmount;
        wx.showModal({
            title: '',
            content: `转账金额￥${transferAmount},确认转账？`,
            success: function (res) {
                if (res.confirm) {//点击确定
                    console.log('用户点击确定')
                    // wx.request({
                    //     url: `${getApp().data.requestUrl}/detail/${2}`,
                    //     success: function (res) {
                    //         if (res.code == 200) {
                    //             that.setData({
                    //                 listData: res.res,
                    //             })
                    //         }
                    //     }
                    // })
                } else {//点击取消
                    console.log('用户点击取消')
                }
            }
        })
        
    }
})