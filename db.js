var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://testUser:testPassword@cluster0.kabd5.mongodb.net/profileDB?retryWrites=true&w=majority");
module.exports = mongoose;