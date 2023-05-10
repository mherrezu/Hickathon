const { Pool } = require('pg');

const pool = new Pool({
    user: 'root',
    host: 'localhost',
    database: 'hicronabsences',
    password: 'root',
    port: 5432,
});
console.log('OK POOL');
module.exports = pool;