const express = require('express')
const app = express.Router()

const {
    fetchUsers,
    createUser
}= require('../db/users')

const {
    isAdmin,
    isLoggedIn
} = require('./middleware')

app.get ('/', isAdmin, isLoggedIn, async (req, res,next) => {
    try {
        res.send(await fetchUsers())
    } catch (error) {
        next(error)
    }
})

app.post ('/register', async (req, res, next) => {
    try {
        res.send(await createUser(req.body))
    } catch (error) {
        next(error)
    }
})

module.exports = app