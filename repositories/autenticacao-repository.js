'use strict'

const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

exports.authenticate = async (data) => {
    const res = await Usuario.findOne({
        email: data.email,
        senha: data.senha
    });
    return res;
}

exports.saveUser = async (data) => {
    let usuario = new Usuario(data)
    console.log(usuario)
    await usuario.save()
}