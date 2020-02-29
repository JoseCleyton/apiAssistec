'user strict'

const autenticacaoRepository = require('../repositories/autenticacao-repository')
const md5 = require('md5')
const authService = require('../services/auth-service')


exports.authenticate = async (req, res, next) => {

    try {
        const usuario = await autenticacaoRepository.authenticate({
            email: req.body.email,
            senha: md5(req.body.senha + global.SALT_KEY),
        });


        if (!usuario) {
            res.status(404).send({
                message: "E-mail ou Senha inválidos"
            });
            return
        }
        const token = await authService.generateToken({
            email: usuario.email,
            senha: usuario.senha
        });

        res.status(201).send({
            token: token,
            data: usuario
        })

    } catch (e) {
        res.status(500).send({
            message: "Erro na solicitação",
            data: e
        });
    }
}

exports.generatedToken = async (req, res, next) => {

    try {
        await autenticacaoRepository.saveUser({
            email: req.body.email,
            senha: md5(req.body.senha + global.SALT_KEY)
        }
        )

        let token = await authService.generateToken(
            {
                email: req.body.email,
                senha: md5(req.body.senha + global.SALT_KEY)
            }
        )
        res.status(201).send({
            token: token,
            message: 'Token criado com sucesso'
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