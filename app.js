// app.js
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
 
 
dotenv.config();
 
const app = express();
app.use(bodyParser.json());
app.use(cors());
 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gerenciamentoeventos'
});
 
db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados');
});

// Rota GET para listar todos os eventos
app.get('/api/eventos', (req, res) => {
    db.query('SELECT * FROM eventos', (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao acessar o banco de dados');
        }
        res.json(results);
    });
});

// Rota POST para criar um novo evento
app.post('/api/eventos', (req, res) => {
    const { nome, data, local, descricao } = req.body;
    const sql = 'INSERT INTO eventos (nome, data, local, descricao) VALUES (?, ?, ?, ?)';
   
    db.query(sql, [nome, data, local, descricao], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao criar evento');
        }
        res.status(201).json({ message: 'Evento criado com sucesso!' });
    });
});

// Rota GET para listar participantes de um evento específico
app.get('/api/participantes/eventos/:evento_id', (req, res) => {
    const eventoId = req.params.evento_id;  // Agora usamos evento_id corretamente
    
    if (!eventoId || isNaN(eventoId)) {
        return res.status(400).json({ error: 'ID do evento inválido' });
    }

    const sql = `
        SELECT p.participante_id, p.nome, p.email, p.telefone
        FROM participantes p
        JOIN evento_participante ep ON p.participante_id = ep.participante_id
        WHERE ep.evento_id = ?
    `;

    db.query(sql, [eventoId], (err, results) => {
        if (err) {
            console.error('Erro ao acessar os participantes:', err);
            return res.status(500).send('Erro ao acessar os participantes');
        }
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'Nenhum participante encontrado para este evento' });
        }

        res.json(results);
    });
});

// Rota POST para adicionar um participante a um evento
app.post('/api/participantes/:evento_id', (req, res) => {
    const eventoId = req.params.evento_id;
    const { nome, email, telefone } = req.body;
    console.log(req.body)
    const sql = 'INSERT INTO participantes (nome, email, telefone) VALUES (?, ?, ?)';
   
    db.query(sql, [eventoId, nome, email, telefone], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao adicionar participante');
        }
        res.status(201).json({ message: 'Participante adicionado com sucesso!' });
    });
});

// Porta do servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

