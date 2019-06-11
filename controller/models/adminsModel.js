const db = require('../config/database')

const Admins = db.sequelize.define('admins', {
    nome: {
        type: db.Sequelize.STRING
    },
    sobrenome: {
        type: db.Sequelize.STRING
    },
    login: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.BOOLEAN
    },
    senha: {
        type: db.Sequelize.STRING
    }
})

module.exports = Admins