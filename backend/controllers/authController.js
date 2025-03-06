// const User = require('../models/User');
// const bcrypt = require('bcryptjs');

// // Register User
// exports.registerUser = async (req, res) => {
//   const { name, email, password } = req.body;
  
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const user = await User.create({ name, email, password });
//     res.status(201).json({ message: 'User registered successfully', user });
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error', error });
//   }
// };

// // Login User
// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;
  
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     res.status(200).json({ message: 'Login successful', user });
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error', error });
//   }
// };



// const User = require('../models/User');
// const bcrypt = require('bcryptjs');

// // Register User
// exports.registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword });

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error', error });
//   }
// };

// // Login User with Session
// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Store user ID in session
//     req.session.userId = user._id;
//     req.session.user = { id: user._id, name: user.name, email: user.email };

//     res.status(200).json({ message: 'Login successful', user: req.session.user });
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error', error });
//   }
// };

// exports.getSession = async (req, res) => {
//   if (req.session.user) {
//     return res.status(200).json({ user: req.session.user });
//   }
//   res.status(401).json({ message: "No active session" });
// };


// // Logout User
// exports.logoutUser = async (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       console.error("Logout Error:", err);
//       return res.status(500).json({ message: "Logout failed" });
//     }

//     res.clearCookie("connect.sid", {
//       path: "/",
//       httpOnly: true,
//       secure: false, // Change to true in production with HTTPS
//       sameSite: "lax"
//     });

//     return res.status(200).json({ message: "Logout successful" });
//   });
// };



const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};




// exports.adminLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Convert email to lowercase for case-insensitive comparison
//     if (email.toLowerCase() !== ADMIN_CREDENTIALS.email.toLowerCase()) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     if (password !== ADMIN_CREDENTIALS.password) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Store admin session
//     req.session.admin = { email: ADMIN_CREDENTIALS.email, isAdmin: true };

//     res.status(200).json({
//       message: 'Admin login successful',
//       email: ADMIN_CREDENTIALS.email,
//       isAdmin: true,
//     });
//   } catch (error) {
//     console.error("Admin Login Error:", error);
//     res.status(500).json({ message: 'Server Error', error: error.message });
//   }
// };



// Register User
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};


const ADMIN_CREDENTIALS = {
  email: 'admin@elite-threads.com',
  password: 'Admin@123',
};

// Login User with Session
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if it's an admin login
    if (email.toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase()) {
      if (password === ADMIN_CREDENTIALS.password) {
        req.session.user = { email: ADMIN_CREDENTIALS.email, isAdmin: true };

        return res.status(200).json({
          message: 'Admin login successful',
          user: { email: ADMIN_CREDENTIALS.email, isAdmin: true },
        });
      } else {
        return res.status(400).json({ message: 'Invalid admin credentials' });
      }
    }

    // Otherwise, check for normal user login
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Store user session
    req.session.userId = user._id;
    req.session.user = { id: user._id, name: user.name, email: user.email, isAdmin: false };

    res.status(200).json({ message: 'Login successful', user: req.session.user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get Session
exports.getSession = async (req, res) => {
  if (req.session.user) {
    return res.status(200).json({ user: req.session.user });
  }
  res.status(401).json({ message: "No active session" });
};

// Logout User
exports.logoutUser = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout Error:", err);
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("connect.sid", {
      path: "/",
      httpOnly: true,
      secure: false, // Change to true in production with HTTPS
      sameSite: "lax"
    });

    return res.status(200).json({ message: "Logout successful" });
  });
};
