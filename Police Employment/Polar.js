d3.json("StateCopsFinalq.json").then(function(Statedata){
    console.log(Statedata);

    var States= Statedata.map(d=>d.state_abbr);
    console.log("States",States);

    var Police= Statedata.map(d=>d.total_pe_ct);
    console.log("Police",Police);


    // Statedata.forEach(function(d){
    //     console.log("States",d.state_abbr);
    //     console.log("Police", d.total_pe_ct);

    // })

new Chart(document.getElementById("polar-chart"), {
    type: 'polarArea',
    data: {
      labels: Statedata.map(d=>d.state_abbr),
      datasets: [
        {
          label: "Employment",
          backgroundColor:["#00bcd4","#b2ebf2","#ff5722","#dd2c00","#411f1f","#411f1f","#86c4ba","#4b5d67",
          "#322f3d","#59405c","#87556f","#4f8a8b","#fbd46d","#f09ae9","#ffc1fa","#ffe78f",
          "#ffd36b","#62760c","#535204","#523906","#848ccf","#93b5e1","#ffe4e4","#be5683",
          "#206a5d","#1f4068","#e3dfc8","#f5f1da","#96bb7c","#eebb4d","#6f4a8e","#221f3b",
          "#ffdbc5","#cf1b1b","#900d0d","#423144","#006a71","#ffffdd","#cbeaed","#d3de32",
          "#394989","#4ea0ae","#fff48f","#1b262c","#0f4c75","#3282b8","#bbe1fa","#ffe0f7",
          "#fe91ca","#ede682","#e84a5f","#f6ab6c"],
          data: Statedata.map(d=>d.total_pe_ct)
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Police Employment between 1985-2018'
      }
    }
});
});