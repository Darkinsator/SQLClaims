const express = require('express');
const pool = require('../dbconfig');
const router = express.Router();

// CRUD operations for Admin (Claims and Users)
router.get('/claims', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Claims');
        res.json({ success: true, claims: rows });
    } catch (error) {
        console.error('Error fetching claims:', error);
        res.status(500).json({ success: false, message: 'Error fetching claims.' });
    }
});

router.delete('/claims/:id', async (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Claims WHERE ClaimID = ?`;
    
    try {
        await pool.query(query, [id]);
        res.json({ success: true, message: 'Claim deleted successfully.' });
    } catch (error) {
        console.error('Error deleting claim:', error);
        res.status(500).json({ success: false, message: 'Error deleting claim.' });
    }
});

module.exports = router;
