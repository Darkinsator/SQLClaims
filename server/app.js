const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth');
const claimRoutes = require('./routes/claims');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use('/api/auth', authRoutes);    // Login, Signup
app.use('/api/claims', claimRoutes); // Employee claim routes
app.use('/api/admin', adminRoutes);  // Admin CRUD routes

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});