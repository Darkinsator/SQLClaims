const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

// Middleware to check if the user is an admin
function isAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied, admin only' });
    }
    next();
}

// Middleware to check if the user is an employee
function isEmployee(req, res, next) {
    if (req.user.role !== 'employee') {
        return res.status(403).json({ message: 'Access denied, employee only' });
    }
    next();
}

module.exports = { authenticateToken, isAdmin, isEmployee };