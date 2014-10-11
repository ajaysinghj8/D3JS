(function(d3) {

    var bardata = [20, 30, 20, 150, 200, 250, 140, 20, 30, 20, 150, 200, 250, 140];

    var height = 400,
        width = 600;
    // calculating heights for barchat maximum hegiht(400) will be apllied to maximum value
    var yScale = d3.scale.linear()
        .domain([0, d3.max(bardata)])
        .range([0, height]);
    // Dynamic x scale for n valuse calculated automatically
    var xScale = d3.scale.ordinal()
        .domain(d3.range(0, bardata.length))
        .rangeBands([0, width]);
    d3.select('#chart').append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background', '#C9D7D6')
        .selectAll('rect').data(bardata)
        .enter().append('rect')
        .style('fill', '#C61C6F')
        .attr('width', xScale.rangeBand())
        .attr('height', function(d) {
            return yScale(d);
        })
        .attr('x', function(d, i) {
            return xScale(i);
        })
        .attr('y', function(d) {
            return height - yScale(d);
        })

})(window.d3);
