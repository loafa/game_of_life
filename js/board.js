// represents the game board (this is the logic side, ie. the model)
// our board is "infinite" in that coordinates wrap around
// when talking about "board coords" we refer to the number of cells from the top left (zero-indexed)
//		this is as opposed to pixel coordinates, for example. Always an integer pair.
// the board defaults to 30 x 30 if width/ height are unspecified
// @param width the width of the game board (in #cells per row). must be int > 0
// @param height the height of the game board (in #cells per column). must be int > 0
var Board = function (width, height) {
	var that = Object.create(Board.prototype);

	// maps [x, y] (location in square coordinates) to a Cell at that location
	var cells = {};
	var DEFAULT_DIMENSION = 30;

	// default to a 30 x 30 board
	if (width === undefined) {
		width = DEFAULT_DIMENSION;
	}
	if (height === undefined) {
		height = DEFAULT_DIMENSION;
	}

	// @return width of the board in cells
	that.getWidth = function() { return width; };

	// @return height of the board in cells
	that.getHeight = function() { return height; };

	// initialize dead board of size width x height
	that.initEmpty = function() {
		for (var x = 0; x < width; x++){
			for (var y = 0; y < height; y++){
				cells[[x,y]] = Cell(false); 
			}
		}
	};
	
	// initialize a board of size width x height with randomly placed live cells
	// @param prob the probability of a cell being live (float in range [0, 1])
	that.initRandom = function(prob) {
		// default probability of being a live cell is 25%
		if (prob == undefined) { prob = .25; };

		Object.keys(cells).forEach(function(cell) {
			cells[cell].setAlive(Math.random() < prob);
		});
	};

	// initialize a board of size width x height from a list containing the coords
	//		of live cells (eg. [[0, 1], [3, 4]] has live cells at only (0, 1) and (3, 4) in board coords)
	// @param livelist the list of coords (format described above)
	that.initFromList = function(liveList) {
		liveList.forEach(function(coord) {
			// make sure that the coordinates are wrapped to be within our grid space
			coord = [coord[0] % width, coord[1] % height];
			cells[coord] = Cell(true);
		});
	};

	// update the state of all cells based on game rules
	that.updateState = function() {
		var newCellState = {};
		for (var x = 0; x < width; x++){
			for (var y = 0; y < height; y++){
				var liveNeighbors = that.getLiveNeighbors(x, y);

				if (liveNeighbors == 3) { // at exactly 3, cell either stays alive or is rejuvenated
					newCellState[[x,y]] = Cell(true);
				} else if (liveNeighbors == 2) { // at exactly 2, cell maintains state
					newCellState[[x,y]] = Cell(cells[[x,y]].isAlive());
				} else { // otherwise, perishes from over/underpopulation
					newCellState[[x,y]] = Cell(false);
				}
			}
		}
		cells = newCellState;
	};

	// set the state of the Cell at (x, y) to alive or dead
	// @param x boord coord x of the cell (int)
	// @param y board coord y of the cell (int)
	// @param isAlive true iff setting the cell to be alive (bool)
	that.setState = function(x, y, isAlive) {
		cells[[x,y]].setAlive(isAlive);
	};

	// returns true iff the Cell at (x, y) is alive
	that.isAlive = function(x, y) {
		return cells[[x,y]].isAlive();
	};

	// returns the number of neighbors of the Cell at (x, y) that are alive
	// (non-inclusive of the cell at (x, y))
	// @param x the x board coord of cell of interest (int in range [0, width))
	// @param y the y board coord of cell of interest (int in range [0, height))
	// @return the number of live neighbors of the cell at (x, y)
	that.getLiveNeighbors = function(x, y) {
		var liveCount = 0;
		// we don't want to double-count a cell
		// this is possible with wraparound on a small board
		var counted = {}; 

		for (var i = x-1; i < x+2; i++) {
			for (var j = y-1; j < y+2; j++) {
				var mod_i = mod(i, width);
				var mod_j = mod(j, height);
				if (cells[[mod_i,mod_j]].isAlive() && !(mod_i == x && mod_j == y) && counted[[mod_i,mod_j]] == undefined){
					liveCount++;
					counted[[mod_i,mod_j]] = 1;
				}
			}
		}
		return liveCount;
	};

	// modulo function that can deal with negative numbers
	// @param x integer we want to take the modulo of
	// @param y the number we're mod-ing by (int)
	// @return the modded value of x (in range [0, y))
	var mod = function(x, y) {
		while (x < 0) {
			x += y;
		} 
		return x % y; 
	};

	that.initEmpty(); // always default to empty board
	Object.freeze(that);
	return that;
}

