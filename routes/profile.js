var express = require('express');
var router = express.Router();
var Experience = require("../models/experience");
var Person = require("../models/person");
var CurrentUser = require("../models/currentUser");

//this entire file is looking for /profile
//this specifically looks for /profile/create
router.get('/create', function(req, res, next){
   let skills = [];
   let index = 0;
   let index2 = 1;
   let text = req.query.skills;
   let length = text.length;
   let skillLength = 0;
   //gibberish cuz u cant put array into url
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
   //creates an Experience object from variables in url
   var xp = new Experience({
      company:   req.query.company,
      title:     req.query.title,
      location:  req.query.location,
      startDate: req.query.start,
      endDate:   req.query.end,
  });
   let exp = [xp];
  //creates person object and saves it
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

//looks for /profile/person and returns all person objects
router.get('/people',function(req, res, next){
   Person.find({}, function(err, data){
      if (data === null) {
         console.log("No person found");
      }
      else {
         res.send(data)
      }
   })
});

//look for a specific person if given username
router.get('/person', function(req, res, next){
   Person.findOne({"username": req.query.user}, function(err, data){
      if (data === null){
         console.log("No data found");
      }
      else{
         res.send(data);
      }
   });
})

router.get('/person/createXP', function(req, res, next){
   var exp = [];
   Person.findOne({"username": req.query.user}, function(err, data){
      if (data === null){
         console.log("No data found");
      }
      else{
         exp = data.experiences;
         var xp = new Experience({
            company:   req.query.company,
            title:     req.query.title,
            location:  req.query.location,
            startDate: req.query.start,
            endDate:   req.query.end,
         });
         exp.push(xp);
         Person.updateOne({"username": req.query.user}, {"experiences": exp}, function(err, data){
            if (data === null){
               console.log("No data found");
            }
            else{
               res.send("Experience created");
            }
         });
      }
   }); 
})

//looks for /profile/person/experiences - this returns all experience objects
router.get('/person/experiences', function(req, res, next){
   Person.findOne({"username": req.query.user}, function(err, data){
      if (data === null){
         console.log("No data found");
      }
      else{
         res.send(data.experiences);
      }
   });
})

//this looks for a specific experience if given an id
router.get('/person/experience', function(req, res, next){
   Person.findOne({"username": req.query.user}, function(err, data) {
       if (data === null) {
          console.log("No data found");
       } 
       else {
          var xp;
          for(let i = 0; i < data.experiences.length; i++){
             if(data.experiences[i]._id == req.query.id){
                xp = data.experiences[i];
             }
          }
          res.send(xp);
       }
    });
})

//deletes experience if given id
router.get('/person/experiences/delete', function(req, res, next){
    Person.findOne({"username": req.query.user}, function(err, data) {
        if (data === null) {
           console.log("No data found");
        } 
        else {
           let exp = data.experiences;
           let index = 0;
           for(let i = 0; i < exp.length; i++){
               if(exp[i]._id == req.query.id){
                  index = i;
               }
           }
           exp.splice(index, 1);
           Person.updateOne({"username": req.query.user}, {"experiences": exp}, function(err, data){
            if (data === null){
               console.log("No data found");
            }
            else{
               res.send("Experience deleted");
            }
         });
        }
     });
})
//updates experience if given id and variables
router.get('/person/experiences/update', function(req, res, next){
   Person.findOne({"username": req.query.user}, function(err, data) {
      if (data === null) {
         console.log("No data found");
      } 
      else {
         var exp = data.experiences;
         var xp;
         for(let i = 0; i < exp.length; i++){
            if(exp[i]._id == req.query.id){
               xp = exp[i];
            }
         }
         xp.title = req.query.title;
         xp.company = req.query.company;
         xp.location = req.query.location;
         xp.startDate = req.query.start;
         xp.endDate = req.query.end;
         Person.updateOne({"username": req.query.user}, {"experiences": exp}, function(err, data){
            if (data === null){
               console.log("No data found");
            }
            else{
               res.send("Experience updated");
            }
         });
      }
   });
})

router.get('/person/skills', function(req, res, next){
   Person.findOne({"username": req.query.user}, function(err, data){
      if (data === null){
         console.log("No data found");
      }
      else{
         res.send(data.skills);
      }
   });
})

router.get('/person/skills/add', function(req, res, next){
   Person.findOne({"username": req.query.user}, function(err, data){
      if (data === null){
         console.log("No data found");
      }
      else{
         let skills = data.skills;
         skills.push(req.query.skill);
         Person.updateOne({"username": req.query.user}, {"skills": skills}, function(err, data){
            if (data === null){
               console.log("No data found");
            }
            else{
               res.send("Skill added");
            }
         });
      }
   });
})

router.get('/person/skills/delete', function(req, res, next){
   Person.findOne({"username": req.query.user}, function(err, data){
      if (data === null){
         console.log("No data found");
      }
      else{
         let skills = data.skills;
         skills.splice(req.query.index, 1);
         Person.updateOne({"username": req.query.user}, {"skills": skills}, function(err, data){
            if (data === null){
               console.log("No data found");
            }
            else{
               res.send("Skill removed");
            }
         });
      }
   });
})

router.get('/login', function(req, res, next){
   CurrentUser.updateOne({}, {"user": req.query.user}, function(err, data) {
       if (data === null) {
          console.log("No data found");
       } 
       else {
          res.send("Current user updated");
       }
    });
})

router.get('/findCurrentUser', function(req, res, next){
   CurrentUser.findOne({}, function(err, data) {
       if (data === null) {
          console.log("No data found");
       } 
       else {
         Person.findOne({"username": data.user}, function(err, data){
            if (data === null){
               console.log("No data found");
            }
            else{
               res.send(data);
            }
         });
       }
    });
})

module.exports = router;