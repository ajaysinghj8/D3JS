(function(d3) {

    d3.select('body')
        .append('svg')
        .attr('width', 250)
        .attr('height', 50)
        .append('text')
        .text('Ajay Singh')
        .attr('x',30)
        .attr('y',20)
        .style('fill','blue');

})(window.d3);
