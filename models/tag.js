const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('tags', TagSchema);

