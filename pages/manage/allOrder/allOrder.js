// pages/myOrder/myOrder.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderList: "",
        status: "",
        id: "",
        hiddenmodalput: true,
        imgUrl:getApp().data.imgUrl
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        //获取信息
        wx.request({
            url: `${getApp().data.requestUrl}/orderTeam/${getApp().data.user_id}`,
            success: function (res) {
                console.log(res)
                if (res.data.code == 200) {
                    that.setData({
                        orderList: res.data.res,
                    })
                    var i = 0;
                    var array = that.data.orderList;
                    console.log("123" + array)
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
        console.log(id);
        this.setData({
            hiddenmodalput: !this.data.hiddenmodalput,
            id: id
        })
    },
    //关闭弹框并不通过此订单 
    cancel: function () {
        var id = this.data.id;
        //   wx.request({
        //       url: `http://www.fen.com/confirmAgentd/id`,
        //       success: function (res) {
        //           if (res.code == 200) {
        //               that.setData({
        //                   listData: res.res,
        //               })
        //           }
        //       }
        //   })
        this.setData({
            hiddenmodalput: true
        });
    },
    //关闭弹框并通过此订单
    confirm: function () {
        var id = this.data.id;
        //   wx.request({
        //       url: `http://www.fen.com/confirmAgentd/id`,
        //       success: function (res) {
        //           if (res.code == 200) {
        //               that.setData({
        //                   listData: res.res,
        //               })
        //           }
        //       }
        //   })
        this.setData({
            hiddenmodalput: true
        })
    }
})