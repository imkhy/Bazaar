var express = require("express");
var router = express.Router(),
Item = require("../models/items"),
Cart = require("../models/cart"),
User = require("../models/user");

router.get("/fruits",function(req,res){
	Item.find({type:1},function(err,fruits){
		if(err){
			console.log(err);
		}else{
			res.render("fruits",{fruits:fruits});	
		}
	});
});



module.exports = router;