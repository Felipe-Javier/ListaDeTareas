const mongoose = require('mongoose')

const Users = mongoose.model('User', {
    user: {type: String, required: true, minlength: 4},
    password: {type: String, required: true},
    salt: {type: String, required: true},
})

module.exports = Users