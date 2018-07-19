const mongoose = require('mongoose');


let productoSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
});

const productoModel = mongoose.model('ProductoSchema', productoSchema, 'productos');



module.exports = productoModel;