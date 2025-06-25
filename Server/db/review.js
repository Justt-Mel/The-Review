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

const fecthReviews =async (techid) => {
    const SQL = `
    SELECT * 
    FROM reviews
    WHERE tech_id = $1
    `
    const response = await client.query(SQL,[techid])
    return response.rows
    
}

const deleteReviews = async (review) => {
    const SQL = `
    DELETE from reviews  
    WHERE id $1 and user_id = $2 
    `
    await client.query(SQL, [review.id, review.user_id])
}

module.exports = {
    createReview,
    fecthReviews,
    deleteReviews
}