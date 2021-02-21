var mongoose = require('mongoose');

// Page Schema
var PhotoSchema = mongoose.Schema({
   
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    content: {
        type: String
    },
    slug: {
        type: String
    },
    date: {
        type: String
    }
    
});

var Photo = module.exports = mongoose.model('Photo', PhotoSchema);
