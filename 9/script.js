(function(d3) {

    var h = 100,
        w = 500;
    var monthlySales = [{
            'months': 10,
            'sales': 20
        }, {
            'months': 20,
            'sales': 30
        }, {
            'months': 30,
            'sales': 24
        }, {
            'months': 40,
            'sales': 23
        }, {
            'months': 50,
            'sales': 5
        }, {
            'months': 60,
            'sales': 34
        }, {
            'months': 70,
            'sales': 32
        }, {
            'months': 80,
            'sales': 28
        }, {
            'months': 90,
            'sales': 28
        }, {
            'months': 100,
            'sales': 27
        }, {
            'months': 110,
            'sales': 25
        }, {
            'months': 120,
            'sales': 15
        }, {
            'months': 130,
            'sales': 42
        }, {
            'months': 140,
            'sales': 6
        }

    ];

    var lineFun = d3.svg.line()
        .x(function(d) {
            return d.months * 2;
        })
        .y(function(d) {
            return d.sales;
        })
        .interpolate('linear');

    var svg = d3.select('body')
        .append('svg')
        .attr({
            width: w,
            height: h
        });

    var viz = svg.append('path')
    .attr({
        d: lineFun(monthlySales),
        'stroke': 'purple',
        'stroke-width':2,
        'fill':'none'

    })


})(window.d3);
