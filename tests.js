(function() {
    mocha.setup("bdd");
    var assert = chai.assert;

    describe("Cell", function() {
        describe("getX", function() {
            it("should return the x coordinate, 3", function(){
                var cell = Cell(3, 4, false);
                assert.equal(3, cell.getX());
            })
        });
        describe("getY", function() {
            it("should return the y coordinate, -4", function() {
                var cell = Cell(32, -4, true);
                assert.equal(-4, cell.getY());
            })
        });

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
                var cell = Cell(Coord(32, -4), true);
                cell.setAlive(true);
                assert.isTrue(cell.isAlive());
            });
            it("should not change the state of the dead cell", function() {
                var cell = Cell(Coord(32, -4), false);
                cell.setAlive(false);
                assert.isFalse(cell.isAlive());
            });
        });
    });

    describe("Board", function() {
        describe("setState", function() {
            it("should change the state of cell 0,0 to alive", function(){
                var board = Board(3, 4);
                board.initializeEmpty();
                assert.isFalse(board.getState(0, 0)); // starts dead!
                board.setState(0, 0, true);
                assert.isTrue(board.getState(0, 0));
            });

            it("should change the state of cell 2,1 to dead", function(){
                var board = Board(3, 3);
                board.initializeEmpty();
                assert.isFalse(board.getState(2, 1)); // starts dead!
                board.setState(2, 1, true);
                board.setState(2, 1, false);
                assert.isFalse(board.getState(2, 1));
            });
        });

        describe("updateState", function() {
            it("should update the state of the cell according to underpopulation rule", function(){
                var board = Board(3, 3);
                board.initializeEmpty();    
                board.setState(1, 1, true);
                board.updateState();
                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < 3; j++) {
                        assert.isFalse(board.getState(i, j));
                    }
                }
            });
            it("should update the state of the cell according to stable population rule", function(){
                var board = Board(3, 3);
                board.initializeEmpty();
                board.setState(1, 1, true);
                board.setState(1, 2, true);
                board.setState(2, 1, true);
                board.updateState();
                assert.isTrue(board.getState(1, 1));
                assert.isTrue(board.getState(1, 2));
                assert.isTrue(board.getState(2, 1));
            });

            it("should update the state of the cell according to rejuvenation rule", function(){
                var board = Board(4, 4);
                board.initializeEmpty();
                board.setState(1, 0, true);
                board.setState(2, 1, true);
                board.setState(1, 2, true);
                board.updateState();
                assert.isFalse(board.getState(1, 0));
                assert.isTrue(board.getState(1, 1));
                assert.isFalse(board.getState(1, 2));
                assert.isTrue(board.getState(2, 1));
            });

            it("should update the state of the cell according to overpopulation rule", function(){
                var board = Board(3, 3);
                board.initializeEmpty();
                board.setState(1, 0, true);
                board.setState(2, 0, true);
                board.setState(1, 1, true);
                board.setState(2, 1, true);
                board.setState(2, 2, true);
                board.updateState();
                assert.isFalse(board.getState(1, 0));
                assert.isFalse(board.getState(2, 0));
                assert.isFalse(board.getState(1, 1));
                assert.isFalse(board.getState(2, 1));
                assert.isFalse(board.getState(2, 2));
            });
        });
    });

    mocha.run();
})()
