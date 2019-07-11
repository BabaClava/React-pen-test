"use strict";

const HttpError = require("../utils/HttpError")
    , config = require("../config")
	, db = require("../db")
    , Serializer = require("../lib/Serializer");

const REQ_DEFAULT = config.db.reqDefault,
    REQ_MAX = config.reqMax;

const users = client => {
    if (client.req.method !== "GET") HttpError(client.res, 405, "Method Not Allowed. Allow: GET.");

    // const headers = {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    //     "Access-Control-Max-Age": 2592000, // 30 days
    //     /** add other headers as per requirement */
    // };

    let count = client.req.params.query.count || REQ_DEFAULT;
    count = Number(count);
    if (count < 0) count = REQ_DEFAULT;
    else if (count > REQ_MAX) count = REQ_MAX;
    let page = client.req.params.query.page || 1;
    page = Number(page);
    if (page <= 0) page = 1;

    if (isNaN(count) || isNaN(page)) {
        HttpError(client.res, 400, "page & count must be a number");
        return;
    }
    const col = db.getClient().db("usersdb").collection("users");

    const skip = (page - 1) * count;
    const limit = count;
    col.aggregate([
        {
            $match: {}
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
                            followed: 1
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
        .then(result => {
            Serializer(result[0], client);
        })
        .catch(err => console.error(err));
};

module.exports = users;
