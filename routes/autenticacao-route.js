'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/autenticacao-controllers')

//const authService = require('../services/auth-service')

// Rotas da API
router.post('/', controller.authenticate);
router.post('/generatedToken', controller.generatedToken);

module.exports = router