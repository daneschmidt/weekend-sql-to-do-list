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
    console.log(`OH SHIT pool is broken' ${error}`);

});

module.exports = pool;