const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
})


const Client = mongoose.model('client', ClientSchema)

module.exports = Client