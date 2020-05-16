var mongoose = require("mongoose");

var itemSchema = mongoose.Schema({
	name : String,
	img : String,
	price : Number,
	type : Number
});

// TYPE      INTEGER
//   1		 Fruits
//	 2		 Vegetables
//   3	     Beverages

module.exports = mongoose.model("Item",itemSchema);



// Item.create({
// 	name : "Sprite",
// 	img : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQvVLOlL3S8rZRlbq1h-9VPwzfGYaiJUdI9siqlLIkSkOXxPr5B&usqp=CAU",
// 	price : 140,
// 	type : 3
// },function(err, item){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(item);
// 	}
// });
