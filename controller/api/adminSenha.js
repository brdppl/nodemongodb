const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const adminsModel = require('../models/adminsModel')

const passwordRegex = /((?=.*\d)(?=.*[a-z]))/

module.exports = router.put('/adminSenha/:id', function(req, res, next) {
    const senha = req.body.senha || ''
    const confirmarSenha = req.body.confirmarSenha || ''
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
    
    adminsModel.updateOne({
        _id: req.params.id
    },
    {
        senha: passwordHash
    })
    .then(data => res.json({
        status: true,
        data: data,
        msg: 'Registro atualizado com sucesso.'
    }))
    .catch(error => res.json({
        status: false,
        data: [],
        msg: error
    }))
})