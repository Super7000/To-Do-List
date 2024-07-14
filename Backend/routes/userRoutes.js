const express = require('express');
const { getUser, updateUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/', authMiddleware, getUser);
router.post('/', authMiddleware, updateUser);
router.delete('/', authMiddleware, deleteUser);

module.exports = router; 
