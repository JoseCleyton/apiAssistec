'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/cliente-controllers')
const authService = require('../services/auth-service')

// Rotas da API

router.get('/', authService.authorize, controller.get);
router.get('/:nomeCliente', authService.authorize, controller.getByName);
router.get('/busca/:id', authService.authorize, controller.getById)
router.post('/', authService.authorize, controller.post);

module.exports = router