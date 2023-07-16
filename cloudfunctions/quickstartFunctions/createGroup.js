const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_EW,
});

// 获取默认环境的数据库的引用
const db = cloud.database();

module.exports = async (event) => {
    let u = event.data;
    // userId? 小程序提供了openid
    let wxContext = cloud.getWXContext();
    let openId = wxContext.OPENID;
    // 想要递增小组id怎么办 
    let res = await db.collection("test-group").count();
    let groupId = parseInt(res.total) + 1;
    
    await db.collection("test-group").add({
        data: {
            leader: u.nickname,
            region: u.region,
            code: u.code,
            age: u.age,
            info: u.info,
            member: 1,
            openId,
            groupId,
        },
    });
    await db.collection("test-form").add({
        data: {
            nickname: u.nickname,
            gender: u.gender === "other",
            region: u.region,
            code: u.code,
            age: u.age,
            info: u.info,
            isLeader: true,
            openId,
            groupId,
        },
    });
    return {
        success: true,
        groupId,
    };
};