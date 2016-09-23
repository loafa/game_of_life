var Game = function(grid, board) {
	var that = Object.create(Game.prototype);
	var interval = undefined;
	var running = false;

	that.update = function() {
		board.updateState();
        that.populateBoard();
	};

	that.start = function() {
		that.populateBoard();
		if (!running) {
			interval = window.setInterval(that.update, 1000);
			running = true;
		}
	}

	that.stop = function() {
		that.populateBoard();
		if (running) {
			clearInterval(interval);
			running = false;
		}
	}

	that.reset = function(startState) {
		board.init(startState ? startState : []);
	};
	
	that.isRunning = function() { return running; };

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