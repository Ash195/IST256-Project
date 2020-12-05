var db = require("../db");

var Experience = db.model("Experience", {
    company:   String,
    title:     String,
    location:  String,
    startDate: String,
    endDate:   String,
});

module.exports = Experience;