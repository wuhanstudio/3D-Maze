var squares = [];

makeMaze(10,10).forEach(function(line, i){
    line.forEach(function(square, j){
        squares.push({
            x: j,
            y: i,
            square: square
        });
    });
});

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var gridWidth = d3.max(squares, function(d) { return d.x; }) + 1,
    gridHeight = d3.max(squares, function(d) { return d.y; }) + 1,
    cellSize = 20;

var square = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
  .selectAll(".square")
    .data(squares)
  .enter().append("g")
    .attr("transform", function(d) { return "translate(" + (d.x - gridWidth / 2) * cellSize + "," + (d.y - gridHeight / 2) * cellSize + ")"; });

square.append("rect")
    .attr("x", -cellSize / 2)
    .attr("y", -cellSize / 2)
    .attr("width", cellSize - 1)
    .attr("height", cellSize - 1);
