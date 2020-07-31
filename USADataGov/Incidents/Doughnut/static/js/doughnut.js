// Request data using D3
d3.csv("../static/data/maleRace.csv").then(function (maleRacedata) {
    console.log(maleRacedata);
  
    let Races = maleRacedata.map((d) => d.Race);
    console.log("Races", Races);
  
    let MaleCount = maleRacedata.map((d) => d.Male);
    console.log("MaleCount", MaleCount);
  
    d3.csv("../static/data/femaleRace.csv").then(function (femaleRacedata) {
        console.log(femaleRacedata);
      
        let FemaleCount = femaleRacedata.map((d) => d.Female);
        console.log("FemaleCount", FemaleCount);

new Chart(document.getElementById("doughnut-chart"), {
    type: 'pie',
    data: {
  labels: maleRacedata.map((d) => d.Race),
  datasets: [{
    data: maleRacedata.map((d) => d.Male),
    backgroundColor: ["#ddf3f5","#a6dcef","#f2aaaa","#e36387","#dbc6eb","#d291bc"],
    hoverBackgroundColor: ["#6886c5","#588da8","#ccafaf","#e58a8a","#d8345f","#856c8b"]
  }, {
    data: femaleRacedata.map((d) => d.Female),
    backgroundColor: ["#ddf3f5","#a6dcef","#f2aaaa","#e36387","#dbc6eb","#d291bc"],
    hoverBackgroundColor: ["#6886c5","#588da8","#ccafaf","#e58a8a","#d8345f","#856c8b"]
}]
},
  options: {
    responsive: true,
    title: {
      display: true,
      text: "Deaths by Gender and Race between 2015-2020",
      fontSize: 22,
      position: 'left'
    },
    legend: {
      position: 'right'
    }
  },
});
});
})