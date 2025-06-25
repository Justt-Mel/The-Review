const pg = reqire('pg')
const client = new pg.Client( process.env.DATABASE_URL||'postgres://artma:postgres@localhost/review_site_db'
);

module.exports = client;