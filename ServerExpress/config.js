module.exports = {
    port: 3002,
    static: 'Public',
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
    avatar: {
        maxFileSize: 10*1024*1024,  //in byte
        path: 'uploads', // relative to the static dir
        photoSizes: [100, 300], // in px
    },
    captcha: {
        sitekey: "6Lf3ucUUAAAAAAK3EZqH5Cbj4HVRNSf1VTS6uOLo",
        secret: "6Lf3ucUUAAAAAOqbIGEKYw33Y-_-_36dNk1eFfsz"
    }
}
