const express = require('express')
const router = express.Router()
const multer = require('multer')
const fileModel = require('../models/fileModel')
// const upload = multer({dest:'../storage'}).single('imagem')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/storage')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2048 * 1440
    }
}).single('imagem')

module.exports = router.post('/upload', upload, (req, res) => {
    fileModel.create({
        filePath: `storage/${req.file.filename}`
    })
    .then(data => res.json({
        status: true,
        data: data,
        msg: 'Arquivo adicionado com sucesso.'
    }))
    .catch(error => res.json({
        status: false,
        data: [],
        msg: error
    }))
})