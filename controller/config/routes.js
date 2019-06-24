const express = require('express')
const auth = require('./auth')

module.exports = function(server) {
    // Rotas abertas
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../services/authService')
    openApi.post('/login', AuthService.logar)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)

    // Rotas fechadas
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    protectedApi.use(auth)

    const Posts = require('../api/posts')
    openApi.get('/posts', Posts.getPosts)
    protectedApi.post('/posts', Posts.createPost)
    protectedApi.put('/posts/:id', Posts.editPost)
    protectedApi.delete('/posts/:id', Posts.deletePost)

    // File
    const file = require('../api/upload')
    protectedApi.post('/upload', file)

    // Admins
    const admins = require('../api/admins')
    protectedApi.put('/admins/:id', admins)
    // Senha dos admins
    const adminSenha = require('../api/adminSenha')
    protectedApi.put('/adminSenha/:id', adminSenha)
}