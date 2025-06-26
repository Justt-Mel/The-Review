const express = require('express')
const app = express.Router()

app.use('/users', require('./users'))
app.use('/tech', require('./tech'))
app.use('/review', require('./review'))
app.use('/authentication', require('./authentication'))

module.exports = app