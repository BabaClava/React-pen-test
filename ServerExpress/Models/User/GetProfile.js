'use strict'

module.exports = ({params:{id}, dbClient}) => {
    return dbClient.db('usersdb').collection('users')
        .aggregate([
            {
                $match: {
                    'userId': id
                }
            },
            {
                $project: {
                    _id: 0,
                    password: 0
                }
            }
        ])
        .toArray()
        .then(user => user[0])
}