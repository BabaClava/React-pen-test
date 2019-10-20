module.exports = {
    port: 3002,
    static: '/public',
    db: {
        url: "mongodb://localhost:27017/",
        reqDefault: 10,
        reqMax: 100
    },
    pwdSecret: 'i love js',
    session: {
        secret: 'js is cool',
        cookie: {
            path: '/',
            domain: 'localhost',
            expires: 'Fri, 01 Jan 2100 00:00:00 GMT'
        },
        storage: {
            storage: 'mongodb',
            host: 'localhost', // optional
            port: 27017, // optional
            db: 'usersdb', // optional
            collection: 'sessions', // optional
        }
    }
}