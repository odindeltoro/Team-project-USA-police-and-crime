let mymap = L.map("mapid", {
    center: [39.83, -98.57],
    zoom: 4
})

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(mymap);

d3.json("../agencies_outputfile.json").then(data =>{
    console.log(data)

    let heatArray = [];
    data.forEach(d =>{
        let x = d.latitude
        let y = d.longitude
        // Añadir markers
        //L.marker([x,y]).addTo(mymap)

        heatArray.push([x,y])
    })
    
    L.heatLayer(heatArray, {
        radius: 5,    
        blur: 1,
        gradient: {0.2: 'blue', 0.3: 'lime', 0.5: 'red'}       
    }).addTo(mymap)
})
