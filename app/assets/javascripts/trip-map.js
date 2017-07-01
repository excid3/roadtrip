document.addEventListener("turbolinks:load", function() {
  var element = document.querySelector("#trip_map")
  if (element != undefined) { setupMap(element) }
})

function setupMap(element) {
	var map = L.map('trip_map').setView([51.505, -0.09], 13);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(map);

  stops = JSON.parse(element.dataset.stops)
  setBounds(map, stops)
  addMarkers(map, stops)
}

function setBounds(map, points) {
  locations = points.map(function(stop) {
    return [stop.latitude, stop.longitude];
  })

  var bounds = new L.LatLngBounds(locations);
  map.fitBounds(bounds);
}

function addMarkers(map, points) {
  points.forEach(function(point) {
    var marker = L.marker([point.latitude, point.longitude ])
      .addTo(map)
      .bindPopup("<a href='"+point.url+"'>"+point.name+"</a>");
  });
}
