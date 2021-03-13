const { Pool } = require('pg')

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'order',
    password: 'pdfj92e13ad',
    port: 5432
})

