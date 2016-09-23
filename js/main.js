(function() {
    document.addEventListener('DOMContentLoaded', function () {
        var num_squares = 20;
        var grid = Grid(20, num_squares, document.getElementById("grid"));
        var board = Board(num_squares, num_squares);
        var game = Game(grid, board);
        var ui = UI(grid, board, game);
    });
})()