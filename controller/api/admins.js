const express = require('express')
const router = express.Router()
const adminsModel = require('../models/adminsModel')

module.exports = router.put('/admins/:id', function(req, res, next) {    
    adminsModel.update({
        _id: req.params.id
    },
    {
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        login: req.body.login,
        styles: req.body.styles,
        foto: req.body.foto
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