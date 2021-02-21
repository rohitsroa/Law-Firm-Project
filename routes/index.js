var express = require('express');
var router = express.Router();
var mkdirp = require('mkdirp');
var fs = require('fs-extra');
var resizeImg = require('resize-img');
// Get Page model
var Testimonial = require('../models/testimonial');
var Blog = require('../models/blog');
var Vlog = require('../models/vlog');
var Judgement = require('../models/judgement');
var Photo = require('../models/photo');
/* * GET products index
 */
router.get('/',function (req, res) {
    Testimonial.find(function (err, testimonials) {
        res.render('index.ejs', {
            testimonials:testimonials,
    });
});
});
router.get('/activities',function (req, res) {
    Judgement.find(function (err, judgements) {
        Vlog.find(function (err, vlogs) {
            Blog.find(function (err, blogs) {
                res.render('activities.ejs', {
                    blogs:blogs,
                    vlogs:vlogs,
                    judgements:judgements
        });
});
});
});
});
/*
 * GET products index
 */
router.get('/admin/testimonials',function (req, res) {
    var count;

    Testimonial.count(function (err, c) {
        count = c;
    });

    Testimonial.find(function (err, testimonials) {
        res.render('admin/testimonials', {
            testimonials: testimonials,
            count: count
        });
    });
});
/*
 * GET products index
 */
router.get('/admin/blogs',function (req, res) {
    var count;

    Blog.count(function (err, c) {
        count = c;
    });

    Blog.find(function (err, blogs) {
        res.render('admin/blogs', {
            blogs: blogs,
            count: count
        });
    });
});
/*
 * GET products index
 */
router.get('/admin/photos',function (req, res) {
    var count;

    Photo.count(function (err, c) {
        count = c;
    });

    Photo.find(function (err, photos) {
        res.render('admin/photos', {
            photos: photos,
            count: count
        });
    });
});
router.get('/admin/judgements',function (req, res) {
    var count;

    Judgement.count(function (err, c) {
        count = c;
    });

    Judgement.find(function (err, judgements) {
        res.render('admin/judgements', {
            judgements: judgements,
            count: count
        });
    });
});
/*
 * GET products index
 */
router.get('/admin/vlogs',function (req, res) {
    var count;

    Vlog.count(function (err, c) {
        count = c;
    });

    Vlog.find(function (err, vlogs) {
        res.render('admin/vlogs', {
            vlogs: vlogs,
            count: count
        });
    });
});
/*
 * GET add product
 */
router.get('/admin/testimonial/add-testimonial',function (req, res) {

    var name = "";
    var content = "";

    Testimonial.find(function (err, testimonials) {
        res.render('admin/add_testimonial', {
            name: name,
            content: content,
        });
    });

});
router.get('/admin/blog/add-blog',function (req, res) {

    var title = "";
    var date = "";
    var content = "";

    Blog.find(function (err, blogs) {
        res.render('admin/add_blog', {
            title: title,
            content: content,
            date:date
        });
    });

});
router.get('/admin/photo/add-photo',function (req, res) {

    var title = "";
    var date = "";
    var content = "";

    Photo.find(function (err, photos) {
        res.render('admin/add_photo', {
            title: title,
            content: content,
            date:date
        });
    });

});
router.get('/admin/judgement/add-judgement',function (req, res) {

    var title = "";
    var date = "";
    var content = "";

    Judgement.find(function (err, judgements) {
        res.render('admin/add_judgement', {
            title: title,
            content: content,
            date:date
        });
    });

});
router.get('/admin/vlog/add-vlog',function (req, res) {

    var title = "";
    var date = "";
    var content = "";
    var videolink = "";

    Vlog.find(function (err, vlogs) {
        res.render('admin/add_vlog', {
            title: title,
            content: content,
            date:date,
            videolink:videolink
        });
    });

});

/*
 * POST add product
 */
router.post('/admin/testimonial/add-testimonial', function (req, res) {

    var imageFile = typeof req.files.image !== "undefined" ? req.files.image.name : "";

    // req.checkBody('name', 'Name must have a value.').notEmpty();
    // req.checkBody('content', 'Content must have a value.').notEmpty();
    // req.checkBody('image', 'You must upload an image').isImage(imageFile);

    var name = req.body.name;
    var slug = name.replace(/\s+/g, '-').toLowerCase();
    var content = req.body.content;
    var words = content.split(" ").slice(0,25).join(" ");

    // var errors = req.validationErrors();

    // if (errors) {
    //     Testimonial.find(function (err, testimonials) {
    //         res.render('admin/add_testimonial', {
    //             errors: errors,
    //             name: name,
    //             content: content,
    //         });
    //     });
    // } else {
                var testimonial = new Testimonial({
                    name: name,
                    slug: slug,
                    content: content,
                    image: imageFile,
                    words:words
                });

                testimonial.save(function (err) {
                    if (err)
                        return console.log(err);

                    mkdirp('public/testimonial_images/' + testimonial._id, function (err) {
                        return console.log(err);
                    });

                    mkdirp('public/testimonial_images/' + testimonial._id + '/gallery', function (err) {
                        return console.log(err);
                    });

                    if (imageFile != "") {
                        var testimonialImage = req.files.image;
                        var path = 'public/testimonial_images/' + testimonial._id + '/' + imageFile;

                        testimonialImage.mv(path, function (err) {
                            return console.log(err);
                        });
                    }

                    req.flash('success', 'Testimonial added!');
                    res.redirect('/admin/testimonials');
                });
            }
    );
