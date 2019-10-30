'use strict'

module.exports = ({dbClient, user, params:{id}}) => {
    return dbClient.db('usersdb').collection('users').updateOne({userId: user.userId},
        {
            $pull: {'followed': id}
        })
}