var UI = function(grid, board, game) {
	var that = Object.create(UI.prototype);
	that.startButtonEvent = function() {
		// game.toggleState();
		if (!game.isRunning()){
			that.start();
		} else {
			that.stop();
		}
	};

	that.randomInit = function() {
		that.stop();
		board.initRandom(.25);
		game.populateBoard();
	}

	that.emptyInit = function() {
		that.stop();
		board.initializeEmpty();
		game.populateBoard();
	}

	that.stop = function() {
		game.stop();
		$("#toggle").text("Start");
	}

	that.start = function() {
		game.start();
		$("#toggle").text("Stop");
	}

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

	$("#toggle").click(that.startButtonEvent);
	$("#random").click(that.randomInit);
	$("#empty").click(that.emptyInit);
	$("#grid").click(function(evt) { 
		that.toggleCell(evt.offsetX, evt.offsetY); 
	});
	Object.freeze(that);
	return that;
};

