var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
var Experience = require("./models/experience");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public'), {extensions: 'html'}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post("/create", function(req, res) {
    var xp = new Experience({
        company:   req.body.company,
        title:     req.body.title,
        location:  req.body.location,
        startDate: req.body.startDate,
        endDate:   req.body.endDate,
    });

    xp.save(function(err, xp) {
        res.send("Experience with " + xp.id + " was saved.");  
        console.log(xp);
     });  
  });

module.exports = app;
