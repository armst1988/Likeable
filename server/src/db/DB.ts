const { Pool } = require('pg');

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'order',
    password: 'placeholder',
    port: 5432
});

