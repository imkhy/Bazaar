var express = require("express");
var Razorpay = require("razorpay");

var router = express.Router(),
	User = require("../models/user"),
	Order = require("../models/orders"),
	Cart = require("../models/cart");

router.post("/payment/success",function(req,res){
	Cart.findOneAndRemove({userId:req.user._id},function(err,cart){
		if(err){
			console.log(err);
		}else{
			console.log("Done");
			
			res.render("success");
		}
	});
});	

module.exports = router;
//     handler: function (response) {
//     	console.log(response);
//         // AFTER TRANSACTION IS COMPLETE YOU WILL GET THE RESPONSE HERE.
//     },
		
//     prefill: {
//         name: user.username, // pass customer name
//         contact: user.phone //customer phone no.
//     },
//     notes: {
//         address: user.address //customer address 
//     },
//     theme: {
//         color: "#15b8f3" // screen color
//     }
// };
// console.log(options);

// var propay = new Razorpay(options);
// propay.open();

 