const jwt = require('jsonwebtoken'); 
const envVariables = require('../config/config.js');
 
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization; 
    if (!token) { 
        return res.status(401).json({ message: 'No token provided' }); 
    } 
    try { 
        const decoded = await jwt.verify(token, envVariables.jwtSecret); 
        req.user = decoded; 
        next(); 
    } catch (error) { 
        res.status(401).json({ message: 'Invalid token' }); 
    } 
}; 
 
module.exports = authMiddleware; 
