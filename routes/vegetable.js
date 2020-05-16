var express = require("express");
var router = express.Router(),
Item = require("../models/items"),
Cart = require("../models/cart");


router.get("/vegetables",function(req,res){
	Item.find({type:2},function(err,veges){
		if(err){
			console.log(err);
		}else{
			res.render("vegetables",{veges:veges});	
		}
	});
});

module.exports = router;