var colors = require("colors");
var express = require("express");
var morgan = require("morgan");
var nib = require("nib");
var stylus = require("stylus");
var downloader = require("inspirepolygonsdownloader")();

var app = express();

function compile(str, path) {
    console.log(str);

    return stylus(str)
    	.set("filename", path)
    	.use(nib())
}

app.set("views", "./views");
app.set("view engine", "jade");

app.use(morgan("combined"));

app.use(stylus.middleware({ 
	src: __dirname + "/public", 
	compile: compile
  })
);

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
    res.render("map", { 
		title : "Home" 
	})
});

app.get("/geojson/:area", function (req, res) {
    var options = {
        areas: [req.params.area],
        geoJson: true
    };  
    
    res.setHeader("Content-Type", "application/json");

    downloader.download(options).then(function(data) {
        res.send(JSON.stringify(data));
    });
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Mapper listening at http://%s:%s".green, host, port);	
});