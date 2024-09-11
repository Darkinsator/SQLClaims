// server/dbconfig.js
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'EmployeeClaims'
});

// Export the pool
module.exports = pool.promise(); // Use promise-based API