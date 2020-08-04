const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },

});

const sell = mongoose.model('product', saleSchema);

module.exports = sell;