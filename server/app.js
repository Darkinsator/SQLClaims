// server/app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pool = require('./dbconfig');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Create table if it doesn't exist
const createTableQuery = `
CREATE TABLE IF NOT EXISTS Claims (
    ClaimID INT AUTO_INCREMENT PRIMARY KEY,
    EmployeeID INT NOT NULL,
    ClaimDate DATE NOT NULL,
    InjuryType VARCHAR(255) NOT NULL,
    InjuryDescription TEXT NOT NULL,
    ClaimAmount DECIMAL(10, 2) NOT NULL,
    StatusID INT NOT NULL DEFAULT 1
);
`;

pool.query(createTableQuery).then(() => {
    console.log('Claims table created or already exists');
}).catch(error => {
    console.error('Error creating table:', error);
});

// POST endpoint to handle employee claims
app.post('/api/claims', async (req, res) => {
    const { employeeID, claimDate, injuryType, injuryDescription, claimAmount } = req.body;

    if (!employeeID || !claimDate || !injuryType || !injuryDescription || !claimAmount) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const query = `INSERT INTO Claims (EmployeeID, ClaimDate, InjuryType, InjuryDescription, ClaimAmount, StatusID) 
                   VALUES (?, ?, ?, ?, ?, 1)`;

    try {
        await pool.query(query, [employeeID, claimDate, injuryType, injuryDescription, claimAmount]);
        res.json({ success: true, message: 'Claim submitted successfully.' });
    } catch (error) {
        console.error('Error inserting claim:', error);
        res.status(500).json({ success: false, message: 'Error submitting claim.' });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
