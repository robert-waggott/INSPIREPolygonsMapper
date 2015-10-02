var apicache = require('apicache').options({ debug: true }).middleware;
var colors = require("colors");
var express = require("express");
var morgan = require("morgan");
var nib = require("nib");
var stylus = require("stylus");
var downloader = require("inspirepolygonsdownloader")();
var request = require("request");
var cheerio = require("cheerio");

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

app.get("/inspire/:id", apicache("15 minutes"), function (req, res) {
    var id = req.params.id;
    var post = {
        url: "https://eservices.landregistry.gov.uk/www/wps/portal/!ut/p/b1/hY5LDoJAEETPwgl6vjBb0PCJzgAqCrMhJBKDCrggGOf0ijs1au8qea-qQUPBmMM5wQ6FHHRXjc2hGpq-q85T1nZJiWAYMxIKajso4n5A8YZTxCah-AEE-J-_gxyxcn0UF3kb8qWZjZujSYmcF1SajKi5NGpIkv12lXmupzJMGljX3cPTb9Wx76KIevEioClByP4AXrcF-QNMvz8B9OVcBCrs2xqKB-Z86xFbBq0-L9lpFV4PlnUHwJreEg!!/dl4/d5/L0lDU0lKSmdwcGlRb0tVUW9LVVEhL29Gb2dBRUlRaGpFQ1VJZ0FJQUl5RkFNaHdVaFM0SldsYTRvIS80RzNhRDJnanZ5aERVd3BNaFFqVW81Q2pHcHhBL1o3XzMyODQxMTQySDgzNjcwSTVGRzMxVDUzOFY0LzAvMzAzNzY1NDAyODUyL3NwZl9BY3Rpb25OYW1lL3NwZl9BY3Rpb25MaXN0ZW5lci9zcGZfc3RydXRzQWN0aW9uLyEyZlFEU2VhcmNoLmRv/", 
        form: {
            polygonId: id,
            enquiryType: "lrInspireId"
        }
    };

    request.post(post, function (error, response, html) {
        if (error) {
            res.status(500).send(JSON.stringify(error));
            return;
        }

        var $ = cheerio.load(html);
        var elements = $("div.wpsPortletBody div.portletContent div.w80p");
        var output = {
            address: elements.first().html().trim(),
            tenure: elements.last().html().trim()
        };

        res.send(JSON.stringify(output));
    });
});

app.get("/inspire/:area/:fromdate", apicache("15 minutes"), function (req, res) {
    var options = {
        areas: [req.params.area],
        fromDate: req.params.fromdate,
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