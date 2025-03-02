// require('dotenv').config();
// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Połączenie z bazą danych
// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// db.connect(err => {
//     if (err) {
//         console.error('Błąd połączenia z bazą danych:', err);
//         return;
//     }
//     console.log('Połączono z MySQL');
// });

// // Pobranie wszystkich ogłoszeń
// app.get('/api/ogloszenia', (req, res) => {
//     db.query('SELECT * FROM ogloszenia', (err, results) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json(results);
//     });
// });

// // Dodanie ogłoszenia
// app.post('/api/ogloszenia', (req, res) => {
//     const { tytul, opis, cena, uzytkownik_id } = req.body;
//     const sql = 'INSERT INTO ogloszenia (tytul, opis, cena, uzytkownik_id) VALUES (?, ?, ?, ?)';
//     db.query(sql, [tytul, opis, cena, uzytkownik_id], (err, result) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({ message: 'Dodano ogłoszenie', id: result.insertId });
//     });
// });

// // Uruchomienie serwera
// const PORT = 3306;
// app.listen(PORT, () => console.log(`Serwer działa na http://localhost:${PORT}`));

require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Konfiguracja CORS
app.use(cors({ origin: '*' }));

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self';");
    next();
});

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Backend działa!');
});

// Połączenie z bazą danych
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,  // Poprawiona nazwa zmiennej
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5000 // Dodanie obsługi portu bazy
});

db.connect(err => {
    if (err) {
        console.error('❌ Błąd połączenia z bazą danych:', err.message);
        return;
    }
    console.log('✅ Połączono z MySQL na porcie', process.env.DB_PORT || 5000);
});

// Pobranie wszystkich ogłoszeń
app.get('/api/ogloszenia', (req, res) => {
    db.query('SELECT * FROM ogloszenia', (err, results) => {
        if (err) {
            console.error('❌ Błąd przy pobieraniu ogłoszeń:', err.message);
            return res.status(500).json({ error: 'Błąd serwera' });
        }
        res.json(results);
    });
});

// Dodanie ogłoszenia
app.post('/api/ogloszenia', (req, res) => {
    const { tytul, opis, cena, uzytkownik_id } = req.body;
    const sql = 'INSERT INTO ogloszenia (tytul, opis, cena, uzytkownik_id) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [tytul, opis, cena, uzytkownik_id], (err, result) => {
        if (err) {
            console.error('❌ Błąd przy dodawaniu ogłoszenia:', err.message);
            return res.status(500).json({ error: 'Błąd serwera' });
        }
        res.json({ message: '✅ Dodano ogłoszenie', id: result.insertId });
    });
});

// Uruchomienie serwera
const PORT = process.env.PORT || 5000;  // Użycie portu z .env lub domyślnie 5000
app.listen(PORT, () => console.log(`🚀 Serwer działa na http://localhost:${PORT}`));
