// const express = require('express');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');  // Adjust path as needed
// const router = express.Router();

// // Signup Route
// router.post('/signup', async (req, res) => {
//     const { name, email, password } = req.body;
  
//     try {
//       // Check if the user already exists
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ message: 'User already exists' });
//       }
  
//       // Hash the password before saving
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       // Create a new user
//       const newUser = new User({
//         name,
//         email,
//         password: hashedPassword,
//       });
  
//       await newUser.save();
  
//       res.status(201).json({ message: 'User created successfully. Please log in.' });
//     } catch (error) {
//       console.error('Error during signup:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
  
// // Login Route

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       // Find the user by email
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(400).json({ message: 'Invalid email or password' });
//       }
  
//       // Compare the hashed password with the entered password
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ message: 'Invalid email or password' });
//       }
  
//       // If login is successful, return a response (you can include user details or a token if needed)
//       res.status(200).json({
//         message: 'Login successful',
//         user: {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//         },
//       });
//     } catch (error) {
//       console.error('Login error:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
  
//   module.exports = router;


const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const User = require('../models/User'); // Adjust the path as needed
// const { adminLogin } = require('../controllers/authController');
const router = express.Router();

// router.post('/admin/login', adminLogin);

// Signup Route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully. Please log in.' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


const ADMIN_CREDENTIALS = {
    email: 'admin@elite-threads.com',
    password: 'Admin@123',
  };

// Login Route (Handles both Admin & User Login)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check for admin login
      if (email.toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase()) {
        if (password === ADMIN_CREDENTIALS.password) {
          req.session.user = { email: ADMIN_CREDENTIALS.email, isAdmin: true };
  
          return res.status(200).json({
            message: 'Admin login successful',
            user: { email: ADMIN_CREDENTIALS.email, isAdmin: true },
          });
        } else {
          return res.status(400).json({ message: 'Invalid email or password' });
        }
      }
  
      // Otherwise, check for normal user login
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Store user session
      req.session.userId = user._id;
      req.session.user = { id: user._id, name: user.name, email: user.email, isAdmin: false };
  
      res.status(200).json({
        message: 'Login successful',
        user: req.session.user,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  });

// Get Session Route (Check if user is logged in)
router.get('/session', (req, res) => {
    if (req.session.user) {
        return res.status(200).json({ user: req.session.user });
    }
    res.status(401).json({ message: 'No active session' });
});

// Logout Route
router.post("/logout", (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "Lax" });
    res.status(200).json({ success: true, message: "Logged out successfully" });
});


module.exports = router;
