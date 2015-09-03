(function(root, factory) {
    var require = root.require || root.requirejs;
    if (require) {
        require(['/bower_components/d3/d3.js', '/bower_components/jquery/dist/jquery.js'], function(d3, $) {
            factory(root, d3, $|| root.jQuery);
        });
    } else {
        console.error('Requirejs is not available');
    }

}(this, function(root, d3, $) {

    d3.select('#app')
        .append('svg')
        .attr('width', 400)
        .attr('height', 400)
        .style('bg','black')
        .append('circle')
        .attr('cx', 100)
        .attr('cy', 100)
        .attr('r', 25)
        .style('fill', 'pink');

}));
