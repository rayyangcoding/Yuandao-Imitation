Page({
  data: {
    hello: "Hi",
  },
  onLoad: function (e) {
    wx.cloud
      .callFunction({
        name: "quickstartFunctions",
        data: {
          type: "getManyGroup",
        },
      })
      .then((res) => {
        this.setData({
          groypList: res.result.groupList,
        });
      });
  },
});
