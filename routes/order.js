var express = require("express");
var Razorpay = require("razorpay");

var router = express.Router(),
	User = require("../models/user"),
	Item = require("../models/items"),
	Order = require("../models/orders"),
Cart = require("../models/cart");

router.post("/order",isLoggedIn,function(req,res){
	User.findById(req.user._id, function(err, user){
		if(err){
			console.log(err);
		}else{
			//console.log(user.address);
			if(!isEmpty(user.address)){
				Cart.findOne({userId:req.user._id},function(err,cart){
					if(err){
						console.log(err);
					}else{
						 console.log(cart);
						var options = {
							amount: cart.cartTotal,
							currency: "INR",
							name: "Khy",
							receipt: "order_rcptid_11",
							payment_capture: '0'
						}
						Order.create(options, function(err, order) {
							if(err){
								console.log(err);
							}else{
								console.log(order);
								res.render("checkout",{user:user,cart:cart,order:order});
							} 
						});
					}   
				});
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

// router.post("/razorpay",isLoggedIn,function(req,res){
// 	Cart.findOne({userId:req.user._id},function(err,cart){
// 		if(err){
// 			console.log(err);	
// 		}else{
// 			 //console.log(cart);
// 			User.findById(req.user._id, function(err, user){
// 				if(err){
// 					console.log(err);
// 				}else{
// 					res.render("rzp",{cart:cart,user:user});
// 				}
// 			});
// 		}   
// 	});
// });

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