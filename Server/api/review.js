const express = require('express')
const app = express.Router()

const {
createReview,
fetchReviews,
deleteReview
}= require('../db/review')

const{
isAdmin,
isLoggedIn
} = require('./middleware')

app.get('/',isLoggedIn, async (req, res,next) => {
   try {
     res.send(await fetchReviews())
   } catch (error) {
    next(error)
   }
})

app.post('/',isLoggedIn, async (req, res, next) => {
    try {
        res.send(await createReview(req.body))
    } catch (error) {
        next(error)
    }
})

app.delete('/:review_id/user/:user_id', isLoggedIn, async (req, res, next) => {
    try {
        await deleteReview({id: req.params.review_id, user_id: req.params.user_id })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

module.exports = app 