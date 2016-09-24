(function() {
    mocha.setup("bdd");
    var assert = chai.assert;

    describe("Cell", function() {

        describe("isAlive", function() {
            it("should that the cell is alive", function(){
                var cell = Cell(3, 4, true);
                assert.isTrue(cell.isAlive());
            });
            it("should that the cell is dead", function() {
                var cell = Cell(32, -4, false);
                assert.isFalse(cell.isAlive());
            });
        });
        
        describe("setAlive", function() {
            it("should change the cell from dead to alive", function(){
                var cell = Cell(3, 4, false);
                cell.setAlive(true);
                assert.isTrue(cell.isAlive());
            });
            it("should change the cell from alive to dead", function(){
                var cell = Cell(3, 4, true);
                cell.setAlive(false);
                assert.isFalse(cell.isAlive());
            });
            it("should not change the state of the live cell", function() {
                var cell = Cell(32, -4, true);
                cell.setAlive(true);
                assert.isTrue(cell.isAlive());
            });
            it("should not change the state of the dead cell", function() {
                var cell = Cell(32, -4, false);
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
    });

    mocha.run();
})()
