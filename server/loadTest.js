const autocannon = require('autocannon')

autocannon({
  url: 'http://localhost:3002/api/users?count=2&page=3',
  connections: 1000, //default
  pipelining: 1, // default
  duration: 10 // default
}, console.log)