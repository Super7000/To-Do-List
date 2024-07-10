const express = require('express'); 
const { getUser } = require('../controllers/userController'); 
const authMiddleware = require('../middlewares/auth'); 
 
const router = express.Router(); 
 
router.get('/', authMiddleware, getUser); 
 
module.exports = router; 
