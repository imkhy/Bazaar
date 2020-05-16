var mongoose = require("mongoose");

var cartSchema = mongoose.Schema({
	userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
	  required : true,
	  index : true
    },
	products : 
	[
		{
		name : String,
		img : String,
		price : Number,
		quantity : Number
		}
	],
	itemCount : Number,
	cartTotal : Number
});

module.exports = mongoose.model("Cart",cartSchema);