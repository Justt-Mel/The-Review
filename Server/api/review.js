const express = require('express')
const app = express.Router()

const {
createReview,
fetchReviews,
deleteReview
}= require('../db/review')

app.get('/', async (req, res,next) => {
   try {
     res.send(await fetchReviews(req.tech.id))
   } catch (error) {
    next(error)
   }
})

app.post('/', async (req, res, next) => {
    try {
        res.send(await createReview(req.body))
    } catch (error) {
        next(error)
    }
})

app.delete('/:review_id/user/:user_id', async (req, res, next) => {
    try {
        await deleteReview({id: req.params.review_id, user_id: req.params.user_id })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})