var Game = function(grid, board) {
	var that = Object.create(Game.prototype);
	var running = undefined;
	board.initializeEmpty();

	that.update = function() {
		board.updateState();
        that.populateBoard();
	};

	that.start = function(interval) {
		that.populateBoard();
		running = setInterval(that.update, 1000);
	};

	that.stop = function() {
		clearInterval(running);
	};

	that.reset = function(startState) {
		board.init(startState ? startState : []);
	};
	
	that.populateBoard = function() {
		grid.resetGrid();
        for (var i = 0; i < board.getWidth(); i++){
            for (var j = 0; j < board.getHeight(); j++){
                if (board.getState(i, j)){
                    grid.fillSquare(i, j);
                }
            }
        }
	};

	Object.freeze(that);
	return that;
};