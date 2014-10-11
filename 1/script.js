(function(d3) {

    var bardata = [];
    for (var i = 0; i < 30; i++) {
        bardata.push(Math.round(Math.random() * 30)+20);
    };

    bardata.sort(function   compareNumbers(a,b ) {
        return a-b;
    })

    var height = 400,
        width = 600;
    var tempcolor;
    var colors = d3.scale.linear()
        .domain([0, bardata.length * .33, bardata.length * .66, bardata.length])
        .range(['#FFB832', '#C61C6F', '#268BD@', '#85992']);
    // calculating heights for barchat maximum hegiht(400) will be apllied to maximum value
    var yScale = d3.scale.linear()
        .domain([0, d3.max(bardata)])
        .range([0, height]);
    // Dynamic x scale for n valuse calculated automatically
    var xScale = d3.scale.ordinal()
        .domain(d3.range(0, bardata.length))
        .rangeBands([0, width]);

    var tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', 'white')
        .style('opacity', 0)

    var mychart = d3.select('#chart').append('svg')
        .attr('width', width)
        .attr('height', height)
        //        .style('background', '#C9D7D6')
        .selectAll('rect').data(bardata)
        .enter().append('rect')
        .style('fill', function(d, i) {
            return colors(i);
        })
        .attr('width', xScale.rangeBand())
        .attr('x', function(d, i) {
            return xScale(i);
        })
        .attr('height', 0)
        .attr('y', height)
        //events
        .on('mouseover', function(d) {

            tooltip.transition()
                .style('opacity', 0.9)
            tooltip.html(d)
                .style('left', (d3.event.pageX - 35) + 'px')
                .style('top', (d3.event.pageY - 30) + 'px')

            tempcolor = this.style.fill;
            d3.select(this)
                .transition()
                .style('opacity', 0.5)
                .style('fill', 'Whiite')
        })

    .on('mouseout', function(d) {
        d3.select(this)
            .transition().delay(500).duration(800)
            .style('opacity', 1)
            .style('fill', tempcolor);
    })

    mychart.transition()
        //.delay(500)
        //.duration(2500)
        .attr('height', function(d) {
            return yScale(d);
        })
        .attr('y', function(d) {
            return height - yScale(d);
        })
        .delay(function(d, i) {
            return i * 10;
        })
        .duration(1000)
        .ease('elastic')

})(window.d3);
