(function(root, factory) {
    'use strict';
    var MainApp = {};
    //check for libraries to load
    factory(root, MainApp, root.d3);
}(this, function(root, mainApp, d3) {
    'use strict';
    var margin,
        height,
        width,
        xScale,
        yScale,
        xAxis,
        yAxis,
        xMax,
        yMax, svg, x, y;

    margin = {
        top: 20,
        right: 20,
        bottom: 100,
        left: 100
    };

    width = 1300 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;
    svg = d3.select('#chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    d3.json('ndtv.json', function(data) {

        xMax = d3.max(data[0], function(d) {
            return (d.x);
        });
        yMax = d3.max(data[0], function(d) {
            return d.high;
        });

        xScale = d3.time.scale()
            .domain([new Date(data[0][0].x), new Date(xMax)])
            .range([25, width], 0.001);

        yScale = d3.scale.linear()
            .domain([0, yMax + 3000])
            .range([height, 0]);


        xAxis = d3.svg.axis()
            .scale(xScale)
            .tickSize(0)
            .tickPadding(10)
            .orient('bottom')
            .tickFormat(function(d) {
                return (new Date(d)).toLocaleTimeString();;
            });

        yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('right');


        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis)
            .selectAll('text').style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em')
            .attr('transform', function(d) {
                return 'rotate(-45)';
            });

        svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(20,0)')
            .call(yAxis);



        // var lineFuncHigh = d3.svg.line()
        //     .x(function(d) {
        //         return xScale(d.x);
        //     })
        //     .y(function(d) {
        //         return yScale(d.high);
        //     })
        //     .interpolate('basic');
        var lineFuncY = d3.svg.line()
            .x(function(d) {
                return xScale(d.x);
            })
            .y(function(d) {
                return yScale(d.y);
            })
            .interpolate('basic');
        // var lineFuncOpen = d3.svg.line()
        //     .x(function(d) {
        //         return xScale(d.x);
        //     })
        //     .y(function(d) {
        //         return yScale(d.open);
        //     })
        //     .interpolate('linear');
        var path = svg.append('path')
            .attr({
                d: lineFuncY(data[0]),
                'stroke': 'purple',
                'stroke-width': 1,
                'fill': 'none'
            });
        // svg.append('path')
        //     .attr({
        //         d: lineFuncHigh(data[0]),
        //         'stroke': 'blue',
        //         'stroke-width': 2,
        //         'fill': 'none'
        //     });
        // svg.append('path')
        //     .attr({
        //         d: lineFuncOpen(data[0]),
        //         'stroke': 'red',
        //         'stroke-width': 2,
        //         'fill': 'none'
        //     });

        var tooltip = svg.append('g')
            .attr('class', 'tooltip');

        tooltip.append('rect')
            .attr('width', 30)
            .attr('height', 20)
            .attr('fill', '#006600')
            .style('opacity', 1);

        tooltip.append('text')
            .attr('x', 15)
            .attr('dy', '1.2em')
            .style('text-anchor', 'middle')
            .attr('font-size', '12px')
            .attr('font-weight', 'bold');
        path.on('mouseover', function() {
                tooltip.style('display', null);
            })
            .on('mouseout', function() {
                tooltip.style('display', 'none');
            })
            .on('mousemove', function(d) {
                var xPosition = d3.mouse(this)[0] - 15;
                var yPosition = d3.mouse(this)[1] - 25;
                tooltip.attr('transform', 'translate(' + xPosition + ',' + yPosition + ")");
                tooltip.select("text").text("hello world");
            });





    });



}));
