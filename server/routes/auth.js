const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../dbconfig');
const router = express.Router();

// Employee Signup
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO Employees (Name, Email, Password) VALUES (?, ?, ?)`;
    
    try {
        await pool.query(query, [name, email, hashedPassword]);
        res.json({ success: true, message: 'Employee registered successfully.' });
    } catch (error) {
        console.error('Error registering employee:', error);
        res.status(500).json({ success: false, message: 'Error registering employee.' });
    }
});

// Employee/Admin Login
router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;
    const table = role === 'admin' ? 'Admins' : 'Employees';
    const query = `SELECT * FROM ${table} WHERE Email = ?`;
    
    try {
        const [rows] = await pool.query(query, [email]);
        const user = rows[0];
        if (!user || !(await bcrypt.compare(password, user.Password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials.' });
        }
        res.json({ success: true, message: 'Login successful.', user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Error logging in.' });
    }
});

module.exports = router;