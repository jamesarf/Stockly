const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Get token from header
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach user data to request object
    console.log("jwt verified");
    next();  // Move to the next middleware or route handler
  } catch (error) {
    console.log("jwt verification failed");
    res.status(403).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyToken;
