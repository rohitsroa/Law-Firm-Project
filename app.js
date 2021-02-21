var engines =require('consolidate');
var express = require('express');
var cors=require('cors');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
const request = require("request");
var datetime = require('datetime');
var exphbs = require('express-handlebars');
var mkdirp=require('mkdirp');
var flash = require('connect-flash');
var fileUpload = require('express-fileupload');

mongoose.connect('mongodb://localhost:27017/liuyan',{ useNewUrlParser: true ,useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});
var connection = mongoose.createConnection("mongodb://localhost:27017/liuyan");

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs','pug','html','handlebars');

// Set public folder
app.use(cors()); 
app.engine('handlebars',exphbs());
app.use(express.static(path.join(__dirname, 'views',)));
app.use(express.static(path.join(__dirname, 'public',)));


// Set global errors variable
app.locals.errors = null;


// Set global errors variable
app.locals.errors = null;
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
                , root = namespace.shift()
                , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    },
    customValidators: {
        isImage: function (value, filename) {
            var extension = (path.extname(filename)).toLowerCase();
            switch (extension) {
                case '.jpg':
                    return '.jpg';
                case '.jpeg':
                    return '.jpeg';
                case '.png':
                    return '.png';
                case '':
                    return '.jpg';
                default:
                    return false;
            }
        }
    }
}));
// Get Category Model
var Testimonial = require('./models/testimonial');

// Get all categories to pass to header.ejs
Testimonial.find(function (err, testimonials) {
    if (err) {
        console.log(err);
    } else {
        app.locals.testimonials = testimonials;
    }
});
var Vlog = require('./models/vlog');

// Get all categories to pass to header.ejs
Vlog.find(function (err, vlogs) {
    if (err) {
        console.log(err);
    } else {
        app.locals.vlogs = vlogs;
    }
});
var Judgement = require('./models/judgement');

// Get all categories to pass to header.ejs
Judgement.find(function (err, judgements) {
    if (err) {
        console.log(err);
    } else {
        app.locals.judgements = judgements;
    }
});
var Blog = require('./models/blog');

// Get all categories to pass to header.ejs
Blog.find(function (err, blogs) {
    if (err) {
        console.log(err);
    } else {
        app.locals.blogs = blogs;
    }
});
var Photo = require('./models/photo');

// Get all categories to pass to header.ejs
Photo.find(function (err, photos) {
    if (err) {
        console.log(err);
    } else {
        app.locals.photos = photos;
    }
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());
app.use(fileUpload());
// Express Session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
//  cookie: { secure: true }
}));
app.use(flash());
var index=require('./routes/index');
app.use('/',index);
// Express Messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});
module.exports=app;
var port = 3000;
app.listen(port, function () {
    console.log('Server started on port ' + port);
});