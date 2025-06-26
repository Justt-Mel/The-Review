const client = require('./client')
const {v4} = require('uuid')
const uuidv4 = v4

const createReview = async (review) => {
    const SQL = `
    INSERT INTO review(id, user_id, tech_id)
    VALUES ($1,$2,$3)
    RETURNING *
    `
    const response = await client.query(SQL, [uuidv4(),review.user_id,review.tech_id])
    return response.rows[0]
}

const fetchReviews = async () => {
    const SQL = `
    SELECT * 
    FROM review
    `

    const response = await client.query(SQL)
    return response.rows
}

const deleteReview = async (review) => {
    const SQL = `
    DELETE from review
    WHERE id = $1 and user_id = $2 
    RETURNING *
    `
    await client.query(SQL, [review.id, review.user_id])
}

module.exports = {
    createReview,
    fetchReviews,
    deleteReview
}