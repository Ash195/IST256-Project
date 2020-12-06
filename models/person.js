var db = require("../db");
var Experience = require("/experience");

var Person = db.model("Person", {
    firstName:   String,
    lastName:     String,
    username:  String,
    password: String,
    major:   String,
    experiences: [Experience],
    skills: []
});

module.exports = Person;