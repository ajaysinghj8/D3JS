(function(root, factory) {
    factory(root, root.jQuery, root.d3);
}(this, function(root, $, d3) {

    var width = 970,
        height = 1500,
        mugDiameter = 40,
        mugSize = 80;

    var bounds = d3.geom.polygon([
        [0, 0],
        [0, height],
        [width, height],
        [width, 0]
    ]);

    var color = d3.scale.ordinal()
        .domain(['Head', 'Directors', 'Developers', 'QA', 'Accounts', 'Scrum Master'])
        .range(["#3182bd", "#42a48d", "#7d4098", "#969696", "#969696", "#969696", "#969696", "#969696"]);

    var svg = d3.select('.g_graphic')
        .insert('svg', '.g-note')
        .attr('width', width)
        .attr('height', height);
    svg.append('defs').append('clipPath')
        .attr('id', 'g-tooltip')
        .append('circle')
        .attr('r', mugDiameter / 2);
    var tooltip = d3.select(".g-graphic").append("div")
        .attr("class", "g-tooltip")
        .style("display", "none");

    var tooltipPath = tooltip.append("svg")
        .attr("class", "g-tooltip-path");

    tooltipPath.append("path");

    var tooltipContent = tooltip.append("div")
        .style("position", "relative")
        .style("z-index", 2)
        .style("padding", "8px");

    var tooltipName = tooltipContent.append("div")
        .attr("class", "g-name");

    var tooltipDescription = tooltipContent.append("div")
        .attr("class", "g-description");

    var overlay = d3.select(".g-graphic").append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("z-index", 3);

    d3.json('data.json', function(error, network) {

    });



}));
