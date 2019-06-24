const restful = require('node-restful')
const mongoose = restful.mongoose

const fileSchema = new mongoose.Schema({
    filePath: {
        type: String,
        required: true
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

module.exports = restful.model('uploads', fileSchema)