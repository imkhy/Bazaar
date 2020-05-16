var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = mongoose.Schema({
	username : String,
	password : String,
	address : [
		{
			house : String,
			street : String,
			landmark : String,
			area : String,
			city : String,
			state : String,
			country : String,
			pincode : Number
		}
	],
	phone : Number
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);