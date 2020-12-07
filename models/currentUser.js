var db = require("../db");

var CurrentUser = db.model("CurrentUser", {
    user: String
});

module.exports = CurrentUser;