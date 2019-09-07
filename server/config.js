const config = {
    port: 3002,
    static: '/public',
    db: {
        url: "mongodb://localhost:27017/",
        reqDefault: 10,
        reqMax: 100
    },
    secret: 'i love js',
    cookieOptions: {
        path: '/',
        domain: 'localhost',
        // expires: 'Fri, 01 Jan 2100 00:00:00 GMT'
    }
}

module.exports = config;