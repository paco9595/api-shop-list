const mongoose = require('mongoose');

const ListSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    idUser: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
});
module.exports = mongoose.model('Lists', ListSchema);

