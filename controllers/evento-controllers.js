'user strict'

const eventoRepository = require('../repositories/evento-repository')
const emailService = require('../services/email-service')
const authService = require('../services/auth-service')

exports.get = async (req, res, next) => {
    try {
        var data = await eventoRepository.get();
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

        await eventoRepository.create({
            title: req.body.evento.title,
            start: req.body.evento.start,
            end: req.body.evento.end,
            color: req.body.evento.color
        })
            .then(() => {

                res.status(201).send({
                    message: "Evento Agendado com sucesso"
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
            message: "Erro no Agendamento",
            data: e
        })

    }
}
