const express = require('express'); 
const { getUser, updateUser } = require('../controllers/userController'); 
const authMiddleware = require('../middlewares/auth'); 
 
const router = express.Router(); 
 
router.get('/', authMiddleware, getUser); 
router.post('/', authMiddleware, updateUser); 
 
module.exports = router; 
