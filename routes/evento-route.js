'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/evento-controllers')
const authService = require('../services/auth-service')

// Rotas da API

router.get('/', controller.get);
router.post('/', authService.authorize, controller.post);

module.exports = router