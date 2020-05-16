var express = require("express");
var router = express.Router(),
Item = require("../models/items"),
Cart = require("../models/cart"),
User = require("../models/user");

router.get("/beverages",function(req,res){
	Item.find({type:3},function(err,bev){
		if(err){
			console.log(err);
		}else{
			res.render("beverages",{bev:bev});	
		}
	});
});



module.exports = router;