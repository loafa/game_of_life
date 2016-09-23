(function() {
    document.addEventListener('DOMContentLoaded', function () {

        var grid = Grid(20, 3, document.getElementById("test"));
        var board = Board(3, 3);
        var game = Game(grid, board);
        board.setState(1, 0, true);
        board.setState(2, 0, true);
        board.setState(1, 1, true);
        board.setState(2, 1, true);
        board.setState(2, 2, true);

        $("#toggleOn").click(game.start);
        
    });
})()