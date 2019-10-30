'use strict'

module.exports = ({params:{id}, dbClient}) => {
    return dbClient.db("usersdb").collection("users")
        .findOne({userId: id})
        .then(user => {
            return user && user.status || ''
        })
}