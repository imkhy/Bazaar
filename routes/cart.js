var express = require("express");
var router = express.Router(),
	User = require("../models/user"),
	Item = require("../models/items"),
Cart = require("../models/cart");

router.post("/addToCart/:id",isLoggedIn,function(req,res){
	var userid = req.user._id;
	var temp=0;
	Item.findById(req.params.id,function(err,item){
		if(err){
			console.log(err);
		}else{
			//console.log(fruit);
			Cart.findOne({userId:userid},function(err,cart){
				if(err){
					console.log(err);
				}else{
					 console.log(cart);
					 console.log(userid);
					if(cart){
						console.log(cart.products);	
						console.log("Not Empty");
						for(var i=0; i<cart.products.length; i++){
							if(cart.products[i].name  === item.name){
								console.log(cart.products[i].name);
								console.log(item.name);
								temp=1;
								break;
							}
						}
						if(temp!=1){
							cart.products.push({
							_id : item._id,
							name: item.name,
							img : item.img,
							price : item.price,	
							quantity: req.body.quantity});
							
							console.log("Pushed")
							console.log(item);
							if (req.body.quantity==0){
								req.flash("error","Enter quantity");
								res.redirect("back");
							}else{
								cart.save();
								req.flash("success","Item Added");
								res.redirect("back");
							}
						}else{
							cart.products[i].quantity = req.body.quantity;
							console.log("Updated");
							cart.save();
							req.flash("success","Item Quantity Updated");
							res.redirect("back");
						}
						
						console.log(cart);
						
					} 
					else
					{
						Cart.create({
							userId : userid,
							products : [
							{
							_id : item._id,
							name: item.name,
							img : item.img,
							price : item.price,	
							quantity: req.body.quantity
							}]
						},function(err,cart){
							if(err){
								console.log(err);
							}else{
								cart.save();
								console.log("Created Cart!!");
								console.log(cart);
								var cartid = cart._id;
								req.flash("success","Item Added");
								res.redirect("back");
							}
						});
						
					}	
				}
			});
		}
	});
});


router.get("/cart",isLoggedIn,function(req,res){
	var userid = req.user._id;
	Cart.findOne({userId:userid},function(err,cart){
		if(err){
			console.log(err);
		}else{
			 //console.log(cart);
			res.render("cart",{cart:cart});
		}   
	});
});

router.post("/cart/remove/:i_id",isLoggedIn, function(req,res){
	var i_id=req.params.i_id;
	Cart.findOne({userId:req.user._id},function(err,cart){
		if(err){
			console.log(err);
		}else{
			console.log(i_id);
			 Item.findById(i_id , function(err,item){
				if(err){
					console.log(err);
				}else{
					console.log(item);
					cart.products.pull(item);
					cart.save();
					req.flash("success","Item Removed");
					// res.render("cart",{cart:cart});
					res.redirect("/cart");
				}	
			});
		}	
	});
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;