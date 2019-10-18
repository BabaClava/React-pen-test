'use strict'

const MongoClient = require('mongodb').MongoClient
    , config = require('../config');

const MONGO_URL = config.db.url;

let _client = null;

exports.connect = (done) => {
    if (_client) {
        return done();
    }
    const mongoClient = new MongoClient(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    mongoClient.connect((err, client) => {
        if (err) {
            return done(err)
        }
        _client = client;
        done();
    })

exports.get = () => {
        return _client;
    }
}