(function(root, factory) {
    'use strict';
    if (root.d3 && root.jQuery) {
        root.ApplicationD3 = {};
        factory(root, root.ApplicationD3, root.jQuery, root.d3);

    } else {
        if (root.d3 === undefined) {
            console.info('Misisng D3JS');
        }
        if (root.jQuery === undefined) {
            console.info('Missing Jquery');
        }
    }

}(this, function(root, App, $, d3) {
    'use strict';
    var Bars = (function() {
        var Selector,
            dataSet,
            height,
            width,
            yScaler,
            barWidth,
            svg,
            margin,
            xAxis;

        function Bars(pSelector, pOptions) {
            Selector = pSelector;
            dataSet = pOptions.dataSet || [];
            calculations();
            init();
        }

        function calculations() {

            height = $(Selector).height();
            width = $(Selector).width();
            yScaler = d3.scale.linear()
                .range([height, 0]);
            barWidth = width / dataSet.length;
            yScaler.domain([0, d3.max(dataSet, function(d) {
                return d;
            })]);
        };
        // settign up svg
        function init() {
            svg = d3.select(Selector)
                .append('svg')
                .attr('width', width)
                .attr('height', height);

            createBar(svg);
        }

        function createBar(svg) {

            var bar = svg.selectAll('g')
                .data(dataSet)
                .enter()
                .append('g');
            bar.append('rect')
                .attr('class', 'bar')
                .attr('x', function(d, i) {
                    return i * barWidth;
                })
                .attr('y', function(d) {
                    return yScaler(d);;
                })
                .attr('fill', 'blue')
                .attr('width', barWidth - 1)
                .attr('height', function(d) {
                    return height - yScaler(d);
                });
        }

        Bars.prototype.resize = function() {
            calculations();
            svg.attr('width', width)
                .selectAll('rect')
                .attr('x', function(d, i) {
                    return i * barWidth;
                })
                .attr('width', barWidth - 1);

        };


        return Bars;
    })();

    App.CreateBar = function(selector, options) {
        return new Bars(selector, options);
    };



    // using method
    var options = {
        dataSet: [29, 5, 10, 15, 20, 120, 30, 40, 50, 60, 70, 80, 90]
    };
    var highBar1 = App.CreateBar('#chart', options);
    $(window).resize(function(data) {
        highBar1.resize();
    });
    ///////////////////
}));

(function() {
    console.log('main -?>', this);
    var Person = (function() {
        console.log('above cons', this);

        function Person(name) {
            console.log('inside cons', this);
            this.name = name;
        }
        return Person;
    });

    var abc = new Person('ajay');


})();


// closure in loop
function f() {
    var a = [];
    var i = 0;
    for (var i = 0; i < 3; i++) {
        a[i] = function(x) {
            return function() {
                return x;
            };
        }(i);
    };

    return a;
}


// object.propertiy

function Person(){}
Object.define
