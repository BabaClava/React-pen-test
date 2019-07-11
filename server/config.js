const config = {
    port: 3002,
    static: '/public',
    db: {
        url: "mongodb://localhost:27017/",
        reqDefault: 10,
        reqMax: 100
    }
}

module.exports = config;