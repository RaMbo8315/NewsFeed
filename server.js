var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var path = require("path");
var mongoose = require("mongoose");

var db = require("./models");

var PORT = process.env.PORT || 8080;

var app = express();

app.use(logger("dev"));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsFeed";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

require("./routes/api.js")(app);
require("./routes/view.js")(app);

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});

