// Request data using D3
d3.csv("../static/data/armed2015.csv").then(function (armedData1) {
  console.log(armedData1);

  let Arms = armedData1.map((d) => d.Armed);
  console.log("Armed", Arms);

  let Arm2015 = armedData1.map((d) => d.Cases);
  console.log("Arm2015", Arm2015);

  d3.csv("../static/data/armed2016.csv").then(function (armedData2) {
    console.log(armedData2);

    let Arm2016 = armedData2.map((d) => d.Cases);
    console.log("Arm2016", Arm2016);

    d3.csv("../static/data/armed2017.csv").then(function (armedData3) {
      console.log(armedData3);

      let Arm2017 = armedData3.map((d) => d.Cases);
      console.log("Arm2017", Arm2017);

      d3.csv("../static/data/armed2018.csv").then(function (armedData4) {
        console.log(armedData4);

        let Arm2018 = armedData4.map((d) => d.Cases);
        console.log("Arm2018", Arm2018);

        d3.csv("../static/data/armed2019.csv").then(function (armedData5) {
          console.log(armedData5);

          let Arm2019 = armedData5.map((d) => d.Cases);
          console.log("Arm2019", Arm2019);

          d3.csv("../static/data/armed2020.csv").then(function (armedData6) {
            console.log(armedData6);

            let Arm2020 = armedData6.map((d) => d.Cases);
            console.log("Arm2020", Arm2020);

            new Chart(document.getElementById("radar-chart"), {
              type: "radar",
              data: {
                labels: armedData1.map((d) => d.Armed),
                datasets: [
                  {
                    label: "2015",
                    fill: true,
                    backgroundColor: "#dbc6eb",
                    borderColor: "#726a95",
                    pointBorderColor: "#726a95",
                    pointBackgroundColor: "#dbc6eb",
                    data: armedData1.map((d) => d.Cases),
                  },
                  {
                    label: "2016",
                    fill: true,
                    backgroundColor: "#b9cced",
                    borderColor: "#6886c5",
                    pointBorderColor: "#6886c5",
                    pointBackgroundColor: "#b9cced",
                    data: armedData2.map((d) => d.Cases),
                  },
                  {
                    label: "2017",
                    fill: true,
                    backgroundColor: "#badfdb",
                    borderColor: "#32afa9",
                    pointBorderColor: "#32afa9",
                    pointBackgroundColor: "#badfdb",
                    data: armedData3.map((d) => d.Cases),
                  },
                  {
                    label: "2018",
                    fill: true,
                    backgroundColor: "#ffc5a1",
                    borderColor: "#c36a2d",
                    pointBorderColor: "#c36a2d",
                    pointBackgroundColor: "#ffc5a1",
                    data: armedData4.map((d) => d.Cases),
                  },
                  {
                    label: "2019",
                    fill: true,
                    backgroundColor: "#fee4a6",
                    borderColor: "#cb9b42",
                    pointBorderColor: "#cb9b42",
                    pointBackgroundColor: "#fee4a6",
                    data: armedData5.map((d) => d.Cases),
                  },
                  {
                    label: "2020",
                    fill: true,
                    backgroundColor: "#df7599",
                    borderColor: "#e4508f",
                    pointBorderColor: "#e4508f",
                    pointBackgroundColor: "#df7599",
                    data: armedData6.map((d) => d.Cases),
                  },
                ],
              },
              options: {
                responsive: true,
                title: {
                  display: true,
                  text: "Police encounters between 2015-2020",
                  fontSize: 22,
                  position: "left",
                },
                legend: {
                  position: "right",
                },
              },
              animation: {
                duration: 100,
                animateScale: true,
              },
            });
          });
        });
      });
    });
  });
});
