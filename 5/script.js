(function(d3) {

    d3.select('body')
        .append('svg')
        .attr('width', 100)
        .attr('height', 100)
        .append('circle')
        .attr('cx', 50)
        .attr('cy', 50)
        .attr('r', 25)
        .style('fill', 'pink');


})(window.d3);
