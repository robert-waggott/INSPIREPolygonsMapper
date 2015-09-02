var express = require("express");
var stylus = require("stylus");
var nib = require("nib");

var app = express();

app.set("views", "./views");
app.set("view engine", "jade");
app.use(express.logger("dev"));