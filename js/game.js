// interfaces between game logic and grid
var Game = function(grid, board) {
	var that = Object.create(Game.prototype);
	var interval = undefined;
	var running = false;
	if (grid == undefined) {
		grid = Grid();
	}
	if (board == undefined) {
		board = Board();
	}

	that.randomInit = function() {
		board.initEmpty();
		board.initRandom(.25);
		that.populateBoard();
	}

	that.listInit = function(list) {
		board.initEmpty();
		board.initFromList(list);
		that.populateBoard();
	}

	that.emptyInit = function() {
		board.initEmpty();
		that.populateBoard();
	}

	that.update = function() {
		board.updateState();
        that.populateBoard();
        // board.print();
	};

	that.start = function() {
		that.populateBoard();
		if (!running) {
			interval = window.setInterval(that.update, 100);
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

	that.reset = function() {
		board.init(startState ? startState : []);
	};
	
	that.isRunning = function() { return running; };

	that.toggleCell = function(x, y) {
		x = grid.convertToCoord(x, y)["x"];
		y = grid.convertToCoord(x, y)["y"];
		if (board.getState(x, y)) {
			board.setState(x, y, false);
			grid.clearSquare(x, y);
		} else {
			board.setState(x, y, true);
			grid.fillSquare(x, y);
		}
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