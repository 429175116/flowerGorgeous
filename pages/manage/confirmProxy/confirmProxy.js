// pages/manage/confirmProxy/confirmProxy.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:"",
        hiddenmodalput: true,
        hiddenmodalputs: true,
        id:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.request({
            url: `${getApp().data.requestUrl}/confirmAgentd/${getApp().data.user_id}`,
            success: function (res) {
                if (res.data.code == 200 || res.data.code == 404) {
                    that.setData({
                        list: res.data.res,
                    })
                }
            }
        })
    },
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
    //关闭弹框并通过此人
    confirm: function () {
        var that = this;
        var id = this.data.id;
        wx.request({
            url: `${getApp().data.requestUrl}/pass/{"user_id":${getApp().data.user_id},"auditing_id":${id}}`,
            success: function (res) {
                if (res.data.code == 200) {
                    that.setData({
                        hiddenmodalput: true
                    })
                    that.onLoad();
                }
            }
        })  
    }, 
    toExamines: function (e) {
        var id = e.target.dataset.id;
        this.setData({
            hiddenmodalputs: !this.data.hiddenmodalputs,
            id: id
        })
    },
    //关闭弹框
    cancels: function () {
        this.setData({
            hiddenmodalputs: true
        })
    },
    //关闭弹框并不通过此人
    confirms: function () {
        var that = this;
        var id = this.data.id;
        wx.request({
            url: `${getApp().data.requestUrl}/out/${id}`,
            success: function (res) {
                if (res.data.code == 200) {
                    that.setData({
                        hiddenmodalputs: true
                    })
                }
            }
        })  
    }
})