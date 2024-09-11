const mysql = require('mysql2/promise');

// MySQL connection pool (promise-based)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'EmployeeClaims'
});

async function getClaims() {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM Claims');
        console.log(rows);
    } catch (error) {
        console.error('Error fetching claims:', error);
    }
}

getClaims(); // Calling the function to fetch the claims
