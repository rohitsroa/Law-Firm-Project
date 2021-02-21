var mongoose = require('mongoose');

// Page Schema
var BlogSchema = mongoose.Schema({
   
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
    },
    words: {
        type: String
    }
});

var Blog = module.exports = mongoose.model('Blog', BlogSchema);