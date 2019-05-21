// pages/commodity/commodity.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        datas: "",
        imgUrlData: getApp().data.imgUrl
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        //获取商品信息
        wx.request({
            url: `${getApp().data.requestUrl}/proDes/{ "user_id": ${getApp().data.user_id}, "pro_id": ${options.id} }`,
            success: function(res) {
                if (res.data.code == 200) {
                    that.setData({
                        datas: res.data.res,
                    })
                }
            }
        })
    },
    pay: function(e) {
        var id = e.target.dataset.id;
        wx.navigateTo({
            url: 'order/order?id=' + id,
        })
    },
    autoImage: function(e) {
        var that = this;
        // 获取图片的狂傲
        var imgW = e.detail.width;
        var imgH = e.detail.height;
        // 计算图片比例
        var imgScale = imgW / imgH;

        // 声明自适应宽高变量
        var autoW = "";
        var autoH = "";
        // 获取屏幕宽度，并将图片设置为屏幕等宽
        wx.getSystemInfo({
            success: function(res) {
                autoW = res.windowWidth;
                autoH = autoW / imgScale;
                that.setData({
                    autoW: autoW,
                    autoH: autoH
                })
            },
        })

    }
})