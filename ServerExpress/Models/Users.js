const client = require('./db')

function col() {
    client.get().db('usersdb').collection('users')
}

exports.findUser = (fullName) => {
    return col().findOne({fullName: fullName});
}