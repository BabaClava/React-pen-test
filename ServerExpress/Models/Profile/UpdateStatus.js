'use strict'

module.exports = ({body:{status}, dbClient, user}) => {
    return dbClient.db("usersdb").collection("users")
        .updateOne(
            {userId: user.userId}, 
            {
                $set: {'status': status}
            })
}