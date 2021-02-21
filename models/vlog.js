var mongoose = require('mongoose');

// Page Schema
var VlogSchema = mongoose.Schema({
   
    title: {
        type: String,
        required: true
    },
    videolink: {
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
    image: {
        type: String
    },
    words: {
        type: String
    }
    
});

var Vlog = module.exports = mongoose.model('Vlog', VlogSchema);
