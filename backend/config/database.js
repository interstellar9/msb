const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ads_db',
});

connection.connect((err) => {
  if (err) {
    console.error('Błąd połączenia z bazą:', err);
    return;
  }
  console.log('Połączono z bazą danych');
});

module.exports = connection;
