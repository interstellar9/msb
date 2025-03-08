const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/database');

const registerUser = (req, res) => {
  const { email, password, role } = req.body.user;

  // Sprawdzenie czy email już istnieje
  connection.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length > 0) return res.status(400).json({ message: 'Email już istnieje' });

    // Haszowanie hasła
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: err });

      const newUser = { email, password: hashedPassword, role };
      connection.query('INSERT INTO users SET ?', newUser, (err, result) => {
        if (err) return res.status(500).json({ error: err });

        const userId = result.insertId;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });

        res.status(201).json({ message: 'Użytkownik zarejestrowany', user: { email, role }, token });
      });
    });
  });
};

module.exports = { registerUser };
