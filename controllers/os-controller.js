'user strict'

const osRepository = require('../repositories/os-repository')
const clienteRepository = require('../repositories/cliente-repository')
const emailService = require('../services/email-service')
const authService = require('../services/auth-service')

exports.get = async (req, res, next) => {
    try {
        var data = await osRepository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição',
            data: e
        })
    }
}

exports.post = async (req, res, next) => {
    try {
        await osRepository.create({
            descricao: req.body.os.descricao,
            cliente: req.body.os.cliente,
            equipamento: req.body.os.cliente.equipamentos[0],
        })
        res.status(201).send({
            message: "OS aberta com sucesso"
        })

    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: "Erro na abertura da OS",
            data: e
        })

    }
}
