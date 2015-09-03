(function(d3) {
    'use strict';

    var header,
        svg,
        layers,
        margin,
        height,
        width,
        yStackMax,
        yGroupMax,
        xScale,
        yScale,
        xAxis,
        yAxis,
        color,
        rect, n, m;
    n = 6; // number of layers
    m = 13; // number of samples per layer

    header = ['Upto 10 years', '10-15 years', '15-18 years', '18-30 years', '30-50 years', 'Above 50 years'];
    margin = {
        top: 20,
        right: 50,
        bottom: 100,
        left: 75
    };
    width = 1300 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;
    svg = d3.select('#chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    d3.csv('VICTIM_OF_MURDER_2013.csv', function(data) {
        layers = d3.layout.stack()(header.map(function(range) {
            return data.map(function(d) {
                return {
                    x: d.STATE,
                    y: parseInt(d[range])
                };
            });
        }));

        yGroupMax = d3.max(layers, function(layer) {
            return d3.max(layer, function(d) {
                return d.y;
            });
        });

        yStackMax = d3.max(layers, function(layer) {
            return d3.max(layer, function(d) {
                return d.y0 + d.y;
            });
        });

        xScale = d3.scale.ordinal()
            .domain(layers[0].map(function(d) {
                return d.x;
            }))
            .rangeRoundBands([25, width], 0.001);

        yScale = d3.scale.linear()
            .domain([0, yStackMax])
            .range([height, 0]);

        color = d3.scale.ordinal()
            .domain(header)
            .range(['#98ABC5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c']);

        xAxis = d3.svg.axis()
            .scale(xScale)
            .tickSize(0)
            .tickPadding(6)
            .orient('bottom');

        yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left')
            .tickFormat(d3.format('.2s'));
        // Axis
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
            .call(yAxis)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr({
                'x': -150,
                'y': -70
            })
            .attr('dy', '.75em')
            .style('text-anchor', 'end')
            .text('# of Incidents');

        var legend = svg.selectAll('.legend')
            .data(header.slice().reverse())
            .enter().append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
                return 'translate(-20,' + i * 20 + ')';
            });

        legend.append('rect')
            .attr('x', width - 18)
            .attr('width', 18)
            .attr('height', 18)
            .style('fill', color);

        legend.append('text')
            .attr('x', width - 24)
            .attr('y', 9)
            .attr('dy', '.35em')
            .style('text-anchor', 'end')
            .text(function(d) {
                return d;
            });

        var layer = svg.selectAll('.layer')
            .data(layers)
            .enter().append('g')
            .attr('class', 'layer')
            .style('fill', function(d, i) {
                return color(i);
            });
        var rect = layer.selectAll('rect')
            .data(function(d) {
                return d;
            })
            .enter().append('rect')
            .attr('x', function(d) {
                return xScale(d.x);
            })
            .attr('y', height)
            .attr('width', xScale.rangeBand())
            .attr('height', 0);

        rect.transition()
            .delay(function(d, i) {
                return i * 30;
            })
            .attr('y', function(d) {
                return yScale(d.y0 + d.y);
            })
            .attr('height', function(d) {
                return yScale(d.y0) - yScale(d.y0 + d.y);
            });


        function transitionGrouped() {
            yScale.domain([0, yGroupMax]);

            rect.transition()
                .duration(500)
                .delay(function(d, i) {
                    return i * 10;
                })
                .attr('x', function(d, i, j) {
                    return xScale(d.x) + xScale.rangeBand() / 6 * j;
                })
                .attr('width', xScale.rangeBand() / 6)
                .transition()
                .attr('y', function(d) {
                    return yScale(d.y);
                })
                .attr('height', function(d) {
                    return height - yScale(d.y);
                });
        }

        function transitionStacked() {
            yScale.domain([0, yStackMax]);

            rect.transition()
                .duration(500)
                .delay(function(d, i) {
                    return i * 10;
                })
                .attr('y', function(d) {
                    return yScale(d.y0 + d.y);
                })
                .attr('height', function(d) {
                    return yScale(d.y0) - yScale(d.y0 + d.y);
                })
                .transition()
                .attr('x', function(d) {
                    return xScale(d.x);
                })
                .attr('width', xScale.rangeBand());

            rect.on('mouseover', function() {
                    tooltip.style('display', null);
                    this.attr('width', '300');
                })
                .on('mouseout', function() {
                    tooltip.style('display', 'none');
                })
                .on('mousemove', function(d) {
                    var xPosition = d3.mouse(this)[0] - 15;
                    var yPosition = d3.mouse(this)[1] - 25;
                    tooltip.attr('transform', 'translate(' + xPosition + ',' + yPosition + ')');
                    tooltip.select('text').text('hello world');
                });
        }


        var tooltip = svg.append('g')
            .attr('class', 'tooltip');

        tooltip.append('rect')
            .attr('width', 30)
            .attr('height', 20)
            .attr('fill', 'red')
            .style('opacity', 0.5);

        tooltip.append('text')
            .attr('x', 15)
            .attr('dy', '1.2em')
            .style('text-anchor', 'middle')
            .attr('font-size', '12px')
            .attr('font-weight', 'bold');
        d3.selectAll('input').on('change', change);

        var timeout = setTimeout(function() {
            d3.select('input[value=\'grouped\']').property('checked', true).each(change);
        }, 2000);

        function change(e) {
            clearTimeout(timeout);
            if (this.value === 'grouped') {
                transitionGrouped();
            } else {
                transitionStacked();
            }
        }

        rect.on('mouseover', function() {
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


        // rect = d3.selectAll('rect')
        //        .data()


        // svg.append('g')
        //     .append("text")
        //     .attr("transform", "rotate(-90)")
        //     .attr({
        //         "x": -150,
        //         "y": -70
        //     })
        //     .attr("dy", ".75em")
        //     .style("text-anchor", "end")
        //     .text("# of campaigns");;


    });


    // Create the Google Map…
    // var map = new google.maps.Map(d3.select("#map").node(), {
    //     zoom: 8,
    //     center: new google.maps.LatLng(37.76487, -122.41948),
    //     mapTypeId: google.maps.MapTypeId.TERRAIN
    // });

    // var h = 100,
    //     w = 500;
    // d3.csv('VICTIM_OF_MURDER_2013.csv', function(data) {
    //     console.log(data);
    // });

    // var lineFun = d3.svg.line()
    //     .x(function(d) {
    //         return d.months * 2;
    //     })
    //     .y(function(d) {
    //         return d.sales;
    //     })
    //     .interpolate('linear');

    // var svg = d3.select('body')
    //     .append('svg')
    //     .attr({
    //         width: w,
    //         height: h
    //     });

    // var viz = svg.append('path')
    // .attr({json
    //     d: lineFun(monthlySales),
    //     'stroke': 'purple',
    //     'stroke-width':2,
    //     'fill':'none'

    // })

    // var w = 600;
    // var h = 600;
    // var proj = d3.geo.mercator();
    // var path = d3.geo.path().projection(proj);
    // var t = proj.translate(); // the projection's default translation
    // var s = proj.scale() // the projection's default scale

    // var map = d3.select("#chart").append("svg:svg")
    //     .attr("width", w)
    //     .attr("height", h)
    //     //        .call(d3.behavior.zoom().on("zoom", redraw))
    //     .call(initialize);

    // var india = map.append("svg:g")
    //     .attr("id", "india");

    // d3.json("states.json", function(json) {
    //     india.selectAll("path")
    //         .data(json.features)
    //         .enter().append("path")
    //         .attr("d", path);
    // });

    // function initialize() {
    //     proj.scale(6700);
    //     proj.translate([-1240, 720]);
    // }

})(window.d3);
