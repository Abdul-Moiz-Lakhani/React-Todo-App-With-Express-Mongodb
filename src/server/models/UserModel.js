const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    _userName: { type: String, required: true},
    _userEmail: { 
        type: String, 
        required: true,
        match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    },
    _userPass: { type: mongoose.Schema.Types.Mixed, required: true},
    _userTodos: { type: mongoose.Schema.Types.Array, default: [] }
})

module.exports = mongoose.model('UserModel', UserSchema);