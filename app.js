// app.js
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const eventoRoutes = require('./eventos-api/Routes/eventoRoutes');
const authRoutes = require('./eventos-api/Routes/authRoutes');

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Rotas
app.use('/api/eventos', eventoRoutes);
app.use('/api/auth', authRoutes);

// Porta do servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
