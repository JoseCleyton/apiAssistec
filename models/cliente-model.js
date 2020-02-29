'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nomeCliente: {
        type: String,
        required: true
    },

    equipamentos: [
        {
            fabricante: {
                type: String,
                required: true
            },
            modelo: {
                type: String,
                required: true
            },
            numeroDeSerie: {
                type: String,
                required: true
            },
        }
    ],
    crm: {
        type: Number,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    endereco: {
        rua: {
            type: String,
            required: true
        },
        cidade: {
            type: String,
            required: true
        },
        numero: {
            type: Number,
            required: true
        },
        bairro: {
            type: String,
            required: true
        },
        uf: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('Cliente', schema)