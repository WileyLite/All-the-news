// // Web Scraper Homework Solution Example
// // (be sure to watch the video to see
// // how to operate the site in the browser)
// // -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/

// // Require our dependencies
// var express = require("express");
// var mongoose = require("mongoose");
// var exphbs = require("express-handlebars");

// // Set up our port to be either the host's designated port, or 3000
// var PORT = process.env.PORT || 3000;

// // Instantiate our Express App
// var app = express();

// // Require our routes
// var routes = require("./routes");

// // Parse request body as JSON
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// // Make public a static folder
// app.use(express.static("public"));

// // Connect Handlebars to our Express app
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// // Have every request go through our route middleware
// app.use(routes);

// // If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// // Connect to the Mongo DB
// mongoose.connect(MONGODB_URI);

// // Listen on the port
// app.listen(PORT, function() {
//   console.log("Listening on port: " + PORT);
// });

var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");

var express = require("express");
var app = express();

app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(express.static(process.cwd() + "/public"));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.connect("mongodb://localhost/All-in-news");
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to Mongoose");
});

var port = process.env.PORT || 4000;
app.listen(port, function() {
  console.log("Listening on PORT " + port);
});
