const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');

const pg = require('pg');
const Pool = pg.Pool;
const pool = new Pool({
    database: "weekend-to-do-app",
    host: "localhost",
    port: 5432,
    max: 10000000,    // ;)
    idleTimeoutMillis: 30000
});

pool.on('connect', () => {
    console.log('database is good boss');

});

pool.on('error', (error) => {
    console.log(`OH SHIT pool is broken' ${error}`);np

});


//ROUTES
const taskRouter = require('./routers/task.router');

app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// //ROUTES
// app.use('/api/tasks', taskRouter);


app.listen(PORT, () => {
    console.log(pool.query(`SELECT * FROM "tasklist"`));
    console.log(`Server is up on port: ${PORT}`);
})