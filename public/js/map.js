$(function() {
	L.mapbox.accessToken = 'pk.eyJ1Ijoicm9iZXJ0LXdhZ2dvdHQiLCJhIjoiMmRlMmI0MTIzYjJkYWU4YTQ5MzRhOTFkMWNhZWY1ZWEifQ.5uVZ6P4XGNC4gnmbNS5OLQ';

	var map = L.mapbox.map('map', 'robert-waggott.nf8f91b1')
	    .setView([53.959965, -1.087298], 10);

	$.getJSON("/geojson/Adur/2015-08-01").done(function(geojson) {
		console.log(JSON.stringify(geojson.features[0]));

		L.geoJson(geojson.features[0], {
			style: {
		    	"color": "#ff7800",
			    "weight": 5,
			    "opacity": 0.6
			}
		}).addTo(map);
	});
});