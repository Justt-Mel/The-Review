const express = require("express")
const app = express.Router()

app.use('/users', require('./users'))
app.use('/tech', require('./tech'))
app.use('/review', require('./review'))

module.exports = app