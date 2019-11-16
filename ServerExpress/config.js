module.exports = {
    port: 3002,
    static: '/public',
    db: {
        url: "mongodb://localhost:27017/usersdb",
        reqDefault: 10,
        reqMax: 100
    },
    pwdSecret: 'i love js',
    session: {
        secret: 'js is cool',
        cookie: {
            path: '/',
            domain: 'localhost',
        }
    },
    photoMaxSize: 1*1024*1024,  //in byte
}