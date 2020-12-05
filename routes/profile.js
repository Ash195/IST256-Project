var express = require('express');
var router = express.Router();
var Experience = require("../models/experience");

router.get('/experiences', function(req, res, next){
    Experience.find({}, function(err, data) {
        if (data === null) {
           console.log("No data found");
        } 
        else {
           res.send(data);
        }
     });
})

module.exports = router;