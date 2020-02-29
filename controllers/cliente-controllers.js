'user strict'

const clienteRepository = require('../repositories/cliente-repository')
const ValidatorsContract = require('../validators/fluent-validators')
const md5 = require('md5')
const emailService = require('../services/email-service')
const authService = require('../services/auth-service')

exports.get = async (req, res, next) => {
    try {
        var data = await clienteRepository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição',
            data: e
        })
    }
}

exports.getByName = async (req, res, next) => {
    try {
        var data = await clienteRepository.getByName(req.params.nomeCliente);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição',
            data: e
        })
    }
}

exports.getById = async (req, res, next) => {
    try {
        var data = await clienteRepository.getById(req.params.id);
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

        await clienteRepository.create({
            nomeCliente: req.body.cliente.nomeCliente,
            crm: req.body.cliente.crm,
            email: req.body.cliente.email,
            telefone: req.body.cliente.telefone,
            equipamentos: req.body.cliente.equipamento,
            endereco: req.body.cliente.endereco
        })
            .then(() => {

                res.status(201).send({
                    message: "Cliente cadastrado com sucesso"
                })

                /*
                Envio de E-MAIL
                emailService.send(
                        req.body.cliente.email,
                        'Cadastro de Cliente - Hurtz > Esaote',
                        `Olá, ${req.body.nome}, você foi cadastrado na nossa base de dados!`
                    );
                    res.status(201).send({
                        message: "Cliente cadastrado com sucesso"
                    })
                })
                .catch((erro) => {
                    console.log(erro)
                    */
            })

    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: "Erro na gravação dos dados",
            data: e
        })

    }
}

exports.authenticate = async (req, res, next) => {

    try {
        const cliente = await clienteRepository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });


        if (!customer) {
            res.status(404).send({
                message: "E-mail ou Senha inválidos"
            });
            return
        }
        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: token,
            data: customer
        })

    } catch (e) {
        res.status(500).send({
            message: "Erro na solicitação",
            data: e
        });
    }
}

exports.refreshToken = async (req, res, next) => {

    try {

        // Recupera Token
        const token = req.body.token || req.query.token || req.headers['x-access-token']

        // Decodifica o Token
        const data = await authService.decodeToken(token)

        const customer = await clienteRepository.getById(data.id);


        if (!customer) {
            res.status(404).send({
                message: "Cliente não encontrado"
            });
            return
        }
        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: token,
            data: customer,
            message: 'Token atualizado'
        })

    } catch (e) {
        res.status(500).send({
            message: "Erro na solicitação",
            data: e
        });
    }
}