var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://testUser:testPassword@cluster0.kabd5.mongodb.net/profileDB?retryWrites=true&w=majority", {useNewUrlParser: true},
{server: {
    ssl:        false,
    sslValidate:false
}});
module.exports = mongoose;