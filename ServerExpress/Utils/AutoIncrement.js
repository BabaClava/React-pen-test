'use strict'

module.exports = (dbClient, name)  => {
    return dbClient.db('usersdb').collection('counters').findOneAndUpdate(
            {_id: name},
            {$inc: { seq: 1 }},
            {returnOriginal: false }
    ).then(doc => {
        return doc.value.seq
    })
}