/*
 * POST add product
 */
router.post('/admin/blog/add-blog', function (req, res) {

    var imageFile = typeof req.files.image !== "undefined" ? req.files.image.name : "";

    // req.checkBody('name', 'Name must have a value.').notEmpty();
    // req.checkBody('content', 'Content must have a value.').notEmpty();
    // req.checkBody('image', 'You must upload an image').isImage(imageFile);

    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();
    var content = req.body.content;
    var words = content.split(" ").slice(0,25).join(" ");
    var date = req.body.date;

    // var errors = req.validationErrors();

    // if (errors) {
    //     Testimonial.find(function (err, testimonials) {
    //         res.render('admin/add_testimonial', {
    //             errors: errors,
    //             name: name,
    //             content: content,
    //         });
    //     });
    // } else {
                var blog = new Blog({
                    title: title,
                    slug: slug,
                    content: content,
                    date:date,
                    words:words,
                    image: imageFile
                });

                blog.save(function (err) {
                    if (err)
                        return console.log(err);

                    mkdirp('public/blog_images/' + blog._id, function (err) {
                        return console.log(err);
                    });

                    mkdirp('public/blog_images/' + blog._id + '/gallery', function (err) {
                        return console.log(err);
                    });

                    if (imageFile != "") {
                        var blogImage = req.files.image;
                        var path = 'public/blog_images/' + blog._id + '/' + imageFile;

                        blogImage.mv(path, function (err) {
                            return console.log(err);
                        });
                    }

                    req.flash('success', 'Blog added!');
                    res.redirect('/admin/blogs');
                });
            }
    );
    /*
 * POST add product
 */
router.post('/admin/photo/add-photo', function (req, res) {

    var imageFile = typeof req.files.image !== "undefined" ? req.files.image.name : "";

    // req.checkBody('name', 'Name must have a value.').notEmpty();
    // req.checkBody('content', 'Content must have a value.').notEmpty();
    // req.checkBody('image', 'You must upload an image').isImage(imageFile);

    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();
    var content = req.body.content;
    var date = req.body.date;

    // var errors = req.validationErrors();

    // if (errors) {
    //     Testimonial.find(function (err, testimonials) {
    //         res.render('admin/add_testimonial', {
    //             errors: errors,
    //             name: name,
    //             content: content,
    //         });
    //     });
    // } else {
                var photo = new Photo({
                    title: title,
                    slug: slug,
                    content: content,
                    date:date,
                    image: imageFile
                });

                photo.save(function (err) {
                    if (err)
                        return console.log(err);

                    mkdirp('public/photo_images/' + photo._id, function (err) {
                        return console.log(err);
                    });

                    mkdirp('public/photo_images/' + photo._id + '/gallery', function (err) {
                        return console.log(err);
                    });

                    if (imageFile != "") {
                        var photoImage = req.files.image;
                        var path = 'public/photo_images/' + photo._id + '/' + imageFile;

                        photoImage.mv(path, function (err) {
                            return console.log(err);
                        });
                    }

                    req.flash('success', 'Photos added!');
                    res.redirect('/admin/photos');
                });
            }
    );
/*
 * POST add product
 */
