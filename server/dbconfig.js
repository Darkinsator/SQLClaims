const mysql = require('mysql2');

// Create a connection pool with promise API
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'EmployeeClaims'
}).promise(); // Ensure `.promise()` is called here

module.exports = pool;
