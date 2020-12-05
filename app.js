var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
var Experience = require("./models/experience");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var profileRouter = require('./routes/profile');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public'), {extensions: 'html'}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);

app.post("/create", function(req, res) {
    var xp = new Experience({
        company:   req.body.company,
        title:     req.body.title,
        location:  req.body.location,
        startDate: req.body.startDate,
        endDate:   req.body.endDate,
    });

    xp.save(function(err, xp) {
        res.send("New experience saved. Click the back button and refresh the page to view the new experience.");  
     });  
  });

module.exports = app;
