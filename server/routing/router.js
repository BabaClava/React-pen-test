'use strict'

const getUsers = () => 123

const routing = new Map([
    ['api/users', getUsers()],
    ['api/abc', 234]
]);

console.log(routing);
