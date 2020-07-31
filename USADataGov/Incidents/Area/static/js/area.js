// Request data using D3
d3.csv("../static/data/shotYear.csv").then(function (Policeshotdata) {
  console.log(Policeshotdata);

  let Years = Policeshotdata.map((d) => d.Year);
  console.log("Years", Years);

  let PoliceShot = Policeshotdata.map((d) => d.Police_shot);
  console.log("PoliceShot", PoliceShot);

  var ctx = document.getElementById("area-chart").getContext("2d");

  var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
  gradientStroke.addColorStop(0, "#32afa9");
  gradientStroke.addColorStop(1, "#70416d");

  var gradientFill = ctx.createLinearGradient(500, 0, 100, 0);
  gradientFill.addColorStop(0, "rgba(0, 140, 149, 0.4)");
  gradientFill.addColorStop(1, "rgba(148, 75, 149, 0.4)");

  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: Policeshotdata.map((d) => d.Year),
      datasets: [
        {
          label: "Shots: ",
          borderColor: gradientStroke,
          pointBorderColor: gradientStroke,
          pointBackgroundColor: gradientStroke,
          pointHoverBackgroundColor: gradientStroke,
          pointHoverBorderColor: gradientStroke,
          pointBorderWidth: 10,
          pointHoverRadius: 10,
          pointHoverBorderWidth: 1,
          pointRadius: 3,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 4,
          data: Policeshotdata.map((d) => d.Police_shot),
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Police shot encounters between 2015-2020",
        fontSize: 22,
        position: "left",
      },
      legend: {
        position: "bottom",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "rgba(0,0,0,0.5)",
              fontStyle: "bold",
              beginAtZero: true,
              maxTicksLimit: 5,
              padding: 20,
            },
            gridLines: {
              drawTicks: false,
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "rgba(0,0,0,0.5)",
              fontStyle: "bold",
            },
          },
        ],
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  });
});
