var mongoose = require("mongoose");
var express = require("express");
mongoose.connect("mongodb+srv://testUser:testPassword@cluster0.kabd5.mongodb.net/profileDB?retryWrites=true&w=majority");

var xpSchema = new mongoose.Schema({
    company:   String,
    title:     String,
    location:  String,
    startDate: String,
    endDate:   String,
 });

 var Experience = mongoose.model("Experience", xpSchema);

 var app = express();

 app.get("/create", function(req, res) {
    var xp = new Experience({
        company:   "Penn State Campus Recreation",
        title:     "Head-Lifeguard",
        location:  "University Park, PA",
        startDate: "Sept 2018",
        endDate:   "Nov 2019",
    });

    stu.save(function(err, stu) {
        res.send("Experience with " + xp.id + " was saved.");  
     });  
  });

  app.listen(3000);
module.exports = mongoose;