router.post('/admin/judgement/add-judgement', function (req, res) {

    var imageFile = typeof req.files.image !== "undefined" ? req.files.image.name : "";

    // req.checkBody('name', 'Name must have a value.').notEmpty();
    // req.checkBody('content', 'Content must have a value.').notEmpty();
    // req.checkBody('image', 'You must upload an image').isImage(imageFile);

    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();
    var content = req.body.content;
    var words = content.split(" ").slice(0,25).join(" ");
    var date = req.body.date;

    // var errors = req.validationErrors();

    // if (errors) {
    //     Testimonial.find(function (err, testimonials) {
    //         res.render('admin/add_testimonial', {
    //             errors: errors,
    //             name: name,
    //             content: content,
    //         });
    //     });
    // } else {
                var judgement = new Judgement({
                    title: title,
                    slug: slug,
                    content: content,
                    date:date,
                    words:words,
                    image: imageFile
                });

                judgement.save(function (err) {
                    if (err)
                        return console.log(err);

                    mkdirp('public/judgement_images/' + judgement._id, function (err) {
                        return console.log(err);
                    });

                    mkdirp('public/judgement_images/' + judgement._id + '/gallery', function (err) {
                        return console.log(err);
                    });

                    if (imageFile != "") {
                        var judgementImage = req.files.image;
                        var path = 'public/judgement_images/' + judgement._id + '/' + imageFile;

                        judgementImage.mv(path, function (err) {
                            return console.log(err);
                        });
                    }

                    req.flash('success', 'Judgement added!');
                    res.redirect('/admin/judgements');
                });
            }
    );
/*
 * POST add product
 */
router.post('/admin/vlog/add-vlog', function (req, res) {

    var imageFile = typeof req.files.image !== "undefined" ? req.files.image.name : "";

    // req.checkBody('name', 'Name must have a value.').notEmpty();
    // req.checkBody('content', 'Content must have a value.').notEmpty();
    // req.checkBody('image', 'You must upload an image').isImage(imageFile);

    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();
    var content = req.body.content;
    var words = content.split(" ").slice(0,25).join(" ");
    var date = req.body.date;
    var videolink = req.body.videolink;

    // var errors = req.validationErrors();

    // if (errors) {
    //     Testimonial.find(function (err, testimonials) {
    //         res.render('admin/add_testimonial', {
    //             errors: errors,
    //             name: name,
    //             content: content,
    //         });
    //     });
    // } else {
                var vlog = new Vlog({
                    title: title,
                    slug: slug,
                    content: content,
                    date:date,
                    words:words,
                    image: imageFile,
                    videolink:videolink
                });

                vlog.save(function (err) {
                    if (err)
                        return console.log(err);

                    mkdirp('public/vlog_images/' + vlog._id, function (err) {
                        return console.log(err);
                    });

                    mkdirp('public/vlog_images/' + vlog._id + '/gallery', function (err) {
                        return console.log(err);
                    });

                    if (imageFile != "") {
                        var vlogImage = req.files.image;
                        var path = 'public/vlog_images/' + vlog._id + '/' + imageFile;

                        vlogImage.mv(path, function (err) {
                            return console.log(err);
                        });
                    }

                    req.flash('success', 'vlog added!');
                    res.redirect('/admin/vlogs');
                });
            }
    );

/*
 * GET edit product
 */
