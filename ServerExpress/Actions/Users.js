const client = require('./db').getClient();
const col = client && client.db('usersdb').collections('users'); //??!!
console.log(col);


exports.findUser = () => {
    console.log('findUser');
}