(function(d3) {
    // svg h and w
    var w = 300,
        h = 100,
        padding = 2;
    var dataset = [5, 10, 15, 20, 25, 11, 18, 9];

    var svg = d3.select('body')
        .append('svg')
        .attr('width', w)
        .attr('height', h);

    function colorPicker(v) {
        if (v <= 20) {
            return '#666666';
        } else if (v > 20) {
            return '#FF0033'
        }
    }

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
                return colorPicker(d);
            }
        });
    svg.selectAll('text')
        .data(dataset)
        .enter()
        .append('text')
        .text(function(d) {
            return d;
        })
        .attr({
            'text-anchor': 'middle',
            x: function(d, i) {
                return i * (w / dataset.length) + (w / dataset.length - padding) / 2;
            },
            y: function(d) {
                return h - (d * 4) + 15;
            },
            'font-family': 'sans-serif',
            'fill': '#ffffff',
            'font-size': 12
        });



})(window.d3);
