'use strict'

const MongoClient = require('mongodb').MongoClient
    , config = require('./config');

const MONGO_URL = config.db.url;

let _client;
module.exports = {
    connect: () => {
        const mongoClient = new MongoClient(MONGO_URL, {useNewUrlParser: true});
        return new Promise ((resolve, reject) => {
            mongoClient.connect((err, client) => {
                if (err) reject(err);
                else {
                    _client = client;
                    resolve(_client);
                }
            })
        })
    },
    getClient: () => {
        return _client;
    }
}