const express = require('express')
const app = express.Router()

const {
    fetchTech,
    createTech,
    getTechById
}= require('../db/tech')

const{
isAdmin,
isLoggedIn
} = require('./middleware')

app.get('/', async (req, res, next) => {
    try {
        res.send(await fetchTech())
    } catch (error) {
        next(error)
    }
})

app.get('/:id', async (req, res, next) => {
    try {
        const tech = await getTechById(req.params.id)
        if (!tech) {
            return res.status(404).json({ error: 'Tech not found' })
        }
        res.send(tech)
    } catch (error) {
        next(error)
    }
})

app.post('/',isLoggedIn, isAdmin, async (req,res,next) => {
    try {
        res.send(await createTech(req.body))
    } catch (error) {
        next(error)
    }
})

module.exports =  app