(function(d3) {
    var w = 1000,
        h = 700,
        circleWidth = 5;

    var nodes = [{
        name: 'JavaScript'
    }, {
        name: 'Angular',
        target: [0]
    }, {
        name: 'Backbone',
        target: [0]
    }, {
        name: 'Jquery',
        target: [0]
    }, {
        name: 'asm.js',
        target: [0]
    }, {
        name: 'Python',
        target: [0]
    }];

    var links = [];
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].target !== undefined) {
            for (var x = 0; x < nodes[i].target.length; x++) {
                links.push({
                    source: nodes[i],
                    target: nodes[nodes[i].target[x]]
                })
            }


        }
    }

    var nodeChart = d3.select('#chart')
        .append('svg')
        .attr('width', w)
        .attr('height', h)

    var force = d3.layout.force()
        .nodes(nodes)
        .links([])
        .gravity(0.1)
        .charge(-1000)
        .size([w, h])

    var link = nodeChart.selectAll('line')
        .data(links).enter()
        .append('line')
        .attr('stroke', 'gray')
    var node = nodeChart.selectAll('circle')
        .data(nodes).enter()
        .append('g')
        .call(force.drag)
    node.append('circle')
        .attr('cx', function(d) {
            return d.x
        })
        .attr('cy', function(d) {
            return d.y
        })
        .attr('r', circleWidth)
        .attr('fill', function(d, i) {
            if (i > 0) {
                return 'pink'
            } else {
                return 'blue'
            }
        })

    node.append('text')
        .text(function(d) {
            return d.name;
        })
        .attr('font-family', 'Roboto Slab')
        .attr('x', function(d, i) {
            if (i > 0) {
                return circleWidth + 4;
            } else {
                return circleWidth - 15;
            }
        })
        .attr('y', function(d, i) {
            if (i > 0) {
                return circleWidth;
            } else {
                return 8;
            }
        })
        .attr('fill', function(d, i) {
            if (i > 0) {
                return 'gray';
            } else {
                return 'black';
            }
        })
        .attr('text-anchor', function(d, i) {
            if (i > 0) {
                return 'beginning';
            } else {
                return 'end';
            }
        })
        .attr('font-size', function(d, i) {
            if (i > 0) {
                return '1em';
            } else {
                return '1.8em';
            }
        })

    force.on('tick', function(e) {
        node.attr('transform', function(d, i) {
            return 'translate(' + d.x + ',' + d.y + ')';
        })

        link
            .attr('x1', function(d) {
                return d.source.x;
            })
            .attr('y1', function(d) {
                return d.source.y;
            })
            .attr('x2', function(d) {
                return d.target.x;
            })
            .attr('y2', function(d) {
                return d.target.y;
            })

    })



    force.start();


})(window.d3);
