const restful = require('node-restful')
const mongoose = restful.mongoose

const postsSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    ativo: {
        type: Boolean,
        default: 0
    },
    imagem: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = restful.model('posts', postsSchema)