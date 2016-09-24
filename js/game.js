// interfaces between game logic and grid (visual canvas object)
// @param grid the graphic grid object for the game (see Grid.js)
// @param board the game board (game logic model) (see Board.js)
var Game = function(grid, board) {
	var that = Object.create(Game.prototype);
	var animation_interval = 120; //ms

	var interval = undefined; // will keep track of the update interval
	var running = false; // true iff the game animation is running

	// defaults:
	// grid is a default grid
	// board is a default board
	if (grid == undefined) {
		grid = Grid();
	}
	if (board == undefined) {
		board = Board();
	}

	// initializes a random game board
	that.randomInit = function() {
		board.initEmpty(); // clear to set up new state
		board.initRandom(); // set up the logic
		that.populateBoard(); // set up the visuals
	};

	// initializes a board from the passed list of live cells "list"
	// @param list must have the format [[x, y], [w, u], ...] where [x, y] and [w,u] are board coordinates
	that.listInit = function(list) {
		board.initEmpty();
		board.initFromList(list);
		that.populateBoard();
	};

	// initializes an empty board
	that.emptyInit = function() {
		board.initEmpty();
		that.populateBoard();
	};

	// updates the board state and the graphic grid
	that.update = function() {
		board.updateState();
        that.populateBoard();
	};

	// starts the game (and animation)
	that.start = function() {
		that.populateBoard();
		if (!running) {
			interval = window.setInterval(that.update, animation_interval);
			running = true;
		}
	};

	// stops the game (and animation)
	that.stop = function() {
		that.populateBoard();
		if (running) {
			clearInterval(interval);
			running = false;
		}
	};
	
	// @return true iff the game (and animation) are running
	that.isRunning = function() { return running; };

	// if the cell at (x, y) is alive, it's turned dead and vice versa
	// @param x the x coordinate in pixels from the top left corner of grid
	// @param y the y coordinate in pixels from the top left corner of grid
	that.toggleCell = function(x, y) {
		x = grid.convertToCoord(x, y)["x"];
		y = grid.convertToCoord(x, y)["y"];
		if (board.isAlive(x, y)) {
			board.setState(x, y, false);
			grid.clearSquare(x, y);
		} else {
			board.setState(x, y, true);
			grid.fillSquare(x, y);
		}
	};

	// populates the graphic grid with live cell squares
	that.populateBoard = function() {
		grid.resetGrid(); // clean the grid then add everything
		board.getLiveCells().forEach(function(coord) {
			grid.fillSquare(board.parseCoords(coord).x, board.parseCoords(coord).y);
		});
	};

	Object.freeze(that);
	return that;
};