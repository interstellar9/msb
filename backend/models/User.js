const connection = require('../config/database');

const User = {
  create: (email, password, role, callback) => {
    connection.query('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [email, password, role], callback);
  },

  findByEmail: (email, callback) => {
    connection.query('SELECT * FROM users WHERE email = ?', [email], callback);
  },
};

module.exports = User;