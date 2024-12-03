// controllers/authController.js
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');
const connection = require('../Models/db.js');
const dotenv = require('dotenv');

dotenv.config();

// Registrar novo usuário
exports.register = (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: 'Erro ao registrar usuário', error: err });

        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        connection.query(query, [username, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ message: 'Erro ao criar usuário', error: err });
            res.status(201).json({ message: 'Usuário criado com sucesso' });
        });
    });
};

// Login de usuário
exports.login = (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';
    connection.query(query, [username], (err, result) => {
        if (err || result.length === 0) return res.status(401).json({ message: 'Usuário não encontrado' });

        const user = result[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err || !isMatch) return res.status(401).json({ message: 'Senha incorreta' });

            const payload = { userId: user.id };
            const token = jwt.encode(payload, process.env.JWT_SECRET);
            res.status(200).json({ message: 'Autenticado com sucesso', token });
        });
    });
};
