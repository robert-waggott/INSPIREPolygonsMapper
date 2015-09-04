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
  res.end("Hello world");
});

app.listen(3000);