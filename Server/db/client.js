const pg = reqire('pg')
const client = new pg.Client('postgres://artma:postgres@localhost/review_site_db'
);

module.exports = client;