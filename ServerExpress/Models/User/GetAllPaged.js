'use strict'

const config = require('../../config')
    , HttpError = require('../../Errors/HttpError');

const REQ_DEFAULT = config.db.reqDefault
    , REQ_MAX = config.reqMax;

    
module.exports = (req) => {
    let count = req.query.count || REQ_DEFAULT;
    count = Number(count);
    if (count < 0) count = REQ_DEFAULT;
    else if (count > REQ_MAX) count = REQ_MAX;
    let page = req.query.page || 1;
    page = Number(page);
    if (page <= 0) page = 1;

    if (isNaN(count) || isNaN(page)) throw new HttpError("page & count must be a number");

    const skip = (page - 1) * count;
    const limit = count;
    const col = req.dbClient.db("usersdb").collection("users");
    return col.aggregate([
        {
            $match: {
                'userId': {$ne: req.user.userId}
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
                                $in : ['$userId', req.user.followed]
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
    .then(result => result[0])
}