const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded; 
    console.log('Decoded user:', decoded); 
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

const admin = (req, res, next) => {
  console.log('User in admin middleware:', req.user); 
  if (req.user?.role === 'admin') {
    next();
  } else {
    res.status(403).json({ 
      msg: 'Admin access required',
      receivedRole: req.user?.role || 'undefined' 
    });
  }
};

module.exports = { auth, admin };