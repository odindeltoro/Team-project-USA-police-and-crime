// Creating map object
var myMap = L.map("map", {
  center: [48, -102],
  zoom: 3
});

let light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: "pk.eyJ1Ijoib2RpbmRlbHRvcm8iLCJhIjoiY2tkOThwN3poMGNzYjJwcGVkczJpdnZsOSJ9.K1nz_mnoI6YfOJw2I_ryMw"
});
let dark = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/dark-v10",
    accessToken: "pk.eyJ1Ijoib2RpbmRlbHRvcm8iLCJhIjoiY2tkOThwN3poMGNzYjJwcGVkczJpdnZsOSJ9.K1nz_mnoI6YfOJw2I_ryMw"
});
// Adding tile layer to the map
let streets = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: "pk.eyJ1Ijoib2RpbmRlbHRvcm8iLCJhIjoiY2tkOThwN3poMGNzYjJwcGVkczJpdnZsOSJ9.K1nz_mnoI6YfOJw2I_ryMw"
}).addTo(myMap);

d3.json("../latlongpolice.json", function(response) {

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var location = response[i].geom;
    let lat = response[i].latitude;
    let long = response[i].longitude;
    
    // Check for location property
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([lat,long])
        .bindPopup(`<h3>Officer name :${response[i].name}</h3>
        <h4>Location: ${response[i].address}</h4>
        <h4>Date: ${response[i].date}</h4>
        <h4>Armed: ${response[i].armed}</h4>
        ` ));
    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});
d3.json("../latlongpolice.json", function(data) {
  console.log(data);
});



