const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Regjistro nje perdorues

const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { username, email, password, password2 } = req.body;

  
    if (!username || !email || !password || !password2) {
      return res.status(400).json({ error: 'Ju lutem plotesoni te gjitha fushat!' });
    }

    if (password !== password2) {
      return res.status(400).json({ error: 'Fjalekalimet nuk perputhen!' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Perdoruesi ekziston!' });
    }

    const user = await User.create({
      username,
      email,
      password
    });

    // Krijo token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.status(201).json({ token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Identifikohu
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

  
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};