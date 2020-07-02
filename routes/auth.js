var express = require("express");
var router = express.Router(),
	passport = require("passport"),
	User = require("../models/user");


router.get("/",function(req,res){
	res.render("landing");
});

router.get("/register",function(req,res){
	res.render("register");
});

router.post("/register",function(req,res){
	User.register(new User({
		username: req.body.username
	}),req.body.password,function(err,user){
		if(err){
			console.log(err);
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","Welcome to Bazaar, "+req.body.username+"! Happy Shopping! :D");
			res.redirect("/");
		});	
	});
});


router.get("/login",function(req,res){
	res.render("login");
});

router.post("/login",passport.authenticate("local",{
	successRedirect: "/",
	failureRedirect: "/login",
}),function(req,res){
	// if (successRedirect){
	// 	console.log("Logged");
	// 	req.flash("success","You are logged in,"+req.body.username);
	// }else{
	// 	req.flash("error","Error logging in, Try Again!");
	// }
	console.log(req);
});

router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","You are logged out! Login to continue shopping!");
	res.redirect("/");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;