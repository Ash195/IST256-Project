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

router.get('/experience', function(req, res, next){
   Experience.findById(req.query.id, function(err, data) {
       if (data === null) {
          console.log("No data found");
       } 
       else {
          res.send(data);
       }
    });
})

router.get("/experiences/create", function(req, res) {
   var xp = new Experience({
       company:   req.query.company,
       title:     req.query.title,
       location:  req.query.location,
       startDate: req.query.start,
       endDate:   req.query.end,
   });

   xp.save(function(err, xp) {
       res.send("Experience created");  
    });  
 });

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

router.get('/experiences/update', function(req, res, next){
   Experience.findByIdAndUpdate(req.query.id, {
      "$set": {
         "title": req.query.title,
         "company": req.query.company,
         "location": req.query.location,
         "startDate": req.query.start,
         "endDate": req.query.end
      }
   },function(err, data) {
       if (data === null) {
          console.log("No data found");
       } 
       else {
          res.send("Experience updated");
       }
    });
})

module.exports = router;