const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    cantidad: Number,
    marca: String,
    tags: Array,
});
module.exports = mongoose.model('items', ItemSchema);

