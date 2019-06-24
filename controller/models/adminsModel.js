const restful = require('node-restful')
const mongoose = restful.mongoose

const adminsSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    sobrenome: {
        type: String
    },
    login: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    ativo: {
        type: Boolean,
        default: 0
    },
    styles: {
        type: Object,
        default: {
            background: '#ffffff',
            header: '#333333',
            sidebar: '#333333'
        }
    },
    foto: {
        type: String,
        default: null
    },
    master: {
        type: Boolean,
        default: 0
    }
})

module.exports = restful.model('admins', adminsSchema)