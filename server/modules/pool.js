const pg = require('pg');
const url = require('url');

let config = {};

if (process.env.DATABASE_URL) {
    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');

    config = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true,
        max: 10,
        idleTimeoutMillis: 30000
    }
} else {
    config = {
        host: 'localhost',
        port: 5432,
        database: 'weekend-to-do-app',
        max: 10,
        idleTimeoutMillis: 30000,
    }
}

const pool = new pg.Pool(config);


pool.on('connect', () => {
    console.log('database is good boss');
});

pool.on('error', (error) => {
    console.log(`OH SHIT pool is broken' ${error}`);
});


module.exports = pool;