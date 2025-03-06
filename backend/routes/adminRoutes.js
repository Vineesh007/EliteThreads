const express = require('express');
const { protectAdmin } = require('../middleware/authMiddleware'); // ✅ Import the middleware
// const { adminLogin } = require('../controllers/authController');

const router = express.Router();



// router.post('/login', adminLogin);
router.get('/dashboard', protectAdmin, (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard' });
});

module.exports = router;
