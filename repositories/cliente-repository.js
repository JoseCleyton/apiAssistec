'use strict'

const mongoose = require('mongoose')
const Cliente = mongoose.model('Cliente')

exports.get = async () => {
    const res = await Cliente.find();
    return res;
}
exports.getByName = async (nomeCliente) => {
    const res = await Cliente.find();
    return res;
}
exports.getById = async (id) => {
    const res = await Cliente.findById(id);
    return res;
}
exports.create = async (data) => {
    let cliente = new Cliente(data);
    await cliente.save();
}

exports.authenticate = async (data) => {
    const res = await Cliente.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

exports.getById = async (id) => {
    const res = await Cliente.findById(id);
    return res;
}
