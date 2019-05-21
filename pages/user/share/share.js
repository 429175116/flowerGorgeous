// pages/user/share/share.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index: 0,
        show: "block",
        downloadFile: "none",
        qrcode: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
          qrcode: getApp().data.qrcode
        })
        var that = this;
        console.log(getApp().data.levelData)
        that.setData({
            levelData: getApp().data.levelData
        })
        wx.request({
            url: `${getApp().data.requestUrl}/infoperson/${getApp().data.user_id}`,
            success: function(res) {
                if (res.data.code == 200) {
                    that.setData({
                        userInfo: res.data.res,
                    })
                }
            }
        })
    },
    produceQRCode: function() {
        var that = this;
        var userId = getApp().data.user_id;
        var level = that.data.level;

        var indexData = that.data.index;
        if (getApp().globalData.static != 1) {
            wx.showModal({
                title: '',
                content: '审核未通过，不可分享',
                showCancel: false
            })
            return;
        }
        if (indexData == 0) {
            wx.showModal({
                title: '',
                content: '请选择代理级别',
                showCancel: false
            })
            return;
        } else if (level == 1) {
            wx.showModal({
                title: '',
                content: '无权限生成分享码',
                showCancel: false
            })
            return;
        }
        // 组合scene字符串
        var scene = `${userId}&${level}`;
        console.log(getApp().data.levelData)
        console.log(scene);
        wx.request({
            url: `${getApp().data.requestUrl}/get_qrcode/{"scene":"${scene}"}`,
            method: 'GET',
            success: function(res) {
                // 获取要分享的二维码图，并在页面显示
                let shareQRCode = that.data.qrcode + res.data
                that.setData({
                    shareQRCode: shareQRCode,
                    show: "none",
                    downloadFile: "block"
                })
            }
        })
    },
    // 点击图片放大，长按后可操作
    shareQRCodeImg: function (e) {
      wx.previewImage({
        current: [this.data.shareQRCode], // 当前显示图片的http链接   
        urls: [this.data.shareQRCode] // 需要预览的图片http链接列表   
      })
    },
    saveImgToPhotosAlbumTap: function(e) {
        var imgUrl = this.data.shareQRCode; //图片地址
        console.log(imgUrl);
        wx.getSetting({
            success: function(res) {
                wx.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success: function(res) {
                        console.log("授权成功");
                        wx.downloadFile({ //下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径

                            url: imgUrl,
                            success: function(res) {
                                console.log("123123");
                                console.log(res); // 下载成功后再保存到本地

                                wx.saveImageToPhotosAlbum({
                                    filePath: res.tempFilePath, //返回的临时文件路径，下载后的文件会存储到一个临时文件
                                    success: function(res) {
                                        console.log("123123");
                                    }　
                                })
                            },
                            fail(res) {
                                console.log("fail");
                                console.log(res);
                            }
                        })
                    }
                })
            }
        })
        // //获取临时路径

        //     wx.canvasToTempFilePath({
        //         canvasId: 'share',
        //         success: (res) => {
        //             this.setData({
        //                 shareTempFilePath: res.tempFilePath
        //             })
        //         }
        //     })

        // wx.saveImageToPhotosAlbum({
        //     filePath: this.data.shareQRCode,
        //     success(res) {
        //         console.log("success");
        //     },
        //     fail(res) {
        //         console.log("fail");
        //     }
        // })
        // wx.downloadFile({
        //     url: this.data.shareQRCode,
        //     success: function (res) {
        //         console.log(res);
        //         //图片保存到本地
        //         wx.saveImageToPhotosAlbum({
        //             filePath: res.tempFilePath,
        //             success: function (data) {
        //                 wx.showToast({
        //                     title: '保存成功',
        //                     icon: 'success',
        //                     duration: 2000
        //                 })
        //             },
        //             fail: function (err) {
        //                 console.log(err);
        //                 if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
        //                     console.log("当初用户拒绝，再次发起授权")
        //                     wx.openSetting({
        //                         success(settingdata) {
        //                             console.log(settingdata)
        //                             if (settingdata.authSetting['scope.writePhotosAlbum']) {
        //                                 console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
        //                             } else {
        //                                 console.log('获取权限失败，给出不给权限就无法正常使用的提示')
        //                             }
        //                         }
        //                     })
        //                 }
        //             },
        //             complete(res) {
        //                 console.log(res);
        //             }
        //         })
        //     }
        // })
    },
    levelSelect: function(e) {
        var index = e.detail.value;
        this.setData({
            index: index
        })
        var level = this.data.levelData[index].id;
        this.setData({
            level: level
        })
    }
})