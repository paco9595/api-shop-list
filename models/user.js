const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    }
});
module.exports = mongoose.model('users', UserSchema);

