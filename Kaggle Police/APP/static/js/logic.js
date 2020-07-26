function goGetResults(){
    let buscar_tipo = d3.select("#buscarTipo").property("value")
    d3.json(`/api/consultar/${buscar_tipo}`).then(json=>{
        console.log("s",json)
        console.log("States",statesData)
        let features = statesData.features
        

        features.forEach((d, i) => {
            let co = json[i];
            d.properties.density = json[i]
            // console.log(d.properties.density)
        })
        
        console.log(statesData)
        let streets = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: "mapbox/streets-v11",
            accessToken: API_KEY
        });
        let satellite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: "mapbox/satellite-streets-v11",
            accessToken: API_KEY
        });
        let dark = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: "mapbox/dark-v10",
            accessToken: API_KEY
        });
        
        // Creating map object
        var myMap = L.map("map", {
            center: [48, -102],
            zoom: 3,
            layers: [satellite]
        });
        var baseMaps = {
            "Streets": streets,
            "Satellite": satellite,
            "Dark": dark
        
        };
        
        // var overlayMaps = {
        //     "Cities": cities
        // };
        L.control.layers(baseMaps).addTo(myMap);
        
        L.geoJson(statesData).addTo(myMap);
        function getColor(d) {
            return d > 1000 ? '#800026' :
                d > 500 ? '#BD0026' :
                    d > 200 ? '#E31A1C' :
                        d > 100 ? '#FC4E2A' :
                            d > 50 ? '#FD8D3C' :
                                d > 20 ? '#FEB24C' :
                                    d > 10 ? '#FED976' :
                                        '#FFEDA0';
        }
        function style(feature) {
            return {
                fillColor: getColor(feature.properties.density),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        }

        L.geoJson(statesData, { style: style }).addTo(myMap);

        function highlightFeature(e) {
            var layer = e.target;

            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            });

            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront();
            }
        }

        function resetHighlight(e) {
            geojson.resetStyle(e.target);
        }

        function zoomToFeature(e) {
            myMap.fitBounds(e.target.getBounds());
        }
        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
            });
        }

        geojson = L.geoJson(statesData, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(myMap);

        var info = L.control();

        info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
            this.update();
            return this._div;
        };

        // method that we will use to update the control based on feature properties passed
        info.update = function (props) {
            this._div.innerHTML = '<h4>Incidents by State: </h4>' + (props ?
                '<b> (2015-2020) </b><br />' + props.density + ' people killed<br/>'+`State: `+props.name
                : 'Hover over a state');
        };

        info.addTo(myMap);

        function highlightFeature(e) {
            var layer = e.target;

            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            });

            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront();
            }
            info.update(layer.feature.properties);
        }

        function resetHighlight(e) {
            geojson.resetStyle(e.target);
            info.update();
        }

        var legend = L.control({ position: 'bottomright' });

        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend'),
                grades = [0, 10, 20, 50, 100, 200, 500,1000],
                labels = [];

            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColor(grades[i] + 1) + '"></i><br> ' +
                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
            }

            return div;
        };

        legend.addTo(myMap);
        var Map = L.map("map2", {
            center: [48, -102],
            zoom: 3
          });
          
          // Adding tile layer to the map
          let streets1 = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: "mapbox/satellite-streets-v11",
            accessToken: API_KEY
          }).addTo(Map);
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
                  <h5>Location: ${response[i].address}</h5>
                  <h5>Date: ${response[i].date}</h5>
                  <h5>Armed: ${response[i].armed}</h5>
                  ` ));
              }
          
            }
          
            // Add our marker cluster layer to the map
            Map.addLayer(markers);
        console.log(buscar_tipo)


    });
    
      
     

}


function deletemap(){
    d3.select("#map").remove()
    d3.select("#replace")
    .append("div")
    .attr("id","map");
    goGetResults();
}

// function graph(){
//     let buscar = d3.select("#buscarTipo").property("value")
//     d3.json(`/search/${buscar}`).then(json=>{
//     console.log("SecondJS",json)
//     });
// }
// graph();
goGetResults();
d3.select("#buscarTipo").on("change", deletemap);