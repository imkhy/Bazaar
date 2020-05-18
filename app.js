var express = require("express"),
	app = express(),
	mongoose = require("mongoose"),
	Item = require("./models/items"),
	Cart = require("./models/cart"),
	User = require("./models/user"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	 fruitRoutes = require("./routes/fruit"),
	 vegetableRoutes = require("./routes/vegetable"),
	beverageRoutes = require("./routes/beverages"),
	 cartRoutes = require("./routes/cart"),
	 authRoutes = require("./routes/auth"),
	orderRoutes = require("./routes/order"),
	razorpayRoutes = require("./routes/razorpay"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	session = require("express-session");

mongoose.connect("mongodb+srv://Khyati:Khyati@15@yelpcamp-ybynb.mongodb.net/Grocery?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(session({
	secret: "I am the best",
	// store: new MemoryStore({
	// checkPeriod: 86400000 // prune expired entries every 24h
	// }),
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	// res.locals.error = req.flash("error");
	// res.locals.success = req.flash("success");
	next();
});





app.use(authRoutes);
app.use(fruitRoutes);
app.use(vegetableRoutes);
app.use(beverageRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use(razorpayRoutes);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});