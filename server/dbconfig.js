const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',           // Your MySQL username
    password: '',           // Your MySQL password
    database: 'SQLClaims',
    waitForConnections: true,
    connectionLimit: 10
});
module.exports = pool.promise();