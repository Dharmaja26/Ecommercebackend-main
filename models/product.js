const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createdAt: {
        type: mongoose.Schema.Types.Date
    },
    updatedAt: {
        type: mongoose.Schema.Types.Date
    },
},
{
    collection: 'product'
});

module.exports = mongoose.model('Product',productSchema);