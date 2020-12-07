var db = require("../db");

var Person = db.model("Person", {
    firstName:   String,
    lastName:    String,
    username:    String,
    password:    String,
    major:       String,
    experiences: [],
    skills:      []
});

module.exports = Person;