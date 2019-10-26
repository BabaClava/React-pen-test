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
            expires: new Date('Fri, 01 Jan 2100 00:00:00 GMT')
        }
    }
}