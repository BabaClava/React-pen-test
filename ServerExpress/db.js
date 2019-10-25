'use strict'

const MongoClient = require('mongodb').MongoClient
    , config = require('./config');

const MONGO_URL = config.db.url;

let _client = null;

exports.get = () => {
    if (_client) {
        return Promise.resolve(_client);
    } else {
        const mongoClient = new MongoClient(MONGO_URL, {useNewUrlParser: true, 
                                                        useUnifiedTopology: true,
                                                        serverSelectionTimeoutMS: 5000});
        return new Promise((resolve, reject) => {
            mongoClient.connect((err, client) => {
                if (err) {
                    reject(err)
                } else {
                    _client = client;
                    resolve(client)
                }
            })
        })
    }
}
exports.close = () => {
    if (_client) _client.close()
}