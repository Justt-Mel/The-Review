const express = require('express')
const app = express.Router()

const {
    fetchTech,
    createTech
}= require('../db/tech')

app.get('/', async (req, res, next) => {
    try {
        res.send(await fetchTech())
    } catch (error) {
        next(error)
    }
})

app.post('/', async (req,res,next) => {
    try {
        res.send(await createTech(req.body))
    } catch (error) {
        next(error)
    }
})

module.exports =  app