(function(d3) {
    var w = 400,
        h = 400,
        circleWidth = 5;

    var nodes = [{
        name: 'Parent'
    }, {
        name: 'child1'
    }, {
        name: 'child2',
        target: [0]
    }, {
        name: 'child3',
        target: [0]
    }, {
        name: 'child4',
        target: [1]
    }, {
        name: 'child5',
        target: [0, 1, 2, 3]
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
        .attr('fill', 'pink')
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
