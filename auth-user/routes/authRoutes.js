const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByUsername } = require('../models/userModel');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, roleId } = req.body;
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Save the user to the database
    createUser(username, hashedPassword, roleId, (err, results) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.status(500).send('Error registering user');
      }
      res.status(201).send('User registered');
    });
  });
  

  router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    findUserByUsername(username, async (err, results) => {
      if (err || results.length === 0) {
        return res.status(401).send('User not found');
      }
  
      const user = results[0];
      const match = await bcrypt.compare(password, user.password);
  
      if (match) {
        // Generate JWT token
        const token = jwt.sign({ id: user.id, roleId: user.role_id, username: user.username }, 'secret_key', {
          expiresIn: '1h', // Token expires in 1 hour
        });
        res.json({ token });
      } else {
        res.status(401).send('Invalid credentials');
      }
    });
  });

module.exports = router;
