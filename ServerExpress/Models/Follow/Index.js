'use strict'

exports.followUser = ({dbClient, user, params:{id}}) => {
    return dbClient.db('usersdb').collection('users').updateOne({userId: user.userId}, 
        {
            $push: {'followed': id}
        })
}

exports.unfollowUser = ({dbClient, user, params:{id}}) => {
    return dbClient.db('usersdb').collection('users').updateOne({userId: user.userId},
        {
            $pull: {'followed': id}
        })
}