router.get('/admin/testimonial/edit-testimonial/:id', function (req, res) {

    var errors;

    if (req.session.errors)
        errors = req.session.errors;
    req.session.errors = null;
    Testimonial.findById(req.params.id, function (err, p) {
            if (err) {
                console.log(err);
                res.redirect('/admin/testimonials');
            } else {
                var galleryDir = 'public/testimonial_images/' + p._id + '/gallery';
                var galleryImages = null;

                fs.readdir(galleryDir, function (err, files) {
                    if (err) {
                        console.log(err);
                    } else {
                        galleryImages = files;

                        res.render('admin/edit_testimonial', {
                            name: p.name,
                            errors: errors,
                            content: p.content,
                            image: p.image,
                            words:p.words,
                            galleryImages: galleryImages,
                            id: p._id
                        });
                    }
                });
            }
        });

    });
    router.get('/admin/blog/edit-blog/:id', function (req, res) {

        var errors;
    
        if (req.session.errors)
            errors = req.session.errors;
        req.session.errors = null;
        Blog.findById(req.params.id, function (err, p) {
                if (err) {
                    console.log(err);
                    res.redirect('/admin/blogs');
                } else {
                    var galleryDir = 'public/blog_images/' + p._id + '/gallery';
                    var galleryImages = null;
    
                    fs.readdir(galleryDir, function (err, files) {
                        if (err) {
                            console.log(err);
                        } else {
                            galleryImages = files;
    
                            res.render('admin/edit_blog', {
                                title: p.title,
                                errors: errors,
                                content: p.content,
                                image: p.image,
                                date:p.date,
                                words:p.words,
                                galleryImages: galleryImages,
                                id: p._id
                            });
                        }
                    });
                }
            });
    
        });
        router.get('/admin/photo/edit-photo/:id', function (req, res) {

            var errors;
        
            if (req.session.errors)
                errors = req.session.errors;
            req.session.errors = null;
            Photo.findById(req.params.id, function (err, p) {
                    if (err) {
                        console.log(err);
                        res.redirect('/admin/photos');
                    } else {
                        var galleryDir = 'public/photo_images/' + p._id + '/gallery';
                        var galleryImages = null;
        
                        fs.readdir(galleryDir, function (err, files) {
                            if (err) {
                                console.log(err);
                            } else {
                                galleryImages = files;
        
                                res.render('admin/edit_photo', {
                                    title: p.title,
                                    errors: errors,
                                    content: p.content,
                                    image: p.image,
                                    date:p.date,
                                    galleryImages: galleryImages,
                                    id: p._id
                                });
                            }
                        });
                    }
                });
        
            });
        router.get('/admin/judgement/edit-judgement/:id', function (req, res) {

            var errors;
        
            if (req.session.errors)
                errors = req.session.errors;
            req.session.errors = null;
            Judgement.findById(req.params.id, function (err, p) {
                    if (err) {
                        console.log(err);
                        res.redirect('/admin/judgements');
                    } else {
                        var galleryDir = 'public/judgement_images/' + p._id + '/gallery';
                        var galleryImages = null;
        
                        fs.readdir(galleryDir, function (err, files) {
                            if (err) {
                                console.log(err);
                            } else {
                                galleryImages = files;
        
                                res.render('admin/edit_judgement', {
                                    title: p.title,
                                    errors: errors,
                                    content: p.content,
                                    image: p.image,
                                    date:p.date,
                                    words:p.words,
                                    galleryImages: galleryImages,
                                    id: p._id
                                });
                            }
                        });
                    }
                });
        
            });
        router.get('/admin/vlog/edit-vlog/:id', function (req, res) {

            var errors;
        
            if (req.session.errors)
                errors = req.session.errors;
            req.session.errors = null;
            Vlog.findById(req.params.id, function (err, p) {
                    if (err) {
                        console.log(err);
                        res.redirect('/admin/vlogs');
                    } else {
                        var galleryDir = 'public/vlog_images/' + p._id + '/gallery';
                        var galleryImages = null;
        
                        fs.readdir(galleryDir, function (err, files) {
                            if (err) {
                                console.log(err);
                            } else {
                                galleryImages = files;
        
                                res.render('admin/edit_vlog', {
                                    title: p.title,
                                    errors: errors,
                                    content: p.content,
                                    image: p.image,
                                    date:p.date,
                                    videolink:p.videolink,
                                    words:p.words,
                                    galleryImages: galleryImages,
                                    id: p._id
                                });
                            }
                        });
                    }
                });
        
            });
        
/*
 * POST edit product
 */
