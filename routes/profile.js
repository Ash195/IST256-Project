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

router.get('/experiences/delete', function(req, res, next){
    Experience.findByIdAndRemove(req.query.id, function(err, data) {
        if (data === null) {
           console.log("No data found");
        } 
        else {
           res.send("Experience deleted");
        }
     });
})

module.exports = router;