// pages/registered/registered.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userName: "",
        show:"block"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 判断从二维码中是否获得数据----此处用于过去上级代理的信息及自己的代理级别
        // 暂无二维码，后期完善
        var that = this;
        if (options.scene !== undefined) {
            var farInfo = decodeURIComponent(options.scene);
            farInfo = farInfo.split("&");
            var fatherId = farInfo[0];
            var level = farInfo[1];
            var sonId = farInfo[2];
            getApp().data.fatherId = fatherId;      
            getApp().data.levelss = level;
            getApp().data.sonId = sonId;
        }
        if (getApp().globalData.code) {
            that.setData({
                show: "none"
            })
        }
    },
    searchBox: function() {
        // const that = this;
        // let first, second;
        // that.setData({
        //     username: e.detail.value.username,
        //     // second: e.detail.value.pwd
        // })
    },
    onGotUserInfo: function() {
        var that = this;
        var nickName, avatarUrl, gender;
        wx.getUserInfo({
            success: function (res) {
                getApp().globalData.nickName = res.userInfo.nickName;
                getApp().globalData.avatarUrl = res.userInfo.avatarUrl;
                getApp().globalData.gender = res.userInfo.gender;
                // getApp().globalData.nickName = res.userInfo.nickName
                // getApp().globalData.avatarUrl = res.userInfo.avatarUrl
                // gender = res.userInfo.gender
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
                                    nick: getApp().globalData.nickName,
                                    avaurl: getApp().globalData.avatarUrl,
                                    sex: getApp().globalData.gender,
                                },
                                success: function (res) {
                                    // 将用户ID存入本地
                                    if (res.data.code == 200) {
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
                                        if (getApp().globalData.code) {
                                            that.setData({
                                                show: "none"
                                            })
                                        }
                                    }
                                }
                            })
                        }
                    }
                })
            }
        })
    },
    onTabsItemTap: function(e) {
        var that = this;
        that.onGotUserInfo();
        // 获取登录时的code
        wx.login({
            success: res => {
                var code = res.code;
                var pid = getApp().data.fatherId;     //上级id
                var agent_id = getApp().data.levelss;   //代理角色id
                var sex = "0";
                // if (!code) {
                if (!getApp().globalData.nickName) {
                    // 
                    wx.showModal({
                        content: '请授权',
                        showCancel: false
                    })
                    return
                }
                const that = this;
                if (getApp().globalData.code) {
                    that.setData({
                        show: "none"
                    })

                }
                var userName = e.detail.value.userName;
                var userTel = e.detail.value.userTel;
                var userWxId = e.detail.value.userWxId;
                var userLicenseNumber = e.detail.value.userLicenseNumber;
                var userAddress = e.detail.value.userAddress;
                if (userName == "" || userTel == "" || userWxId == "" || userLicenseNumber == "" || userAddress == "") {
                    wx.showModal({
                        content: '请完善信息',
                        showCancel: false
                    })
                    return
                }

                wx.request({
                    url: `${getApp().data.requestUrl}/insertAgent/`,
                    method: "POST",
                    data: {
                        username: userName,
                        idcode: userLicenseNumber,
                        weicode: userWxId,
                        phone: userTel,
                        code: code,
                        address: userAddress,
                        sex: sex,
                        agent_id: agent_id,
                        pid: pid
                    },
                    success: function (res) {
                        // 将用户ID存入本地
                        if (res.data.code == 200) {
                            getApp().data.user_id = res.data.res.user_id;
                            wx.showModal({
                                title: '',
                                content: '资料提交成功，等待上级分销商审核',
                                showCancel: false
                            })
                            wx.redirectTo({
                                url: "/pages/index"
                            })
                        } else {
                            wx.showModal({
                                title: '',
                                content: '资料提交失败',
                                showCancel: false
                            })
                        }
                    }
                })
            }
        })
        
    },
    reset: function() {
        this.setData({
            userName: "",
            userTel: "",
            userWxId: "",
            userLicenseNumber: "",
            userAddress: ""
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
    }
})