Page({
    data: {
       date: "",
       region: "",
    },
    submit: function (e) {
        let u = e.detail.value;
        wx.cloud.callFunction({
                name: "quickstartFunctions",
                data: {
                    type: "createGroup",
                    data: {
                        ...u,
                        age: new Date().getFullYear,
                        region: this.data.region,
                    }, 
                },
       }).then((res) => {
        console.log(res);
       });
    },
    dateChange: function (e) {
        this.setData({
            date: e.detail.value,
        });
    },
    regionChange: function (e) {
        this.setData({
            region: e.detail.value,
        });
    },
});