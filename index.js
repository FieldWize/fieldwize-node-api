require('babel-register')({
    presets: ['env']
})
module.exports = require('./src/app.js')
