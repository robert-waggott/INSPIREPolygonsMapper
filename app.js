var colors = require("colors");
var express = require("express");
var morgan = require("morgan");
var nib = require("nib");
var stylus = require("stylus");

var app = express();

app.set("views", "./views");
app.set("view engine", "jade");
app.use(express.static("./public"));

app.use(morgan("combined"));

app.get("/", function(req, res) {
    res.render("map", { 
    		title : "Home" 
    	}
  	)
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Mapper listening at http://%s:%s".green, host, port);	
});