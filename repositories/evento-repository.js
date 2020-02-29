'use strict'

const mongoose = require('mongoose')
const Evento = mongoose.model('Evento')

exports.get = async () => {
    const res = await Evento.find();
    return res;
}

exports.create = async (data) => {
    let evento = new Evento(data);
    await evento.save();
}

