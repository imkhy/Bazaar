var express = require("express");
var router = express.Router(),
	User = require("../models/user"),
	Item = require("../models/items")
Cart = require("../models/cart");

router.post("/order",isLoggedIn,function(req,res){
	User.findById(req.user._id, function(err, user){
		if(err){
			console.log(err);
		}else{
			console.log(user.address);
			if(!isEmpty(user.address)){
				res.render("checkout",{user:user});
			}else{
				res.render("address");
			}
		}
	});	
});

router.post("/checkout",isLoggedIn,function(req,res){
	User.findById(req.user._id, function(err, user){
		if(err){
			console.log(err);
		}else{
			user.address.push(req.body.add);
			user.save();
			res.render("checkout",{user:user});
		}
	});	
});
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

module.exports = router;