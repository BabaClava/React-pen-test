"use strict";

const HttpError = require("../utils/HttpError")
    , config = require("../config")
	, db = require("../db")
    , Serializer = require("../lib/Serializer")
    , Cookie = require('../utils/Cookie');

const REQ_DEFAULT = config.db.reqDefault,
    REQ_MAX = config.reqMax;

const users = client => {
    if (client.req.method !== "GET") {
        HttpError(client.res, 405, "Method Not Allowed. Allow: GET.");
        return;
    }

    const cookie = new Cookie(client);
    const sid = cookie.get()['sid'];
    if (!sid) {
        HttpError(client.res, 401, "Access denied");
        return;
    }

    const col = db.getClient().db("usersdb").collection("users");
    col.findOne({'sid': sid})
        .then(user => {
            if (!user) {
                HttpError(client.res, 401, "Access denied");
                return Promise.reject('not authorized user')
            } else {
                return user;
            }
        })
        .then(user => {
            let count = client.req.params.query.count || REQ_DEFAULT;
            count = Number(count);
            if (count < 0) count = REQ_DEFAULT;
            else if (count > REQ_MAX) count = REQ_MAX;
            let page = client.req.params.query.page || 1;
            page = Number(page);
            if (page <= 0) page = 1;

            if (isNaN(count) || isNaN(page)) {
                HttpError(client.res, 400, "page & count must be a number");
                return Promise.reject('Bad request')
            }

            const skip = (page - 1) * count;
            const limit = count;
            return col.aggregate([
                {
                    $match: {
                        'userId': {$ne: user.userId}
                    }
                },
                {
                    $sort: {
                        userId: -1
                    }
                },
                {
                    $facet: {
                        stage1: [
                            {
                                $skip: skip
                            },
                            {
                                $limit: limit
                            },
                            {
                                $project: {
                                    _id: 0,
                                    name: "$fullName",
                                    id: "$userId",
                                    uniqueUrlName: 1,
                                    photos: 1,
                                    status: 1,
                                    followed: {
                                        $in : ['$userId', user.followed]
                                    }
                                }
                            }
                        ],
                        stage2: [
                            {
                                $count: "count"
                            }
                        ]
                    }
                },
                {
                    $unwind: "$stage2"
                },
                {
                    $project: {
                        items: "$stage1",
                        totalCount: "$stage2.count"
                    }
                }
            ])
            .toArray()
        })
        .then(result => {
            Serializer(result[0], client);
        })
        .catch(err => console.error(err));
};

module.exports = users;
