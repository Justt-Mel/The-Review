const client = require("./client")
const {
    createUser
} = require('./users')
const {
    createTech
} = require('./tech')
const {
    createReview
} = require('./review')


const seed = async () =>{
    const SQL = `
    DROP TABLE IF EXISTS review;
    DROP TABLE IF EXISTS tech;
    DROP TABLE IF EXISTS users;

    CREATE TABLE users(
    id UUID PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    is_admin BOOLEAN DEFAULT false NOT NULL
    );

    CREATE TABLE tech(
    id UUID PRIMARY KEY,
    tech_name VARCHAR(100) UNIQUE
    );

    CREATE TABLE review(
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) NOT NULL,
    tech_id UUID REFERENCES tech(id) NOT NULL,
    created_at TIMESTAMP DEFAULT now() NOT NULL,
    updated_at TIMESTAMP DEFAULT now(),
    CONSTRAINT user_and_tech_id UNIQUE(user_id,tech_id)
    );
    `
    await client.query(SQL)

    const [SonyA7RV, KeyBoard, IPhone] = await Promise.all([
        createTech({tech_name:'SonyA7RV'}),
        createTech({tech_name:'KeyBoard'}),
        createTech({tech_name:'IPhone'})
    ])

    const [Ethan, Matthew, Logan, Justin] = await Promise.all([
        createUser({username: 'Ethan', password: '1119', is_admin:false}),
        createUser({username: 'Matthew', password: '0509', is_admin:false}),
        createUser({username: 'Logan', password: '0517', is_admin:false}),
        createUser({username: 'Justin', password: '0710', is_admin:true})
    ])

    await Promise.all ([
        createReview({user_id: Justin.id, tech_id: SonyA7RV.id})
    ])
console.log('tables created and seeded')
}

module.exports ={
    client,
    seed
}