router.post('/admin/testimonial/edit-testimonial/:id', function (req, res) {

    if (req.files !== null) {
        var imageFile = typeof req.files.image !== 'undefined' ? req.files.image.name : '';
      } else {
        var imageFile = '';
      }

    // req.checkBody('name', 'Name must have a value.').notEmpty();
    // req.checkBody('content', 'Content must have a value.').notEmpty();
    // req.checkBody('image', 'You must upload an image').isImage(imageFile);

    var name = req.body.name;
    var slug = name.replace(/\s+/g, '-').toLowerCase();
    var content = req.body.content;
    var words = content.split(" ").slice(0,25).join(" ");
    var pimage = req.body.pimage;
    var id = req.params.id;

    // var errors = req.validationErrors();

    // if (errors) {
    //     req.session.errors = errors;
    //     res.redirect('/admin/testimonial/edit-tesimonial/' + id);
    // } else {
        Testimonial.findOne({slug: slug, _id: {'$ne': id}}, function (err, p) {
            if (err)
                console.log(err);
            else {
                Testimonial.findById(id, function (err, p) {
                    if (err)
                        console.log(err);

                    p.name = name;
                    p.slug = slug;
                    p.words = words;
                    p.content = content;
                    if (imageFile != "") {
                        p.image = imageFile;
                    }

                    p.save(function (err) {
                        if (err)
                            console.log(err);

                        if (imageFile != "") {
                            if (pimage != "") {
                                fs.remove('public/testimonial_images/' + id + '/' + pimage, function (err) {
                                    if (err)
                                        console.log(err);
                                });
                            }

                            var testimonialImage = req.files.image;
                            var path = 'public/testimonial_images/' + id + '/' + imageFile;

                            testimonialImage.mv(path, function (err) {
                                return console.log(err);
                            });
                            Testimonial.find({}).sort({sorting: 1}).exec(function (err, testimonials) {
                                if (err) {
                                        console.log(err);
                                } else {
                                        req.app.locals.testimonials = testimonials;
                                }
                                });
                        

                        }

                        req.flash('success', 'Testimonial edited!');
                        res.redirect('/admin/testimonial/edit-testimonial/' + id);
                    });

                });
            }
        });
    }

);
router.post('/admin/blog/edit-blog/:id', function (req, res) {

    if (req.files !== null) {
        var imageFile = typeof req.files.image !== 'undefined' ? req.files.image.name : '';
      } else {
        var imageFile = '';
      }
    // req.checkBody('name', 'Name must have a value.').notEmpty();
    // req.checkBody('content', 'Content must have a value.').notEmpty();
    // req.checkBody('image', 'You must upload an image').isImage(imageFile);

    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();
    var content = req.body.content;
    var words = content.split(" ").slice(0,25).join(" ");
    var date = req.body.date;
    var pimage = req.body.pimage;
    var id = req.params.id;

    // var errors = req.validationErrors();

    // if (errors) {
    //     req.session.errors = errors;
    //     res.redirect('/admin/testimonial/edit-tesimonial/' + id);
    // } else {
        Blog.findOne({slug: slug, _id: {'$ne': id}}, function (err, p) {
            if (err)
                console.log(err);
            else {
                Blog.findById(id, function (err, p) {
                    if (err)
                        console.log(err);

                    p.title = title;
                    p.slug = slug;
                    p.content = content;
                    p.date = date;
                    p.words = words;
                    if (imageFile != "") {
                        p.image = imageFile;
                    }

                    p.save(function (err) {
                        if (err)
                            console.log(err);

                        if (imageFile != "") {
                            if (pimage != "") {
                                fs.remove('public/blog_images/' + id + '/' + pimage, function (err) {
                                    if (err)
                                        console.log(err);
                                });
                            }

                            var blogImage = req.files.image;
                            var path = 'public/blog_images/' + id + '/' + imageFile;

                            blogImage.mv(path, function (err) {
                                return console.log(err);
                            });
                            Blog.find({}).sort({sorting: 1}).exec(function (err, blogs) {
                                if (err) {
                                        console.log(err);
                                } else {
                                        req.app.locals.blogs = blogs;
                                }
                                });
                        

                        }

                        req.flash('success', 'Blog edited!');
                        res.redirect('/admin/blog/edit-blog/' + id);
                    });

                });
            }
        });
    }

);
router.post('/admin/photo/edit-photo/:id', function (req, res) {

    if (req.files !== null) {
        var imageFile = typeof req.files.image !== 'undefined' ? req.files.image.name : '';
      } else {
        var imageFile = '';
      }
    // req.checkBody('name', 'Name must have a value.').notEmpty();
    // req.checkBody('content', 'Content must have a value.').notEmpty();
    // req.checkBody('image', 'You must upload an image').isImage(imageFile);

    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();
    var content = req.body.content;
    var date = req.body.date;
    var pimage = req.body.pimage;
    var id = req.params.id;

    // var errors = req.validationErrors();

    // if (errors) {
    //     req.session.errors = errors;
    //     res.redirect('/admin/testimonial/edit-tesimonial/' + id);
    // } else {
        Photo.findOne({slug: slug, _id: {'$ne': id}}, function (err, p) {
            if (err)
                console.log(err);
            else {
                Photo.findById(id, function (err, p) {
                    if (err)
                        console.log(err);

                    p.title = title;
                    p.slug = slug;
                    p.content = content;
                    p.date = date;
                    if (imageFile != "") {
                        p.image = imageFile;
                    }

                    p.save(function (err) {
                        if (err)
                            console.log(err);

                        if (imageFile != "") {
                            if (pimage != "") {
                                fs.remove('public/photo_images/' + id + '/' + pimage, function (err) {
                                    if (err)
                                        console.log(err);
                                });
                            }

                            var photoImage = req.files.image;
                            var path = 'public/photo_images/' + id + '/' + imageFile;

                            photoImage.mv(path, function (err) {
                                return console.log(err);
                            });
                            Photo.find({}).sort({sorting: 1}).exec(function (err, photos) {
                                if (err) {
                                        console.log(err);
                                } else {
                                        req.app.locals.photos = photos;
                                }
                                });
                        

                        }

                        req.flash('success', 'Photo edited!');
                        res.redirect('/admin/photo/edit-photo/' + id);
                    });

                });
            }
        });
    }

);
router.post('/admin/judgement/edit-judgement/:id', function (req, res) {

    if (req.files !== null) {
        var imageFile = typeof req.files.image !== 'undefined' ? req.files.image.name : '';
      } else {
        var imageFile = '';
      }
    // req.checkBody('name', 'Name must have a value.').notEmpty();
    // req.checkBody('content', 'Content must have a value.').notEmpty();
    // req.checkBody('image', 'You must upload an image').isImage(imageFile);

    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();
    var content = req.body.content;
    var words = content.split(" ").slice(0,25).join(" ");
    var date = req.body.date;
    var pimage = req.body.pimage;
    var id = req.params.id;

    // var errors = req.validationErrors();

    // if (errors) {
    //     req.session.errors = errors;
    //     res.redirect('/admin/testimonial/edit-tesimonial/' + id);
    // } else {
        Judgement.findOne({slug: slug, _id: {'$ne': id}}, function (err, p) {
            if (err)
                console.log(err);
            else {
                Judgement.findById(id, function (err, p) {
                    if (err)
                        console.log(err);

                    p.title = title;
                    p.slug = slug;
                    p.content = content;
                    p.date = date;
                    p.words = words;
                    if (imageFile != "") {
                        p.image = imageFile;
                    }

                    p.save(function (err) {
                        if (err)
                            console.log(err);

                        if (imageFile != "") {
                            if (pimage != "") {
                                fs.remove('public/judgement_images/' + id + '/' + pimage, function (err) {
                                    if (err)
                                        console.log(err);
                                });
                            }

                            var judgementImage = req.files.image;
                            var path = 'public/judgement_images/' + id + '/' + imageFile;

                            judgementImage.mv(path, function (err) {
                                return console.log(err);
                            });
                            Judgement.find({}).sort({sorting: 1}).exec(function (err, judgements) {
                                if (err) {
                                        console.log(err);
                                } else {
                                        req.app.locals.judgements = judgements;
                                }
                                });
                        

                        }

                        req.flash('success', 'Judgement edited!');
                        res.redirect('/admin/judgement/edit-judgement/' + id);
                    });

                });
            }
        });
    }

);
router.post('/admin/vlog/edit-vlog/:id', function (req, res) {

    if (req.files !== null) {
        var imageFile = typeof req.files.image !== 'undefined' ? req.files.image.name : '';
      } else {
        var imageFile = '';
      }
    // req.checkBody('name', 'Name must have a value.').notEmpty();
    // req.checkBody('content', 'Content must have a value.').notEmpty();
    // req.checkBody('image', 'You must upload an image').isImage(imageFile);

    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();
    var content = req.body.content;
    var videolink = req.body.videolink;
    var words = content.split(" ").slice(0,25).join(" ");
    var date = req.body.date;
    var pimage = req.body.pimage;
    var id = req.params.id;

    // var errors = req.validationErrors();

    // if (errors) {
    //     req.session.errors = errors;
    //     res.redirect('/admin/testimonial/edit-tesimonial/' + id);
    // } else {
        Vlog.findOne({slug: slug, _id: {'$ne': id}}, function (err, p) {
            if (err)
                console.log(err);
            else {
                Vlog.findById(id, function (err, p) {
                    if (err)
                        console.log(err);

                    p.title = title;
                    p.slug = slug;
                    p.content = content;
                    p.date = date;
                    p.videolink=videolink;
                    p.words = words;
                    if (imageFile != "") {
                        p.image = imageFile;
                    }

                    p.save(function (err) {
                        if (err)
                            console.log(err);

                        if (imageFile != "") {
                            if (pimage != "") {
                                fs.remove('public/vlog_images/' + id + '/' + pimage, function (err) {
                                    if (err)
                                        console.log(err);
                                });
                            }

                            var vlogImage = req.files.image;
                            var path = 'public/vlog_images/' + id + '/' + imageFile;

                            vlogImage.mv(path, function (err) {
                                return console.log(err);
                            });
                            Vlog.find({}).sort({sorting: 1}).exec(function (err, vlogs) {
                                if (err) {
                                        console.log(err);
                                } else {
                                        req.app.locals.vlogs = vlogs;
                                }
                                });
                        

                        }

                        req.flash('success', 'Vlog edited!');
                        res.redirect('/admin/vlog/edit-vlog/' + id);
                    });

                });
            }
        });
    }

);
/*
 * POST product gallery
 */
