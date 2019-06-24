const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const adminsModel = require('../models/adminsModel')
const env = require('../.env')

const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z]))/

const sendErrorsFromDB = (res, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return res.status(400).json({errors})
}

const logar = (req, res, next) => {
    const login = req.body.login || ''
    const senha = req.body.senha || ''

    adminsModel.findOne({login}, (err, user) => {
        if(err) {
            return sendErrorsFromDB(res, err)
        } else if(user && bcrypt.compareSync(senha, user.senha) && user.ativo) {
            const token = jwt.sign(user.toJSON(), env.authSecret, {
                expiresIn: '1 day'
            })
            const {_id, nome, sobrenome, login, ativo, styles, foto, master} = user
            res.json({_id, nome, sobrenome, login, ativo, styles, foto, master, token})
        } else {
            return res.status(400).send({errors: ['Usuário/Senha inválidos']})
        }
    })
}

const validateToken = (req, res, next) => {
    const token = req.body.token || ''
    jwt.verify(token, env.authSecret, function(err, decoded) {
        return res.status(200).send({valid: !err})
    })
}

const signup = (req, res, next) => {
    const nome = req.body.nome || ''
    // const sobrenome = req.body.sobrenome || ''
    const login = req.body.login || ''
    // const email = req.body.email || ''
    const senha = req.body.senha || ''
    const confirmarSenha = req.body.confirmarSenha || ''

    // if(!email.match(emailRegex)) {
    //     return res.status(400).send({errors: ['O e-mail não é válido!']})
    // }

    if(!senha.match(passwordRegex)) {
        return res.status(400).send({errors: [
            'A senha deve ter pelo menos uma letra minúscula e um número.'
        ]})
    }

    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(senha, salt)
    if(!bcrypt.compareSync(confirmarSenha, passwordHash)) {
        return res.status(400).send({errors: ['As senhas são diferentes!']})
    }

    adminsModel.findOne({login}, (err, user) => {
        if(err) {
            return sendErrorsFromDB(res, err)
        } else if (user) {
            return res.status(400).send({errors: ['Este usuário já existe.']})
        } else {
            const newAdmin = new adminsModel({nome, login, senha: passwordHash})
            newAdmin.save(err => {
                if(err) {
                    return sendErrorsFromDB(res, err)
                } else {
                    // logar(req, res, next)
                    res.send('Cadastro realizado com sucesso, aguarde a sua aprovação.')
                }
            })
        }
    })
}

module.exports = {logar, signup, validateToken}