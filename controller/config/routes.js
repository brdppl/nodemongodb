const express = require('express')
// const auth = require('./auth')

module.exports = function(server) {
    // // Rotas abertas
    // const openApi = express.Router()
    // server.use('/oapi', openApi)

    // // Rotas fechadas
    // const AuthService = require('../services/authService')
    // openApi.post('/login', AuthService.login)
    // openApi.post('/validateToken', AuthService.validateToken)

    // const protectedApi = express.Router()
    // server.use('/api', protectedApi)

    // protectedApi.use(auth)

    
    const router = express.Router()
    server.use('/api', router)

    const Posts = require('../api/posts')
    // Posts.register(router, '/posts')
    router.get('/posts', Posts.getPosts)
    router.post('/posts', Posts.createPost)
    router.put('/posts/:id', Posts.editPost)
    router.delete('/posts/:id', Posts.deletePost)

    // File
    const file = require('../api/upload')
    router.post('/upload', file)
}