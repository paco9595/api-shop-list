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
    color: {
        type: String,
        default: '#fdbf62d4'
    },
    owner: String,
    ownerList: String
});
module.exports = mongoose.model('Lists', ListSchema);

