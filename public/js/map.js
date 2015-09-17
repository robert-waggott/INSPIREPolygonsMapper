$(function() {
	L.mapbox.accessToken = 'pk.eyJ1Ijoicm9iZXJ0LXdhZ2dvdHQiLCJhIjoiMmRlMmI0MTIzYjJkYWU4YTQ5MzRhOTFkMWNhZWY1ZWEifQ.5uVZ6P4XGNC4gnmbNS5OLQ';

	var map = L.mapbox.map('map', 'robert-waggott.nf8f91b1')
	    .setView([53.959965, -1.087298], 10);

    NProgress.start();

	$.getJSON("/inspire/Adur/2015-08-01").done(function(geojson) {
		var layer = L.geoJson(geojson, {
			style: {
		    	"color": "#ff7800",
			    "weight": 5,
			    "opacity": 0.6
			},
			onEachFeature: function(feature, layer) {
			    layer.on({
        			click: function() {
        				$("#polygon_information_explanation").hide();

        				$("#inspire_id").html("<a target='_blank' href='https://eservices.landregistry.gov.uk/www/wps/portal/!ut/p/b1/04_SjzS0tDQwMTIxMjLXj9CPykssy0xPLMnMz0vMAfGjzOKNjSxMDA1NjDwsjM3MDTxN3dyNDUNMjQ1MjPWDU_P0c6McFQH3SLFU/'>" + feature.properties.id + "</a>");
        				$("#cadastral_ref").html(feature.properties.cadastralReference);
        				$("#valid_from").html(feature.properties.validFrom);

        				$.getJSON("/inspire/" + feature.properties.id).done(function(inspireInfo) {
							$("#address").html(inspireInfo.address);
							$("#tenure").html(inspireInfo.tenure);
        				});
        			}
				});
			}
		});

		layer.addTo(map);

	 	map.fitBounds(layer.getBounds());

	 	NProgress.done();
	});
});