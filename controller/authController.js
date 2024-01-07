
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user-info-model');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, email, password: hashedPassword });
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  
      res.status(200).json({ message: 'Login successful', accessToken, refreshToken });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  const refresh=(req, res) => {
    const refreshToken = req.body.refreshToken;
  
    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token is required' });
    }
  
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid refresh token' });
      }
  
      const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ accessToken });
    });
  };

module.exports = { register, login, refresh };
