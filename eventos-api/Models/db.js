// models/db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gerenciamentoeventos"
});

connection.connect((err) => {
    if (err) {
        console.error('Erro de conexão ao banco de dados: ' + err.stack);
        return;
    }
    console.log('Conectado ao banco de dados como ID ' + connection.threadId);
});

module.exports = connection;
