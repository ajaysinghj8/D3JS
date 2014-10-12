(function(d3) {
    // svg h and w
    var w = 300,
        h = 100,
        padding = 2;
    var dataset = [5, 10, 15, 20, 25];

    var svg = d3.select('body')
        .append('svg')
        .attr('width', w)
        .attr('height', h);

    svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr({
            x: function(d, i) {
                return i * (w / dataset.length);
            },
            y: function(d, i) {
                return h - (d * 4);
            },
            width: w / dataset.length - padding,
            height: function(d) {
                return d * 4;
            },
            fill: function(d) {
                return 'rgb(0,' + (d * 10) + ',0)';
            }
        });



})(window.d3);
