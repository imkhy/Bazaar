var mongoose = require("mongoose");

var orderSchema = mongoose.Schema({
	amount : Number,
	currency : String,
	name : String,
	receipt : String
});


module.exports = mongoose.model("Order",orderSchema);