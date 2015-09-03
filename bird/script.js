(function(root, factory) {
    'use strict';
    var MainApp = {};
    //check for libraries to load
    factory(root, MainApp, root.d3, root.jQuery);
}(this, function(root, mainApp, d3, $) {
    'use strict';
    var margin,
        height,
        width,
        svg;
    margin = {
        top: 20,
        right: 100,
        bottom: 200,
        left: 100
    };
    width = $(window).width() - margin.left - margin.right;
    height = $(window).height() - margin.top - margin.bottom;
    svg = d3.select('#chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);



    var ClassBird = (function ClassBird() {
        var defaults = {
            position: {
                x: 0,
                y: 0
            },
            colors: {
                wing: '#81CCAA',
                body: '#B1E4C2'
            },
            angle: 0
        };

        function Bird(svg, config) {
            this.svg = svg;
            this.config = {};
            defaults.direction = {
                x: Math.round(Math.random()) ? 'Left' : 'Right',
                y: Math.round(Math.random()) ? 'Up' : 'Down'
            };
            defaults.scale = parseInt(Math.random() * 10) / 10;
            this.config = $.extend({}, defaults, config);
            this.init();
        }
        Bird.prototype = {
            init: function() {
                var self = this;

                self.bbird = svg.append('g')
                    .attr('id', self.config.id)
                    .attr('transform', 'translate(' + parseInt(Math.random() * 2000) + ',' + (-100) + ') scale(' + self.config.scale + ')');
                self.bbird.transition()
                    .duration(5000)
                    .ease('linear')
                    .attr('transform', 'translate(' + (self.config.position.x) + ',' + (self.config.position.y) + ') scale(' + self.config.scale + ')');
                self.body = self.bbird.append('g')
                    .attr('id', 'body')
                    .attr('fill', self.config.colors.body);
                self.body.append('path')
                    .attr('d', 'M48.42,78.11c0-17.45,14.14-31.58,31.59-31.58s31.59,14.14,31.59,31.58c0,17.44-14.14,31.59-31.59,31.59 S48.42, 95.56, 48.42, 78.11 ');
                self.body.append('path')
                    .attr('d', 'M109.19,69.88c0,0-8.5-27.33-42.51-18.53c-34.02,8.81-20.65,91.11,45.25,84.73 c40.39-3.65,48.59-24.6,48.59-24.6S124.68,106.02,109.19,69.88 ');
                self.body.append('path')
                    .attr('id', 'wing')
                    .attr('d', 'M105.78,75.09c4.56,0,8.84,1.13,12.62,3.11c0,0,0.01-0.01,0.01-0.01l36.23,12.38c0,0-13.78,30.81-41.96,38.09c-1.51,0.39-2.82,0.59-3.99,0.62c-0.96,0.1-1.92,0.16-2.9,0.16c-15.01,0-27.17-12.17-27.17-27.17C78.61,87.26,90.78,75.09,105.78,75.09')
                    .attr('fill', self.config.colors.wing);
                self.head = self.bbird.append('g')
                    .attr('id', 'head');
                self.head.append('path')
                    .attr('id', 'beak')
                    .attr('d', 'M50.43,68.52c0,0-8.81,2.58-10.93,4.86l9.12,9.87C48.61,83.24,48.76,74.28,50.43,68.52');
                self.head.append('path')
                    .attr('class', 'eye-ball')
                    .attr('d', 'M60.53,71.68c0-6.33,5.13-11.46,11.46-11.46c6.33,0,11.46,5.13,11.46,11.46c0,6.33-5.13,11.46-11.46,11.46C65.66,83.14,60.53,78.01,60.53,71.68');
                self.head.append('path')
                    .attr('id', 'pupil')
                    .attr('d', 'M64.45,71.68c0-4.16,3.38-7.53,7.54-7.53c4.16,0,7.53,3.37,7.53,7.53c0,4.16-3.37,7.53-7.53,7.53C67.82,79.22,64.45,75.84,64.45,71.68');
                self.head.append('path')
                    .attr('class', 'eye-ball')
                    .attr('d', 'M72.39,74.39c0-2.73,2.22-4.95,4.95-4.95c2.73,0,4.95,2.21,4.95,4.95c0,2.74-2.22,4.95-4.95,4.95C74.6,79.34,72.39,77.13,72.39,74.39');
            },
            moveHere: function(pos) {
                var self = this;
                if (pos && pos.hasOwnProperty('x') && pos.hasOwnProperty('y')) {
                    self.bbird
                        .transition()
                        .duration(5000)
                        .ease('linear')
                        .attr('transform', 'translate(' + (pos.x - 60) + ',' + (pos.y - 60) + ') scale(' + self.config.scale + ')');
                    self.config.position = pos;
                }
            },
            rotate: function(angle) {
                var self = this;
                self.config.angle = angle;
                self.head
                    .transition()
                    .duration(5000)
                    .ease('linear')
                    .attr('transform', 'rotate(' + angle.toString() + ')');
                self.body
                    .transition()
                    .duration(5000)
                    .ease('linear')
                    .attr('transform', 'rotate(' + angle.toString() + ')');
            },
            autoMove: function(viewPort) {
                var self = this;
                var rand = {};
                rand.x = Math.random() * 500;
                rand.y = Math.random() * 500;
                var newPos = self.config.position;
                var newangle = 0;

                if (self.config.direction.x === 'Left') {
                    if (self.config.position.x - rand.x > 20) {
                        newPos.x = self.config.position.x - rand.x;
                    } else {
                        self.config.direction.x = 'Right';
                    }
                }
                if (self.config.direction.x === 'Right') {
                    if (self.config.position.x + rand.x < viewPort.width) {
                        newPos.x = self.config.position.x + rand.x;
                    } else {
                        self.config.direction.x = 'Left';
                    }
                }
                if (self.config.direction.y === 'Up') {
                    if (self.config.position.y - rand.y > 10) {
                        newPos.y = self.config.position.y - rand.y;
                    } else {
                        self.config.direction.y = 'Down';
                        self.rotate('135');
                    }
                }
                if (self.config.direction.y === 'Down') {
                    if (self.config.position.y + rand.y < viewPort.height) {
                        newPos.y = self.config.position.y + rand.y;
                    } else {
                        self.config.direction.y = 'Up';
                    }
                }

                if (self.config.direction.y === 'Up') {
                    if (self.config.direction.x === 'Left') {
                        newangle = Math.round(Math.random() * 360);
                    }
                }
                if (self.config.direction.y === 'Down') {
                    if (self.config.direction.x === 'Left') {
                        newangle = -Math.round(Math.random() * 360);
                    }
                }

                self.rotate(newangle);
                self.moveHere(newPos);
            }

        };
        return Bird;
    }());

    function addMovements(objects) {
        var bird_ptr;
        $.each(objects, function(i, obj) {
            obj.bbird.on('click', function() {
                d3.event.stopPropagation();
                bird_ptr = obj.config.id;
            });
            obj.bbird.on('mousemove', function() {
                d3.event.stopPropagation();
                obj.rotate(obj.config.angle + 20);
            });
        });
        svg.on('click', function() {
            bird_ptr = undefined;
        });
        svg.on('mousemove', function() {
            if (bird_ptr) {
                var pos = {
                    x: d3.mouse(this)[0],
                    y: d3.mouse(this)[1]
                };
                $.each(objects, function(i, obj) {
                    if (bird_ptr === obj.config.id) {
                        obj.moveHere(pos);
                    }
                });
            }
        });
    }

    var birds = [];
    var nBirds = 50;

    function WrapperBird(config) {
        function fn() {
            birds.push(new ClassBird(this, config));
        }
        return fn;
    }
    var bColors = d3.scale.category20();
    var wColors = d3.scale.category20c();
    for (var i = 0; i < nBirds; i++) {
        var config = {
            id: 'bird-' + i,
            position: {
                x: parseInt(Math.random() * width),
                y: parseInt(Math.random() * height)
            },
            colors: {
                body: bColors(i),
                wing: wColors(i)
            }
        };
        svg.call(new WrapperBird(config));
    }
    var intervalObject;

    function auto(birds) {
        intervalObject = setInterval(function() {
            $.each(birds, function(i, obj) {
                obj.autoMove({
                    height: 1000,
                    width: 1400
                });
            });
        }, 10000);
    }

    addMovements(birds);
    var play = true;
    d3.select('#btn-stop-start').on('click', function() {
        d3.event.stopPropagation();
        if (play) {
            auto(birds);
        } else {
            clearInterval(intervalObject);
        }
        play = !play;
    });
    $('#chart >svg '), append($('#trees').html());


}));
