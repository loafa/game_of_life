// represents the game board (this is the logic side, ie. the model)
// our board is "infinite" in that coordinates wrap around
// when talking about "board coords" we refer to the number of cells from the top left (zero-indexed)
//		this is as opposed to pixel coordinates, for example. Always an integer pair.
// the board defaults to 30 x 30 if width/ height are unspecified
// @param width the width of the game board (in #cells per row). must be int > 0
// @param height the height of the game board (in #cells per column). must be int > 0
var Board = function (width, height) {
	var that = Object.create(Board.prototype);

	// maps "x,y" (location in board coordinates) to a Cell at that location
	var cells = {};
	var DEFAULT_DIMENSION = 30;
	var liveCellCoords = [];
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
		liveCellCoords = [];
		Object.keys(cells).forEach(function(cell) {
			cells[cell].setAlive(false);
		});
	};
	
	// initialize a board of size width x height with randomly placed live cells
	// @param prob the probability of a cell being live (float in range [0, 1])
	that.initRandom = function(prob) {
		liveCellCoords = [];
		// default probability of being a live cell is 25%
		if (prob == undefined) { prob = .25; };

		Object.keys(cells).forEach(function(cell) {
			cells[cell].setAlive(Math.random() < prob);
			if (cells[cell].isAlive()) { liveCellCoords.push(cell); }
		});
	};

	// initialize a board of size width x height from a list containing the coords
	//		of live cells (eg. [[0, 1], [3, 4]] has live cells at only (0, 1) and (3, 4) in board coords)
	// @param livelist the list of coords (format described above)
	that.initFromList = function(liveList) {
		liveCellCoords = [];
		liveList.forEach(function(coord) {
			// make sure that the coordinates are wrapped to be within our grid space
			coord = [coord[0] % width, coord[1] % height];
			cells[coord] = Cell(true);
			liveCellCoords.push(coord[0] + "," + coord[1]);
		});
	};

	// update the state of all cells based on game rules
	that.updateState = function() {
		var newCellState = {};

		Object.keys(cells).forEach(function(cell){
			var x = that.parseCoords(cell).x;
			var y = that.parseCoords(cell).y;

			var liveNeighbors = that.getLiveNeighbors(x, y);
			if (liveNeighbors == 3) { // at exactly 3, cell either stays alive or is rejuvenated
				newCellState[x + "," + y] = Cell(true);
			} else if (liveNeighbors == 2) { // at exactly 2, cell maintains state
				newCellState[x + "," + y] = Cell(cells[x + "," + y].isAlive());
			} else { // otherwise, perishes from over/underpopulation
				newCellState[x + "," + y] = Cell(false);
			}
		});

		liveCellCoords = Object.keys(newCellState).filter(function(cell){
			return newCellState[cell].isAlive();
		});

		cells = newCellState;
	};

	// set the state of the Cell at (x, y) to alive or dead
	// @param x boord coord x of the cell (int)
	// @param y board coord y of the cell (int)
	// @param isAlive true iff setting the cell to be alive (bool)
	that.setState = function(x, y, isAlive) {
		cells[x + "," + y].setAlive(isAlive);
		if (isAlive) { liveCellCoords.push(x + "," + y); }
	};

	// returns true iff the Cell at (x, y) is alive
	that.isAlive = function(x, y) {
		return cells[x + "," + y].isAlive();
	};

	// returns the number of neighbors of the Cell at (x, y) that are alive
	// (non-inclusive of the cell at (x, y))
	// @param x the x board coord of cell of interest (int in range [0, width))
	// @param y the y board coord of cell of interest (int in range [0, height))
	// @return the number of live neighbors of the cell at (x, y)
	that.getLiveNeighbors = function(x, y) {
		var liveCount = 0;

		//@return true iff coord is a neighbor of (x, y)
		var isNeighbor = function(coord) {
			var i = that.parseCoords(coord).x;
			var j = that.parseCoords(coord).y;
			if (x == i && y == j) { return false; }; // a cell is not its own neighbor by definition

			// manage edge cases for wraparound
			// we want the distance between these coordinates to be 1
			if ((x == 0 && i == width-1) || (i == 0 && x == width-1)) { i = x + 1; }
			if ((y == 0 && j == height-1) || (j == 0 && y == height-1)) { j = y + 1; }

			// need to be within 1 square from each other
			return Math.abs(x - i) <= 1 && Math.abs(y - j) <= 1;
		}

		return liveCellCoords.filter(isNeighbor).length;
	};

	//@return list of live cells
	that.getLiveCells = function () { return liveCellCoords; };


	//@param coord string of format x + "," + y where x and y are integers
	//@return object mapping x and y to corresponding integer values within the width/height of the grid
	that.parseCoords = function(coord) {
		var x = mod(parseInt(coord.split(",")[0]), width);
		var y = mod(parseInt(coord.split(",")[1]), height);
		return {"x" : x, "y" : y};
	}

	// initialize cells
	for (var x = 0; x < width; x++){
		for (var y = 0; y < height; y++){
			cells[x + "," + y] = Cell(false); 
		}
	}

	Object.freeze(that);
	return that;
}

