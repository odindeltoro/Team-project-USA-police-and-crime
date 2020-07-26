// Automatically resizes the chart
function makeResponsive() {

// If the SVG area isn't empty when the browser loads, remove it and replace it with a resized version of the chart
let svgArea = d3.select('body').select('svg');

// Clear svg is not empty
if (!svgArea.empty()) {
    svgArea.remove();
}

// Setup screen chart width and height
let svgWidth = window.innerWidth;
let svgHeight = window.innerHeight;

// Margins
let margin = { left:100, right:200, top:100, bottom:200 };
// Dimensions for chart
let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

let g = d3.select('#chart-area')
    .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
    .append('g')
        .attr('transform', 'translate(' + margin.left + 
            ', ' + margin.top + ')');

let time = 0;
let interval;
let formattedData;

// Tooltip
let tip = d3.tip().attr('class', 'd3-tip')
    .html(function(d) {
        let text = "<strong>State:</strong> <span style='color:black'>" + d.state + '</span><br>';
        text += "<strong>Region:</strong> <span style='color:black'>" + d.region + '</span><br>';
        text += "<strong>Crimes:</strong> <span style='color:black'>" + d3.format(',.0f')(d.crime) + '</span><br>';
        text += "<strong>Arrests:</strong> <span style='color:black'>" + d3.format(',.0f')(d.arrest) + '</span><br>';
        text += "<strong>Population:</strong> <span style='color:black'>" + d3.format(',.0f')(d.population) + '</span><br>';
        return text;
    });
g.call(tip);

// Scales
let x = d3.scaleLog()
    .base(10)
    .range([0, width])
    .domain([200, 10000000]);
let y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 2000000]);
let area = d3.scaleLinear()
    .range([25*Math.PI, 1500*Math.PI])
    .domain([200, 150000000]);
let regionColor = d3.scaleOrdinal(d3.schemeSet1);

// Labels
let xLabel = g.append('text')
    .attr('y', height + 50)
    .attr('x', width / 2)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .text("Crime cases");
let yLabel = g.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', -60)
    .attr('x', -170)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .text('Arrests')
let timeLabel = g.append('text')
    .attr('y', height -10)
    .attr('x', width - 40)
    .attr('font-size', '40px')
    .attr('opacity', '0.4')
    .attr('text-anchor', 'middle')
    .text('1985');

// X Axis
let xAxisCall = d3.axisBottom(x)
    .tickValues([10000, 100000, 1000000])
    .tickFormat(d3.format(',.0f'));
g.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height +')')
    .call(xAxisCall);

// Y Axis
let yAxisCall = d3.axisLeft(y)
    .tickFormat(function(d){ return +d; })
    .tickFormat(d3.format(',.0f'));
g.append('g')
    .attr('class', 'y axis')
    .call(yAxisCall);

let regions = ['Northeast','Midwest','South','West'];

let legend = g.append('g')
    .attr('transform', 'translate(' + (width - 20) + 
        ',' + (height - 125) + ')');

regions.forEach(function(region, i){
    let legendRow = legend.append('g')
        .attr('transform', 'translate(0, ' + (i * 20) + ')');

    legendRow.append('rect')
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', regionColor(region));

    legendRow.append('text')
        .attr('x', -10)
        .attr('y', 10)
        .attr('text-anchor', 'end')
        .style('text-transform', 'capitalize')
        .text(region);
});

d3.json('data/statesCrimeArrest.json').then(function(data){
    console.log(data);

   // Clean data
   formattedData = data.map(function(year){
    return year["states"].filter(function(state){
        var dataExists = (state.crime && state.arrest);
        return dataExists
    }).map(function(state){
        state.crime = +state.crime;
        state.arrest = +state.arrest;
        return state;            
    })
});

    // First run of the visualization
    update(formattedData[0]);

})

$('#play-button')
    .on('click', function(){
        let button = $(this);
        if (button.text() == 'Play'){
            button.text('Pause');
            interval = setInterval(step, 150);            
        }
        else {
            button.text('Play');
            clearInterval(interval);
        }
    })

$('#reset-button')
    .on('click', function(){
        time = 0;
        update(formattedData[0]);
    })

$('#region-select')
    .on('change', function(){
        update(formattedData[time]);
    })

$('#date-slider').slider({
    max: 2018,
    min: 1985,
    step: 1,
    slide: function(event, ui){
        time = ui.value - 1985;
        update(formattedData[time]);
    }
})

function step(){
    // At the end of our data, loop back
    time = (time < 33) ? time+1 : 0
    update(formattedData[time]);
}

function update(data) {
    // Standard transition time for the visualization
    let t = d3.transition()
        .duration(100);

    let region = $('#region-select').val();

    var data = data.filter(function(d){
        if (region == 'USA') { return true; }
        else {
            return d.region == region;
        }
    })

    // JOIN new data with old elements.
    let circles = g.selectAll('circle').data(data, function(d){
        return d.state;
    });

    // EXIT old elements not present in new data.
    circles.exit()
        .attr('class', 'exit')
        .remove();

    // ENTER new elements present in new data.
    circles.enter()
        .append('circle')
        .attr('class', 'enter')
        .attr('fill', function(d) { return regionColor(d.region); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .merge(circles)
        .transition(t)
            .attr('cy', function(d){ return y(d.arrest); })
            .attr('cx', function(d){ return x(d.crime) })
            .attr('r', function(d){ return Math.sqrt(area(d.population) / Math.PI) });

    // Update the time label
    timeLabel.text(+(time + 1985))
    $('#year')[0].innerHTML = +(time + 1985)

    $('#date-slider').slider('value', +(time + 1985))
};

}

// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on('resize', makeResponsive);