router.post('/admin/testimonial/testimonial-gallery/:id', function (req, res) {
    if (req.files !== null) {
        var imageFile = typeof req.files.image !== 'undefined' ? req.files.image.name : '';
      } else {
        var imageFile = '';
      }
    var testimonialImage = req.files.file;
    var id = req.params.id;
    var path = 'public/testimonial_images/' + id + '/gallery/' + req.files.file.name;
    var thumbsPath = 'public/testimonial_images/' + id + '/gallery/thumbs/' + req.files.file.name;

    testimonialImage.mv(path, function (err) {
        if (err)
            console.log(err);

        resizeImg(fs.readFileSync(path), {width: 100, height: 100}).then(function (buf) {
            fs.writeFileSync(thumbsPath, buf);
        });
    });

    res.sendStatus(200);

});
router.post('/admin/blog/blog-gallery/:id', function (req, res) {

    var blogImage = req.files.file;
    var id = req.params.id;
    var path = 'public/blog_images/' + id + '/gallery/' + req.files.file.name;
    var thumbsPath = 'public/blog_images/' + id + '/gallery/thumbs/' + req.files.file.name;

    blogImage.mv(path, function (err) {
        if (err)
            console.log(err);

        resizeImg(fs.readFileSync(path), {width: 100, height: 100}).then(function (buf) {
            fs.writeFileSync(thumbsPath, buf);
        });
    });

    res.sendStatus(200);

});

