var express = require('express');
var router = express.Router();
var Experience = require("../models/experience");
var Person = require("../models/person");

router.get('/create', function(req, res, next){
   let skills = [];
   let index = 0;
   let index2 = 1;
   let text = req.query.skills;
   let length = text.length;
   let skillLength = 0;
   for(let i = 0; i < req.query.count; i++) {
      index = text.indexOf("_", skillLength) + 1;
      index2 = text.indexOf("_", index);
      if(index2 == -1) {
         index2 = length;
      }
      let skill = text.substring(index, index2);
      skillLength += skill.length;
      skills.push(skill);
      console.log("Skill length: " + skillLength + "index: " + index + "index2: " + index2);
   }
   var xp = new Experience({
      company:   req.query.company,
      title:     req.query.title,
      location:  req.query.location,
      startDate: req.query.start,
      endDate:   req.query.end,
  });
  xp.save(function(err, person) {
   console.log(xp._id);
   });  

  let exp = [xp];
  var person = new Person({
      firstName:   req.query.fName,
      lastName:    req.query.lName,
      username:    req.query.username,
      password:    req.query.password,
      major:       req.query.major,
      experiences: exp,
      skills:      skills
  });

  person.save(function(err, person) {
      res.send("Person created");  
   });  
})

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