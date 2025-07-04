const {
    client,
    seed
} = require('./db');

const express = require('express');
const app = express();
app.use('/api', require('./api'))

const init = async () => {
    const PORT = process.env.PORT || 3000;
    await client.connect();
    if(process.env.SYNC) {
     await seed();
   }
    console.log('connected to database')
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
}

init();