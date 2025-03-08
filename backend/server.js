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
// app.get('/api/ads', (req, res) => {
//     db.query('SELECT * FROM ads', (err, results) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json(results);
//     });
// });

// // Dodanie ogłoszenia
// app.post('/api/ads', (req, res) => {
//     const { tytul, opis, cena, uzytkownik_id } = req.body;
//     const sql = 'INSERT INTO ads (tytul, opis, cena, uzytkownik_id) VALUES (?, ?, ?, ?)';
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





// require('dotenv').config();
// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');

// const app = express();

// // Konfiguracja CORS
// app.use(cors({ origin: '*' }));

// app.use((req, res, next) => {
//     res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self';");
//     next();
// });

// app.use(express.json());
// app.get('/', (req, res) => {
//     res.send('Backend działa!');
// });

// // Połączenie z bazą danych
// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,  // Poprawiona nazwa zmiennej
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT || 5000 // Dodanie obsługi portu bazy
// });

// db.connect(err => {
//     if (err) {
//         console.error('❌ Błąd połączenia z bazą danych:', err.message);
//         return;
//     }
//     console.log('✅ Połączono z MySQL na porcie', process.env.DB_PORT || 5000);
// });

// // Pobranie wszystkich ogłoszeń
// app.get('/api/ads', (req, res) => {
//     db.query('SELECT * FROM ads', (err, results) => {
//         if (err) {
//             console.error('❌ Błąd przy pobieraniu ogłoszeń:', err.message);
//             return res.status(500).json({ error: 'Błąd serwera' });
//         }
//         res.json(results);
//     });
// });

// // Dodanie ogłoszenia
// app.post('/api/ads', (req, res) => {
//     const { tytul, opis, cena, uzytkownik_id } = req.body;
//     const sql = 'INSERT INTO ads (tytul, opis, cena, uzytkownik_id) VALUES (?, ?, ?, ?)';
    
//     db.query(sql, [tytul, opis, cena, uzytkownik_id], (err, result) => {
//         if (err) {
//             console.error('❌ Błąd przy dodawaniu ogłoszenia:', err.message);
//             return res.status(500).json({ error: 'Błąd serwera' });
//         }
//         res.json({ message: '✅ Dodano ogłoszenie', id: result.insertId });
//     });
// });

// // Uruchomienie serwera
// const PORT = process.env.PORT || 5000;  // Użycie portu z .env lub domyślnie 5000
// app.listen(PORT, () => console.log(`🚀 Serwer działa na http://localhost:${PORT}`));


require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5000
});

db.connect(err => {
    if (err) {
        console.error('❌ Błąd połączenia z bazą danych:', err.message);
        return;
    }
    console.log('✅ Połączono z MySQL na porcie', process.env.DB_PORT || 5000);
});

// Rejestracja użytkownika
app.post('/api/users', (req, res) => {
    const { email, password, role } = req.body.user;
    const user = new UserModel(req.body);
user.save().then(() => res.status(201).json(user)).catch(err => res.status(500).json({ error: err.message }));



    // Sprawdzanie czy email już istnieje
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length > 0) return res.status(400).json({ message: 'Email już istnieje' });

        // Haszowanie hasła
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ error: err.message });

            // Wstawienie nowego użytkownika
            const newUser = { email, password: hashedPassword, role };
            db.query('INSERT INTO users SET ?', newUser, (err, result) => {
                if (err) return res.status(500).json({ error: err.message });

                const userId = result.insertId;
                const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });

                res.status(201).json({ message: 'Użytkownik zarejestrowany', user: { email, role }, token });
            });
        });
    });
});

// Pobranie wszystkich ogłoszeń
app.get('/api/ads', (req, res) => {
    db.query('SELECT * FROM ads', (err, results) => {
        if (err) {
            console.error('❌ Błąd przy pobieraniu ogłoszeń:', err.message);
            return res.status(500).json({ error: 'Błąd serwera' });
        }
        res.json(results);
    });
});

// Dodanie ogłoszenia
app.post('/api/ads', (req, res) => {
    const { tytul, opis, cena, uzytkownik_id } = req.body;
    const sql = 'INSERT INTO ads (tytul, opis, cena, uzytkownik_id) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [tytul, opis, cena, uzytkownik_id], (err, result) => {
        if (err) {
            console.error('❌ Błąd przy dodawaniu ogłoszenia:', err.message);
            return res.status(500).json({ error: 'Błąd serwera' });
        }
        res.json({ message: '✅ Dodano ogłoszenie', id: result.insertId });
    });
});

// Uruchomienie serwera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serwer działa na http://localhost:${PORT}`));
