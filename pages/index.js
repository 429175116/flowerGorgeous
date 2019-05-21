// pages/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        datas: "",
        imgUrlData: getApp().data.imgUrl,
        show:"block"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that=this;
        
        var nickName, avatarUrl, gender;
        wx.getUserInfo({
            success: function (res) {
                getApp().globalData.nickName = res.userInfo.nickName;
                getApp().globalData.avatarUrl = res.userInfo.avatarUrl;
                getApp().globalData.gender = res.userInfo.gender;
                nickName = res.userInfo.nickName
                avatarUrl = res.userInfo.avatarUrl
                gender = res.userInfo.gender
                if (nickName) {
                    if (getApp().globalData.code) {
                        that.setData({
                            show: "none"
                        })
                    }
                    that.onGotUserInfo();
                    return;
                }
            }
        })
        //获取商品列表
        wx.request({
            url: `${getApp().data.requestUrl}/proList/${getApp().data.user_id}`,
            success: function (res) {
                if (res.data.code == 200) {
                    var datalist = res.data.res;
                    for (let i = 0; i < datalist.length; i++) {
                        datalist[i].price = datalist[i].price.toFixed(2);
                    }
                    that.setData({
                        datas: res.data.res,
                    })
                }
            }
        })
        wx.request({
            url: `${getApp().data.requestUrl}/infoperson/${getApp().data.user_id}`,
            success: function (res) {
                if (res.data.code == 200) {
                    getApp().globalData.levelName = res.data.res.name;
                    getApp().globalData.static = res.data.res.static;
                }
            }
        })
        
        
        
    }, 
    onGotUserInfo: function () {
        var that = this;
        var nickName, avatarUrl, gender;
        wx.getUserInfo({
            success: function (res) {
                getApp().globalData.nickName = res.userInfo.nickName;
                getApp().globalData.avatarUrl = res.userInfo.avatarUrl;
                getApp().globalData.gender = res.userInfo.gender;
                nickName = res.userInfo.nickName
                avatarUrl = res.userInfo.avatarUrl
                gender = res.userInfo.gender
            }
        })

        wx.login({
            success: res => {
                if (res.code) {
                    // code存入全局
                    getApp().globalData.code = res.code;
                    // 登录请求
                    wx.request({
                        url: `${getApp().data.requestUrl}/index/`,
                        data: {
                            p_id: "",
                            r_id: "",
                            code: res.code,
                            nick: nickName,
                            avaurl: avatarUrl,
                            sex: gender,
                        },
                        success: function (res) {
                            // 将用户ID存入本地
                            if (res.data.code == 200) {
                                if (getApp().globalData.code) {
                                    that.setData({
                                        show: "none"
                                    })
                                }
                                // index为2 表示扫码进入
                                // userId存入全局变量
                                getApp().globalData.user_id = res.data.res.user_id;
                                getApp().data.user_id = res.data.res.user_id;
                                // pId为父级用户ID，rId为当前用户级别
                                getApp().data.p_id = res.data.res.p_id;
                                getApp().data.level = res.data.res.r_id;
                                getApp().data.levelData = res.data.res.agent;
                                getApp().data.formalUser = res.data.res.index;
                                var level = getApp().data.level;
                                var levelAll = getApp().data.levelData;
                                for (var i = 0; i < levelAll.length; i++) {
                                    if (levelAll[i].id == level) {
                                        getApp().globalData.levelName = levelAll[i].name;
                                        break;
                                    }
                                }
                                //获取商品列表
                                wx.request({
                                    url: `${getApp().data.requestUrl}/proList/${getApp().data.user_id}`,
                                    success: function (res) {
                                        if (res.data.code == 200) {
                                            var datalist = res.data.res;
                                            for (let i = 0; i < datalist.length; i++) {
                                                datalist[i].price = datalist[i].price.toFixed(2);
                                            }
                                            that.setData({
                                                datas: res.data.res,
                                            })
                                        }
                                    }
                                })
                                wx.request({
                                    url: `${getApp().data.requestUrl}/infoperson/${getApp().data.user_id}`,
                                    success: function (res) {
                                        if (res.data.code == 200) {
                                            getApp().globalData.levelName = res.data.res.name;
                                            getApp().globalData.static = res.data.res.static;
                                        }
                                    }
                                })
                            } else {
                                // wx.showModal({
                                //     title: '',
                                //     content: '失败',
                                //     showCancel: false
                                // })
                            }
                        }
                    })
                }
            }
        })
    },
    goCommodity: function(e) {
        if (!getApp().data.user_id) {
            wx.showModal({
                title: '',
                content: '请授权',
                showCancel: false
            })
            return;
        }
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: `/pages/commodity/commodity?id=${id}`
        })
    },
    goIndex: function () {
        if (!getApp().data.user_id) {
            wx.showModal({
                title: '',
                content: '请授权',
                showCancel: false
            })
            return;
        }
        wx.redirectTo({
            url: "/pages/index"
        })
    },
    goManage: function () {
        if (!getApp().data.user_id) {
            wx.showModal({
                title: '',
                content: '请授权',
                showCancel: false
            })
            return;
        }
        wx.redirectTo({
            url: "/pages/manage/manage"
        })
    },
    goUser: function () {
        if (!getApp().data.user_id) {
            wx.showModal({
                title: '',
                content: '请授权',
                showCancel: false
            })
            return;
        }
        wx.redirectTo({
            url: "/pages/user/user"
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