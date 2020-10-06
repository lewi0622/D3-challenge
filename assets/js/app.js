// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 60, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


// import csv data
d3.csv("assets/data/data.csv").then(function(data) {
    // format used data as numbers
    data.forEach(d => {
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;
    });

    // Add X axis
    var x = d3.scaleLinear()
        .domain(d3.extent(data.map(d => d.poverty)))
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add X label
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .text("Poverty (%)");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.healthcare))
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add Y label
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", (height / 2) * -1)
        .attr("dy", -40)
        .text("Healthcare (%)")

    // create dots variable
    var gdots = svg.selectAll("g.dot")
        .data(data)
        .enter()
        .append('g');

    // Add dots to gdots
    gdots.append("circle")
        .attr("cx", d => x(d.poverty))
        .attr("cy", d => y(d.healthcare))
        .attr("r", 8)
        .style("fill", "#69b3a2");
    
    // Add text to gdots
    gdots.append("text")
        .text(d => d.abbr)
        .attr("x", d => x(d.poverty))
        .attr("y", d => y(d.healthcare))
        .attr("dx", -5)
        .attr("dy", 2)
        .style("font-size", "7px");

//Catch error
}).catch(e => {
    console.log(e);
});
