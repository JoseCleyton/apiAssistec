'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/os-controller')
//const authService = require('../services/auth-service')

// Rotas da API

router.get('/', controller.get)
router.post('/', controller.post)
module.exports = router