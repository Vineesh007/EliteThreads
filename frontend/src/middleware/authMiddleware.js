const jwt = require('jsonwebtoken');

const protectAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.isAdmin) {
      req.user = decoded;
      next();
    } else {
      return res.status(403).json({ message: 'Access Denied: Not an Admin' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { protectAdmin };
