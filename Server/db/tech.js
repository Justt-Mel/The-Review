const client = require('./client')
const {v4} = require('uuid')
const uuidv4 = v4

const createTech = async (tech) => {
    const SQL = `
    INSERT INTO tech (id, tech_name)
    VALUES ($1,$2)
    RETURNING *
    `
    const response = await client.query(SQL, [uuidv4(), tech.tech_name])
    return response.rows[0]
}

const fetchTech = async ()=> {
    const SQL =`
    SELECT *
    FROM tech
    `
    const response = await client.query(SQL)
    return response.rows
}

module.exports = {
    createTech,
    fetchTech
}