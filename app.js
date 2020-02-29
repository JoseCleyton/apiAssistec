'use strict'

const express = require('express');
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
const config = require('./config/config')

const app = express();

// Conexão com Banco de Dados MongoDb
mongoose.connect(config.connectionString)
     .then((sucess) => { })
     .catch((erro) => {
          console.log(erro)
     })

// Carregando Models
const Cliente = require('./models/cliente-model')
const Os = require('./models/os-model')
const Usuario = require('./models/usuario-model')
const Evento = require('./models/evento-model')

// Carrega as Rotas
const clienteRoute = require('./routes/cliente-route')
const osRoute = require('./routes/os-route')
const autenticateRoute = require('./routes/autenticacao-route')
const eventoRoute = require('./routes/evento-route')

app.use(bodyParser.json({
     limit: "5mb"
}));
app.use(bodyParser.urlencoded({
     extended: false
}));

// Habilita o CORS
app.use(function (req, res, next) {
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization , x-access-token');
     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
     next();
});

app.use('/cliente', clienteRoute);
app.use('/os', osRoute);
app.use('/authenticate', autenticateRoute)
app.use('/evento', eventoRoute)

module.exports = app