const express = require('express');
const pool = require('../dbconfig');
const router = express.Router();

// Create a new claim
router.post('/', async (req, res) => {
    const { employeeID, claimDate, injuryType, injuryDescription, claimAmount } = req.body;
    const query = `INSERT INTO Claims (EmployeeID, ClaimDate, InjuryType, InjuryDescription, ClaimAmount) VALUES (?, ?, ?, ?, ?)`;
    
    try {
        await pool.query(query, [employeeID, claimDate, injuryType, injuryDescription, claimAmount]);
        res.json({ success: true, message: 'Claim submitted successfully.' });
    } catch (error) {
        console.error('Error submitting claim:', error);
        res.status(500).json({ success: false, message: 'Error submitting claim.' });
    }
});

module.exports = router;
