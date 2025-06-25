const client = require(".client")

const seed = async () =>{
    const SQL = `
    DROP TABLE IF EXISTS review;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS tech;

    CREATE TABLE users(
    id UUID PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    is_admin DEFUALT false NOT NULL
    );

    CREATE TABLE tech(
    id UUID PRIMARY KEY,
    tech_name VARCHAR(100)UNIQUE,
    );

    CREATE TABLE review(
    id UUID PRIMARY KEY
    user_id UUID REFERENCES users(id) NOT NULL,
    tech_id UUID REFERENCES tech(id) NOT NULL,
    created_at TIMESTAMP DEFUALT now() NOT NULL,
    updated_at TIMESTAP DEFUALT now(),
    CONSTRAINT user_and_tech_id UNIQUE(user_id,tech_id)
    );
    `
    await client.query(SQL)

}

module.exports ={
    client,
    seed
}