router.post('/admin/photo/photo-gallery/:id', function (req, res) {

    var photoImage = req.files.file;
    var id = req.params.id;
    var path = 'public/photo_images/' + id + '/gallery/' + req.files.file.name;
    var thumbsPath = 'public/photo_images/' + id + '/gallery/thumbs/' + req.files.file.name;

    photoImage.mv(path, function (err) {
        if (err)
            console.log(err);

        resizeImg(fs.readFileSync(path), {width: 100, height: 100}).then(function (buf) {
            fs.writeFileSync(thumbsPath, buf);
        });
    });

    res.sendStatus(200);

});

router.post('/admin/judgement/judgement-gallery/:id', function (req, res) {

    var judgementImage = req.files.file;
    var id = req.params.id;
    var path = 'public/judgement_images/' + id + '/gallery/' + req.files.file.name;
    var thumbsPath = 'public/judgement_images/' + id + '/gallery/thumbs/' + req.files.file.name;

    judgementImage.mv(path, function (err) {
        if (err)
            console.log(err);

        resizeImg(fs.readFileSync(path), {width: 100, height: 100}).then(function (buf) {
            fs.writeFileSync(thumbsPath, buf);
        });
    });

    res.sendStatus(200);

});

router.post('/admin/vlog/vlog-gallery/:id', function (req, res) {

    var vlogImage = req.files.file;
    var id = req.params.id;
    var path = 'public/vlog_images/' + id + '/gallery/' + req.files.file.name;
    var thumbsPath = 'public/vlog_images/' + id + '/gallery/thumbs/' + req.files.file.name;

    vlogImage.mv(path, function (err) {
        if (err)
            console.log(err);

        resizeImg(fs.readFileSync(path), {width: 100, height: 100}).then(function (buf) {
            fs.writeFileSync(thumbsPath, buf);
        });
    });

    res.sendStatus(200);

});

/*
 * GET delete image
 */
router.get('/admin/testimonial/delete-image/:image', function (req, res) {

    var originalImage = 'public/testimonial_images/' + req.query.id + '/gallery/' + req.params.image;
    var thumbImage = 'public/testimonial_images/' + req.query.id + '/gallery/thumbs/' + req.params.image;

    fs.remove(originalImage, function (err) {
        if (err) {
            console.log(err);
        } else {
            fs.remove(thumbImage, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    req.flash('success', 'Image deleted!');
                    res.redirect('/admin/testimonial/edit-testimonial/' + req.query.id);
                }
            });
        }
    });
});
router.get('/admin/blog/delete-image/:image', function (req, res) {

    var originalImage = 'public/blog_images/' + req.query.id + '/gallery/' + req.params.image;
    var thumbImage = 'public/blog_images/' + req.query.id + '/gallery/thumbs/' + req.params.image;

    fs.remove(originalImage, function (err) {
        if (err) {
            console.log(err);
        } else {
            fs.remove(thumbImage, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    req.flash('success', 'Image deleted!');
                    res.redirect('/admin/blog/edit-blog/' + req.query.id);
                }
            });
        }
    });
});
router.get('/admin/photo/delete-image/:image', function (req, res) {

    var originalImage = 'public/photo_images/' + req.query.id + '/gallery/' + req.params.image;
    var thumbImage = 'public/photo_images/' + req.query.id + '/gallery/thumbs/' + req.params.image;

    fs.remove(originalImage, function (err) {
        if (err) {
            console.log(err);
        } else {
            fs.remove(thumbImage, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    req.flash('success', 'Images deleted!');
                    res.redirect('/admin/photo/edit-photo/' + req.query.id);
                }
            });
        }
    });
});
router.get('/admin/judgement/delete-image/:image', function (req, res) {

    var originalImage = 'public/judgement_images/' + req.query.id + '/gallery/' + req.params.image;
    var thumbImage = 'public/judgement_images/' + req.query.id + '/gallery/thumbs/' + req.params.image;

    fs.remove(originalImage, function (err) {
        if (err) {
            console.log(err);
        } else {
            fs.remove(thumbImage, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    req.flash('success', 'Image deleted!');
                    res.redirect('/admin/judgement/edit-judgement/' + req.query.id);
                }
            });
        }
    });
});
router.get('/admin/vlog/delete-image/:image', function (req, res) {

    var originalImage = 'public/vlog_images/' + req.query.id + '/gallery/' + req.params.image;
    var thumbImage = 'public/vlog_images/' + req.query.id + '/gallery/thumbs/' + req.params.image;

    fs.remove(originalImage, function (err) {
        if (err) {
            console.log(err);
        } else {
            fs.remove(thumbImage, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    req.flash('success', 'Image deleted!');
                    res.redirect('/admin/vlog/edit-vlog/' + req.query.id);
                }
            });
        }
    });
});
/*
 * GET delete product
 */
