function goGetResults() {
    let buscar_tipo = d3.select("#buscarTipo").property("value")
    d3.json(`/api/consultar/${buscar_tipo}`).then(json => {
        // console.log("s",json)
        // console.log("States",statesData)
        let features = statesData.features


        features.forEach((d, i) => {
            let co = json[i];
            d.properties.density = json[i]
            // console.log(d.properties.density)
        })

        // console.log(statesData)
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
                '<b> (2015-2020) </b><br />' + props.density + ' people killed<br/>' + `State: ` + props.name
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
                grades = [0, 10, 20, 50, 100, 200, 500, 1000],
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

        // console.log(buscar_tipo)


    });




}

function deletemap() {
    d3.select("#map").remove()
    d3.select("#replace")
        .append("div")
        .attr("id", "map");
    d3.select("#map2").remove()
    d3.select("#replace2")
        .append("div")
        .attr("id", "map2");

    goGetResults();
    map2();
}
function deletegraph() {
    d3.select("#myChart").remove()
    d3.select("#modify")
        .append("canvas")
        .attr("id", "myChart");
    d3.select("#polar-chart").remove()
    d3.select("#modify2")
        .append("canvas")
        .attr("id", "polar-chart");

    graph();
    graph2();
}

function graph() {
    let a = d3.select("#state").property("value")
    d3.json(`/search/${a}`).then(json => {
        console.log("SecondJS", Object.values(json.year))

        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: Object.values(json.year),
                datasets: [{
                    label: 'Letal-Shootings by state',
                    backgroundColor: 'rgb(238, 50, 50)',
                    borderColor: 'rgb(238, 99, 50)',
                    data: Object.values(json.count)
                }]
            },

            // Configuration options go here
            options: {}
        });
    });
}

function graph2() {
    let c = d3.select("#state").property("value")
    d3.json(`/search3/${c}`).then(json => {
        console.log("Hola", Object.values(json.race))
        new Chart(document.getElementById("polar-chart"), {
            type: 'doughnut',
            data: {
                labels: Object.values(json.race),
                datasets: [
                    {
                        label: "Population (millions)",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: Object.values(json.count)
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Deaths by race'
                }
            }
        });
    });
}

function map2() {
    let b = d3.select("#buscarTipo").property("value")
    d3.json(`/search2/${b}`).then(json => {
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
        for (var i = 0; i < json.length; i++) {

            // Set the data location property to a variable
            var location = json[i].geom;
            let lat = json[i].latitude;
            let long = json[i].longitude;

            // Check for location property
            if (location) {

                // Add a new marker to the cluster group and bind a pop-up
                markers.addLayer(L.marker([lat, long])
                    .bindPopup(`<h3>Officer name :${json[i].name}</h3>
              <h5>Location: ${json[i].address}</h5>
              <h5>Date: ${json[i].date}</h5>
              <h5>Armed: ${json[i].armed}</h5>
              ` ));
            }

        }

        // Add our marker cluster layer to the map
        Map.addLayer(markers);
    });
}

function bernardo() {
    d3.csv(`/search4/`).then(Statedata => {
        console.log("Este", Statedata);

        let States = Statedata.map(d => d.State);
        console.log("States", States);

        let Police = Statedata.map(d => d.Police_Employment);
        console.log("Police", Police);

        new Chart(document.getElementById("polar-chart2"), {
            type: "polarArea",
            data: {
                labels: Statedata.map(d => d.State),
                datasets: [
                    {
                        label: "Police count",
                        backgroundColor: ["#00bcd4", "#b2ebf2", "#ff5722", "#dd2c00", "#411f1f", "#411f1f", "#86c4ba", "#4b5d67",
                            "#322f3d", "#59405c", "#87556f", "#4f8a8b", "#fbd46d", "#f09ae9", "#ffc1fa", "#ffe78f",
                            "#ffd36b", "#62760c", "#535204", "#523906", "#848ccf", "#93b5e1", "#ffe4e4", "#be5683",
                            "#206a5d", "#1f4068", "#e3dfc8", "#f5f1da", "#96bb7c", "#eebb4d", "#6f4a8e", "#221f3b",
                            "#ffdbc5", "#cf1b1b", "#900d0d", "#423144", "#006a71", "#ffffdd", "#cbeaed", "#d3de32",
                            "#394989", "#4ea0ae", "#fff48f", "#1b262c", "#0f4c75", "#3282b8", "#bbe1fa", "#ffe0f7",
                            "#fe91ca", "#ede682", "#e84a5f", "#f6ab6c"],
                        data: Statedata.map(d => d.Police_Employment)
                    }
                ]
            },
            options: {
                responsive: true,
                title: {
                    display: false,
                    text: "Police Employment between 1985-2018",
                    fontSize: 22,
                    position: 'left'
                },
                legend: {
                    position: 'right'
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true
            }
        });


    });
}

function bernardo1() {
    d3.csv(`/search5/`).then(Arrestdata => {
        console.log("ESTE!", Arrestdata);

        let States = Arrestdata.map(d => d.State);
        console.log("States", States);

        let Arrests = Arrestdata.map(d => d.Arrests);
        console.log("Arrests", Arrests);
        d3.csv(`/search6/`).then(Crimedata => {
            console.log("ESTE2!!", Crimedata)
            let Crimes = Crimedata.map(d => d.Crimes);
            console.log("Crimes", Crimes);

            new Chart(document.getElementById("radar-chart"), {
            type: 'radar',
            data: {
                labels: States,
                datasets: [
                {
                    label: "Arrests",
                    fill: true,
                    backgroundColor: "#beebe9",
                    borderColor: "#32afa9",
                    pointBorderColor: "#f17e7e",
                    pointBackgroundColor: "#fdd998",
                    data: Arrests
                }, {
                    label: "Crimes",
                    fill: true,
                    backgroundColor: "#daf1f9",
                    borderColor: "#588da8",
                    pointBorderColor: "#e4508f",
                    pointBackgroundColor: "#df7599",
                    data: Crimes
                }
                ]
            },
            options: {
                responsive: true,
                title: {
                display: false,
                text: "Arrests and Crimes between 1985-2018",
                fontSize: 22,
                position: 'right'
                },
                legend: {
                position: 'top'
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true
            }
            });



        });//Closing second dataread
    });//Closing first dataread
}//Closing function

goGetResults();
graph();
graph2();
map2();
bernardo();
bernardo1();
d3.select("#buscarTipo").on("change", deletemap);
d3.select("#state").on("change", deletegraph);