// controllers/eventoController.js
const connection = require('../Models/db.js');

// Criar evento
exports.createEvento = (req, res) => {
    const { nome, data, local, descricao } = req.body;
    const query = 'INSERT INTO eventos (nome, data, local, descricao) VALUES (?, ?, ?, ?)';
    connection.query(query, [nome, data, local, descricao], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao criar evento', error: err });
        }
        res.status(201).json({ message: 'Evento criado com sucesso', eventoId: result.insertId });
    });
};

// Listar todos os eventos
exports.getEventos = (req, res) => {
    const query = 'SELECT * FROM eventos';
    connection.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao listar eventos', error: err });
        }
        res.status(200).json(result);
    });
};

// Atualizar evento
exports.updateEvento = (req, res) => {
    const { id } = req.params;
    const { nome, data, local, descricao } = req.body;
    const query = 'UPDATE eventos SET nome = ?, data = ?, local = ?, descricao = ? WHERE evento_id = ?';
    connection.query(query, [nome, data, local, descricao, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao atualizar evento', error: err });
        }
        res.status(200).json({ message: 'Evento atualizado com sucesso' });
    });
};

// Deletar evento
exports.deleteEvento = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM eventos WHERE evento_id = ?';
    connection.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao deletar evento', error: err });
        }
        res.status(200).json({ message: 'Evento deletado com sucesso' });
    });
};