router.get('/admin/testimonial/delete-testimonial/:id',function (req, res) {

    var id = req.params.id;
    var path = 'public/testimonial_images/' + id;

    fs.remove(path, function (err) {
        if (err) {
            console.log(err);
        } else {
            Testimonial.findByIdAndRemove(id, function (err) {
                console.log(err);
            });
            
            req.flash('success', 'Testimonial deleted!');
            res.redirect('/admin/testimonials');
        }
    });

});
/*
 * GET delete product
 */
router.get('/admin/blog/delete-blog/:id',function (req, res) {

    var id = req.params.id;
    var path = 'public/blog_images/' + id;

    fs.remove(path, function (err) {
        if (err) {
            console.log(err);
        } else {
            Blog.findByIdAndRemove(id, function (err) {
                console.log(err);
            });
            
            req.flash('success', 'Blog deleted!');
            res.redirect('/admin/blogs');
        }
    });

});
/*
 * GET delete product
 */
router.get('/admin/photo/delete-photo/:id',function (req, res) {

    var id = req.params.id;
    var path = 'public/photo_images/' + id;

    fs.remove(path, function (err) {
        if (err) {
            console.log(err);
        } else {
            Photo.findByIdAndRemove(id, function (err) {
                console.log(err);
            });
            
            req.flash('success', 'Photo deleted!');
            res.redirect('/admin/photos');
        }
    });

});

router.get('/admin/judgement/delete-judgement/:id',function (req, res) {

    var id = req.params.id;
    var path = 'public/judgement_images/' + id;

    fs.remove(path, function (err) {
        if (err) {
            console.log(err);
        } else {
            Judgement.findByIdAndRemove(id, function (err) {
                console.log(err);
            });
            
            req.flash('success', 'Judgement deleted!');
            res.redirect('/admin/judgements');
        }
    });

});
/*
 * GET delete product
 */
router.get('/admin/vlog/delete-vlog/:id',function (req, res) {

    var id = req.params.id;
    var path = 'public/vlog_images/' + id;

    fs.remove(path, function (err) {
        if (err) {
            console.log(err);
        } else {
            Vlog.findByIdAndRemove(id, function (err) {
                console.log(err);
            });
            
            req.flash('success', 'vlog deleted!');
            res.redirect('/admin/vlogs');
        }
    });

});
router.get('/blogs/:blog', function (req, res) {
    var galleryImages = null;
    Blog.findOne({slug: req.params.blog}, function (err, blog) {
        if (err) {
            console.log(err);
        } else {
            var galleryDir = 'public/blog_images/' + blog._id + '/gallery';

            fs.readdir(galleryDir, function (err, files) {
                if (err) {
                    console.log(err);
                } else {
                    galleryImages = files;
                    Blog.find(function (err, blogss) {
                    res.render('blog', {
                        title: blog.title,
                        blogs:blog,
                        content:blog.content,
                        date:blog.date,
                        galleryImages: galleryImages,
                        blogss:blogss
                    });
                });
                }
            });
        }
    });

});
router.get('/vlogs/:vlog', function (req, res) {
    var galleryImages = null;
    Vlog.findOne({slug: req.params.vlog}, function (err, vlog) {
        if (err) {
            console.log(err);
        } else {
            var galleryDir = 'public/vlog_images/' + vlog._id + '/gallery';

            fs.readdir(galleryDir, function (err, files) {
                if (err) {
                    console.log(err);
                } else {
                    galleryImages = files;
                    Vlog.find(function (err, vlogss) {
                    res.render('vlog', {
                        title: vlog.title,
                        vlogs:vlog,
                        content:vlog.content,
                        date:vlog.date,
                        galleryImages: galleryImages,
                        vlogss:vlogss
                    });
                });
                }
            });
        }
    });

});
router.get('/gallery',function (req, res) {
            Photo.find(function (err, photos) {
                res.render('gallery', {
                    photos:photos,
        });
});
});
router.get('/contact',function (req, res) {
        res.render('contact');
});
// Exports
module.exports = router;