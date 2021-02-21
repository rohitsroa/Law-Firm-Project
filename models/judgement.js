var mongoose = require('mongoose');

// Page Schema
var JudgementSchema = mongoose.Schema({
   
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

var Judgement = module.exports = mongoose.model('Judgement', JudgementSchema);