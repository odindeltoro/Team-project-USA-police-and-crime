
// Request data using D3
d3.csv("../static/data/stateArrests.csv").then(function(Arrestdata){
  console.log(Arrestdata);

  let States= Arrestdata.map(d=>d.State);
  console.log("States",States);

  let Arrests= Arrestdata.map(d=>d.Arrests);
  console.log("Arrests",Arrests);

d3.csv("../static/data/stateCrimes.csv").then(function(Crimedata){
  console.log(Crimedata);

  let Crimes= Crimedata.map(d=>d.Crimes);
  console.log("Crimes",Crimes);

new Chart(document.getElementById("radar-chart"), {
    type: 'radar',
    data: {
      labels: Arrestdata.map(d=>d.State),
      datasets: [
        {
          label: "Arrests",
          fill: true,
          backgroundColor: "#beebe9",
          borderColor: "#32afa9",
          pointBorderColor: "#f17e7e",
          pointBackgroundColor: "#fdd998",
          data: Arrestdata.map(d=>d.Arrests)
        }, {
          label: "Crimes",
          fill: true,
          backgroundColor: "#daf1f9",
          borderColor: "#588da8",
          pointBorderColor: "#e4508f",
          pointBackgroundColor: "#df7599",
          data: Crimedata.map(d=>d.Crimes)
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
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
});
});
