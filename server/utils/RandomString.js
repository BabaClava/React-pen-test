'use strict'

const RandomString = () => {
    return Math.random().toString(32).slice(2)
}
module.exports = RandomString;