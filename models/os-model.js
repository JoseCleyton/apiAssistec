'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    numeroOs: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    equipamento: {
        modelo: {
            type: String,
            required: true
        },
        numeroDeSerie: {
            type: String,
            required: true
        }
    },
    dataAbertura: {
        type: Date,
        required: true,
        default: Date.now
    },
    dataFechamento: {
        type: Date,
        default: ''
    },

});

module.exports = mongoose.model('Os', schema)