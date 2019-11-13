module.exports = {
    environment: 'dev',
    database: {
        dbName: 'blog_test',
        host: 'localhost',
        port: 5432,
        user: 'simon',
        password: ''
    },
    security: {
        secretKey: "secretKey",
        // 过期时间 1小时
        expiresIn: 60 * 60
    },
    wx: {
        appId: '',
        appSecret: '',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
    qiniu: {
        accessKey: 'hn9xExgpNGQ96OLfzrpPizqCjwODMGikpysjNx4z',
        secretKey: 'JNaLKT6b_ad6X5wUxoB8zVOg0RWX3qmoZKhAIlQu',
        scope: 'tripflow',
    }
}
