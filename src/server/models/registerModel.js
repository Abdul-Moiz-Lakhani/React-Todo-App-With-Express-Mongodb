const mongoose = require('mongoose');

const registerFormSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    _userName: String,
    _userEmail: String,
    _userPass: mongoose.Schema.Types.Mixed
})

module.exports = mongoose.model('RegisterFormModel', registerFormSchema);