var Board = function (width, height) {
	var that = Object.create(Board.prototype);
	var cells = {};

	if (width == undefined) {
		width = 20;
	}
	if (height == undefined) {
		height = 20;
	}

	that.getWidth = function() { return width; };
	that.getHeight = function() { return height; };
	that.initializeEmpty = function() {
		// initialize dead board of given size
		for (var x = 0; x < width; x++){
			for (var y = 0; y < height; y++){
				cells[[x,y]] = Cell(x, y, false); 
			}
		}
	};
	
	that.initRandom = function(prob) {
		if (prob == undefined) { prob = .25; };

		Object.keys(cells).forEach(function(cell) {
			cells[cell].setAlive(Math.random() < prob);
		});
	};

	// update the state of Cell at (x, y) based on game rules
	that.updateState = function() {
		var newCellState = {};
		for (var x = 0; x < width; x++){
			for (var y = 0; y < height; y++){
				var liveNeighbors = that.getLiveNeighbors(x, y);
				if (liveNeighbors == 3) {
					newCellState[[x,y]] = Cell(x, y, true);
				} else if (liveNeighbors == 2) {
					newCellState[[x,y]] = Cell(x, y, cells[[x,y]].isAlive());
				} else {
					newCellState[[x,y]] = Cell(x, y, false);
				}
			}
		}
		cells = newCellState;
	};

	// set the state of the Cell at (x, y) to alive or dead
	that.setState = function(x, y, isAlive) {
		cells[[x,y]].setAlive(isAlive);
	};

	that.cells = function () { return cells; };

	that.getState = function(x, y) {
		return cells[[x,y]].isAlive();
	};

	that.getLiveNeighbors = function(x, y) {
		var liveCount = 0;
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

	that.initializeEmpty(); // always default to empty board
	Object.freeze(that);
	return that;
}

mod = function(x, y) {
	while (x < 0) {
		x += y;
	} 
	return x % y; 
};