// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    onGotUserInfo: function() {
        var nickName, avatarUrl, gender;
        wx.getUserInfo({
            success: function(res) {
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
                console.log(res.code)
                if (res.code) {
                    // code存入全局
                    getApp().globalData.code = res.code;
                    // 登录请求
                    wx.request({
                        url: `${getApp().data.requestUrl}/index/`,
                        data:{
                            p_id:"",
                            r_id: "",
                            code: res.code,
                            nick: nickName,
                            avaurl: avatarUrl,
                            sex: gender,
                        },
                        success: function(res) {
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
                                for(var i = 0;i<levelAll.length;i++){
                                    if (levelAll[i].id == level) {
                                        getApp().globalData.levelName = levelAll[i].name;
                                        break;
                                    }
                                }
                                wx.showModal({
                                    title: '',
                                    content: '登入成功',
                                    showCancel: false
                                })
                                wx.redirectTo({
                                    url: "/pages/index"
                                })
                            } else {
                                wx.showModal({
                                    title: '',
                                    content: '失败',
                                    showCancel: false
                                })
                            }
                        }
                    })
                }
            }
        })
    },
    call: function () {
        wx.makePhoneCall({
            phoneNumber: '029-84498995',
            success: function () {
                console.log("拨打电话成功！")
            },
            fail: function () {
                console.log("拨打电话失败！")
            }
        })
    }
})