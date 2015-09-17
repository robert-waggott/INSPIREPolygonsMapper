$(function() {
	L.mapbox.accessToken = 'pk.eyJ1Ijoicm9iZXJ0LXdhZ2dvdHQiLCJhIjoiMmRlMmI0MTIzYjJkYWU4YTQ5MzRhOTFkMWNhZWY1ZWEifQ.5uVZ6P4XGNC4gnmbNS5OLQ';

	var map = L.mapbox.map('map', 'robert-waggott.nf8f91b1')
	    .setView([53.959965, -1.087298], 10);

	$.getJSON("/geojson/Adur/2015-08-01").done(function(geojson) {
		// see http://leafletjs.com/reference.html#featuregroup.
		// and http://stackoverflow.com/questions/17277686/leaflet-js-center-the-map-on-a-group-of-markers
		var layer = L.geoJson(geojson, {
			style: {
		    	"color": "#ff7800",
			    "weight": 5,
			    "opacity": 0.6
			},
			onEachFeature: function(feature, layer) {
			    layer.on({
        			click: function() {
        				// TODO: Open link to https://eservices.landregistry.gov.uk/www/wps/portal/!ut/p/b1/hc5BC4JAEAXgnzSzM-O6Hu3gugRJGJRziT1IGLpeot9fdqso5_bge48Bhc4UBQoJUQ4n0BTvwyXehjnFcclqz0xOjBGqHdscQ1Z5NoeMUfgJuj_Am7V-2yc4gn6wpiox8KbZet4Tov0C7zuOVsDyxwvgjysRdvU89TDp6NpwlQclu3xj/dl4/d5/L0lDU0lKSmdrS0NsRUpDZ3BSQ2dwUkNTQS9ZSVVJQUFJSUlJTU1JS0VFQUFDR09HT0NHSUJKRkpGQkpORE5EQk5ISUVBTExBISEvNEczYUQyZ2p2eWhDa3lGTU5RaWt5RktOUmprS2NhZ21Rb2dnL1o3XzMyODQxMTQySDgzNjcwSTVGRzMxVDUzOFY0LzAvaWJtLmludi8zMDM3NTQzMzk5MjYvc3BmX0FjdGlvbk5hbWUvc3BmX0FjdGlvbkxpc3RlbmVyL3NwZl9zdHJ1dHNBY3Rpb24vITJmTHJJbnNwaXJlSWRJbml0LmRv/
        				// in the sidebar. 
        				console.log(feature);
        			}
				});
			}
		});

		layer.addTo(map);

	 	map.fitBounds(layer.getBounds());
	});
});