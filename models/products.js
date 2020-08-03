
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const laptopsaleSchema = new Schema({
    laptop: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
});

// Create the model based on the above schema
const yardsale = mongoose.model('yardsale', yardsaleSchema);

module.exports = yardsale;