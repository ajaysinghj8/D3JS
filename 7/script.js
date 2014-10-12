(function(d3) {

    var w = 300,
        h = 150,
        padding = 2;
    var dataset = [125, 20, 25, 50, 135];
    var svg = d3.select('body')
        .append('svg')
        .attr('width', w)
        .attr('height', h);
    svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('x', function(d, i) {
            return i * (w / dataset.length);
        })
        .attr('y', function(d) {
            return h - d;
        })
        .attr('width', w / dataset.length - padding)
        .attr('height', function(d, i) {
            return d;
        })

})(window.d3);
