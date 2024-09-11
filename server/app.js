const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./dbconfig');  // MySQL connection

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// POST endpoint to handle employee claims
app.post('/claims', async (req, res) => {
    const { employeeID, claimDate, injuryType, injuryDescription, claimAmount } = req.body;

    // Validate the request body
    if (!employeeID || !claimDate || !injuryType || !injuryDescription || !claimAmount) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // SQL query to insert the claim into the database
    const query = `INSERT INTO Claims (EmployeeID, ClaimDate, InjuryType, InjuryDescription, ClaimAmount, StatusID) 
                   VALUES (?, ?, ?, ?, ?, 1)`;

    try {
        // Execute the query using the MySQL connection
        const [results] = await pool.query(query, [employeeID, claimDate, injuryType, injuryDescription, claimAmount]);
        
        // Respond with success if the claim was inserted successfully
        res.json({ success: true, message: 'Claim submitted successfully.' });
    } catch (error) {
        console.error('Error inserting claim:', error);
        res.status(500).json({ success: false, message: 'Error submitting claim.' });
    }
});

// Function to create the table if it doesn't exist
async function createTable() {
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

    try {
        await pool.query(createTableQuery);
        console.log("Claims table created or already exists");
    } catch (error) {
        console.error('Error creating table:', error);
    }
}

// Call the createTable function to ensure the table exists
createTable();

// Start the Express server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});