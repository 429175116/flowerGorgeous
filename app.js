//app.js
App({
    data: {
        // 全局变量，接口请求地址
        //requestUrl: "http://www.fen.com",//线下
		requestUrl: "https://fen.beaconway.cn",//线上
        // 父及分销商
        fatherId: "",
        // 自己的级别
        myLevel: "",
        AppID: "wxfc7a0ffe1fd98ca2",
        AppSecret: "ce1f996b645bd584a1534f6fd17379a9",
        imgUrl:"http://fen.beaconway.cn/uploads/",
        qrcode: "http://fen.beaconway.cn/qrcode/"
    },
    globalData: function(){},
    onLaunch: function() {
        // 展示本地存储能力
        let logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        console.log(logs);
        wx.setStorageSync('logs', logs)
    },
    // 小程序初始化，只执行一次
    onLaunch: function(options) {
    },
    // //分享页面，全局
    // onShareAppMessageRun: function () {
    //     var pages = getCurrentPages() //获取加载的页面
    //     var currentPage = pages[pages.length - 1] //获取当前页面的对象
    //     var url = currentPage.route //当前页面url
    //     var options = currentPage.options //如果要获取url中所带的参数可以查看options
    //     return {
    //         title: this.postData.title,
    //         desc: this.postData.content,
    //         path: url
    //     }
    // },
})