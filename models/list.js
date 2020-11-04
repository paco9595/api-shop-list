const mongoose = require('mongoose');

const ListSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    idUser: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    },
});
module.exports = mongoose.model('Lists', List);

