(function() {
    mocha.setup("bdd");
    var assert = chai.assert;
    describe("Util", function() {
        describe("mod", function() {
            // x mod larger y is x
            it("should show that 3 % 25 is 3", function() {
                assert.equal(3, mod(3, 25));
            });

            // x mod smaller y is x % y, x not divisible by y
            it("should show that 25 % 3 is 1", function() {
                assert.equal(1, mod(25, 3));
            });

            // x mod smaller y is x % y, x divisible by y
            it("should show that 24 % 2 is 0", function() {
                assert.equal(0, mod(24, 2));
            });

            // test mod negative x
            it("should show that -25 % 7 is 3", function() {
                assert.equal(3, mod(-25, 7));
            });

            // test mod negative x, evenly divisible
            it("should show that -21 % 7 is 0", function() {
                assert.equal(0, mod(-21, 7));
            });
        });
    });
    describe("Cell", function() {

        describe("isAlive", function() {
            it("should that the cell is alive", function(){
                var cell = Cell(true);
                assert.isTrue(cell.isAlive());
            });
            it("should that the cell is dead", function() {
                var cell = Cell(false);
                assert.isFalse(cell.isAlive());
            });
        });
        
        describe("setAlive", function() {
            it("should change the cell from dead to alive", function(){
                var cell = Cell(false);
                cell.setAlive(true);
                assert.isTrue(cell.isAlive());
            });
            it("should change the cell from alive to dead", function(){
                var cell = Cell(true);
                cell.setAlive(false);
                assert.isFalse(cell.isAlive());
            });
            it("should not change the state of the live cell", function() {
                var cell = Cell(true);
                cell.setAlive(true);
                assert.isTrue(cell.isAlive());
            });
            it("should not change the state of the dead cell", function() {
                var cell = Cell(false);
                cell.setAlive(false);
                assert.isFalse(cell.isAlive());
            });
        });
    });

    describe("Board", function() {
        describe("getWidth", function() {
            it("should show board default to be width 30", function(){
                var board = Board();
                assert.equal(30, board.getWidth());
            });

            it("should give width of 3", function(){
                var board = Board(3, 5);
                assert.equal(3, board.getWidth());
            });
        });

        describe("getHeight", function() {
            it("should show board default to be height 30", function(){
                var board = Board();
                assert.equal(30, board.getHeight());
            });

            it("should give width of 7", function(){
                var board = Board(3, 7);
                assert.equal(7, board.getHeight());
            });
        });

        // note that this also tests the "isAlive" method as our getter
        describe("setState", function() {
            it("should change the state of cell 0,0 to alive", function(){
                var board = Board(3, 4);
                assert.isFalse(board.isAlive(0, 0)); // starts dead!
                board.setState(0, 0, true);
                assert.isTrue(board.isAlive(0, 0));
            });

            it("should change the state of cell 2,1 to dead", function(){
                var board = Board(3, 3);
                assert.isFalse(board.isAlive(2, 1)); // starts dead!
                board.setState(2, 1, true);
                board.setState(2, 1, false);
                assert.isFalse(board.isAlive(2, 1));
            });
        });

        describe("getLiveNeighbors", function() {
            // test empty board
            it("should return that cell at (0,0) has no neighbors", function(){
                var board = Board(3, 4);
                assert.equal(0, board.getLiveNeighbors(0, 0));
            });

            // test no wraparound getting neighbors
            // also tests initFromList functionality
            it("should return that cell at (1, 1) has 3 neighbors", function(){
                var board = Board(3, 3);
                board.initFromList([[0, 0], [1, 2], [2, 0]]);
                assert.equal(3, board.getLiveNeighbors(1, 1));
            });

            // test wraparound getting neighbors
            // also tests initFromList functionality
            it("should return that cell at (0, 0) has 5 neighbors", function(){
                var board = Board(3, 3);
                board.initFromList([[1, 0], [2, 0], [1, 1], [2, 1], [2, 2]]);
                assert.equal(5, board.getLiveNeighbors(0, 0));
            });
        });

        describe("initRandom", function() {
            // as the board distribution will be random, we can only check that
            // all cells have been populated (none are undefined)
            it("should populate the entire board", function(){
                var board = Board(3, 3);
                board.initRandom();
                for (var i = 0; i < board.getWidth(); i++){
                    for (var j = 0; j < board.getHeight(); j++){
                        assert.isTrue(board.isAlive(i, j) || !board.isAlive(i, j));
                    }
                }
            });
        });

        describe("initEmpty", function() {
            // as the board distribution will be random, we can only check that
            // all cells have been populated (none are undefined)
            it("should populate the entire board with dead cells", function(){
                var board = Board(3, 3);
                board.initEmpty();
                for (var i = 0; i < board.getWidth(); i++){
                    for (var j = 0; j < board.getHeight(); j++){
                        assert.isFalse(board.isAlive(i, j));
                    }
                }
            });
        });

        describe("updateState", function() {
            it("should update the state of the cell according to underpopulation rule", function(){
                var board = Board(3, 3);
                board.setState(1, 1, true);
                board.updateState();
                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < 3; j++) {
                        assert.isFalse(board.isAlive(i, j));
                    }
                }
            });
            it("should update the state of the cell according to stable population rule", function(){
                var board = Board(3, 3);
                board.initFromList([[1, 1], [1, 2], [2, 1]]);
                board.updateState();
                assert.isTrue(board.isAlive(1, 1));
                assert.isTrue(board.isAlive(1, 2));
                assert.isTrue(board.isAlive(2, 1));
            });

            it("should update the state of the cell according to rejuvenation rule", function(){
                var board = Board(4, 4);
                board.initFromList([[1, 0], [1, 2], [2, 1]]);
                board.updateState();
                assert.isFalse(board.isAlive(1, 0));
                assert.isTrue(board.isAlive(1, 1));
                assert.isFalse(board.isAlive(1, 2));
                assert.isTrue(board.isAlive(2, 1));
            });

            it("should update the state of the cell according to overpopulation rule", function(){
                var board = Board(3, 3);
                board.initFromList([[1, 0], [2, 0], [1, 1], [2, 2], [2, 1]]);
                board.updateState();
                assert.isFalse(board.isAlive(1, 0));
                assert.isFalse(board.isAlive(2, 0));
                assert.isFalse(board.isAlive(1, 1));
                assert.isFalse(board.isAlive(2, 1));
                assert.isFalse(board.isAlive(2, 2));
            });
        });

        describe("getLiveCells", function() {
            it("should get all 3 live cells, be properly initialized by initFromList", function(){
                var board = Board(3, 3);
                board.initFromList([[1, 1], [1, 2], [2, 1]]);
                var list = board.getLiveCells();
                assert.isTrue($.inArray("1,1", list) >= 0);
                assert.isTrue($.inArray("1,2", list) >= 0);
                assert.isTrue($.inArray("2,1", list) >= 0);
                assert.equal(3, list.length); //and those are the only 3 elements!
            });

            it("should get updated after setting state", function(){
                var board = Board(3, 3);
                board.setState(0, 1, true);
                var list = board.getLiveCells();
                assert.isTrue($.inArray("0,1", list) >= 0);
                assert.equal(1, list.length);
            });

            it("should be empty after initEmpty", function(){
                var board = Board(3, 3);
                var list = board.getLiveCells();
                assert.equal(0, list.length);
            });

            it("should be properly updated after updating the board", function(){
                var board = Board(4, 4);
                board.initFromList([[1, 0], [1, 2], [2, 1]]);
                board.updateState();
                var list = board.getLiveCells();
                assert.isTrue($.inArray("1,1", list) >= 0); // new live cell
                assert.isTrue($.inArray("2,1", list) >= 0);
                assert.equal(2, list.length);
            });
        });

        describe("parseCoords", function() {
            it("should parse the x and y coordinates from the string 21,23", function(){
                var board = Board();
                assert.equal(21, board.parseCoords("21,23").x);
                assert.equal(23, board.parseCoords("21,23").y);
            });

            // also tests internal mod function
            it("should parse the x and y coordinates from the string 0,-23 into correct board space", function(){
                var board = Board(3, 5);
                assert.equal(1, board.parseCoords("7,-23").x);
                assert.equal(2, board.parseCoords("0,-23").y);
            });
        });
    });
    
    describe("Grid", function() {

        describe("dimension", function() {
            it("should return the correct pixel dimension of the default grid", function(){
                var grid = Grid();
                var default_square_dim = 20; //pixels
                var default_board_dim = 30; //squares
                assert.equal(default_square_dim*default_board_dim, grid.dimension());
            });
            it("should return correct pixel dimension of custom grid", function() {
                var square_dim = 10; //pixels
                var board_dim = 40; //squares
                var grid = Grid(square_dim, board_dim);
                assert.equal(square_dim * board_dim, grid.dimension());
            });
        });

        describe("convertToCoord", function() {
            it("should return the correct board coordinates for point in default grid", function(){
                var grid = Grid();
                var default_square_dim = 20; //pixels
                // 34 in x -> 34/square_dim -> 1 (int division)
                // 70 in y -> 70/square_dim -> 3
                assert.equal(1, grid.convertToCoord(34, 70).x);
                assert.equal(3, grid.convertToCoord(34, 70).y);
            });
            it("should return the correct board coordinates for point in custom grid", function(){
                var square_dim = 10; //pixels
                var grid = Grid(square_dim, 42);
                // 34 in x -> 34/square_dim -> 3
                // 70 in y -> 70/square_dim -> 7
                assert.equal(3, grid.convertToCoord(34, 70).x);
                assert.equal(7, grid.convertToCoord(34, 70).y);
            });
        });
        
    });

    // we won't test graphical behavior, but can verify that the game logic behaves as we expect
    // tests are more minimal, as most behavior has been tested by Board
    describe("Game", function() {

        // note this also tests game.start() and game.stop()
        describe("isRunning", function() {
            it("should return true when game is running", function(){
                var game = Game();
                game.start();
                assert.isTrue(game.isRunning());
                game.stop();
                $("#grid").remove();
            });
            it("should return false when game is not running", function() {
                var game = Game();
                assert.isFalse(game.isRunning());
                $("#grid").remove();
            });
        });

        describe("toggleCell", function() {
            it("should turn the top left square alive", function(){
                var board = Board();
                var grid = Grid();
                var game = Game(grid, board);
                game.toggleCell(1, 2);
                assert.isTrue(board.isAlive(0, 0));
                game.stop();
                $("#grid").remove();
            });

            it("should turn the top left square dead", function(){
                var board = Board();
                var grid = Grid();
                var game = Game(grid, board);
                game.toggleCell(1, 2);
                game.toggleCell(1, 2);
                assert.isFalse(board.isAlive(0, 0));
                game.stop();
                $("#grid").remove();
            });
        });

        describe("listInit", function() {
            it("should initialize game from list of live cells", function(){
                var board = Board();
                var grid = Grid();
                var game = Game(grid, board);
                game.listInit([[1, 2], [2, 2]]);
                assert.isTrue(board.isAlive(1, 2));
                assert.isTrue(board.isAlive(2, 2));
                game.stop();
                $("#grid").remove();
            });
        });

        describe("update", function() {
            it("should appropriately update board based on underpopulation", function(){
                var board = Board();
                var grid = Grid();
                var game = Game(grid, board);
                game.listInit([[1, 2], [2, 2]]);
                game.update();
                assert.isFalse(board.isAlive(1, 2));
                assert.isFalse(board.isAlive(2, 2));
                game.stop();
                $("#grid").remove();
            });

            it("should appropriately update board based on stable population & rejuvenation", function(){
                var board = Board();
                var grid = Grid();
                var game = Game(grid, board);
                game.listInit([[1, 2], [2, 2], [2, 1]]);
                assert.isFalse(board.isAlive(1, 1)); // should be rejuvenated in next round
                game.update();
                assert.isTrue(board.isAlive(1, 2));
                assert.isTrue(board.isAlive(2, 2));
                assert.isTrue(board.isAlive(2, 1));
                assert.isTrue(board.isAlive(1, 1));
                game.stop();
                $("#grid").remove();
            });
            it("should appropriately update board based on overpopulation", function(){
                var board = Board(3, 3);
                var grid = Grid();
                var game = Game(grid, board);
                game.listInit([[1, 0], [2, 0], [1, 1], [2, 2], [2, 1]]);
                game.update();
                assert.isFalse(board.isAlive(1, 0));
                assert.isFalse(board.isAlive(2, 0));
                assert.isFalse(board.isAlive(1, 1));
                assert.isFalse(board.isAlive(2, 1));
                assert.isFalse(board.isAlive(2, 2));
                game.stop();
                $("#grid").remove();
            });
        });
    });

    mocha.run();
})()
