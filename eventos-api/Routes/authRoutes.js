// routes/authRoutes.js
const express = require('express');
const authController = require('../Controller/authController');
const router = express.Router();

// Rotas de autenticação
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
